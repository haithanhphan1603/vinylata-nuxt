import { v4 as uuidv4 } from 'uuid'
import type { Tables } from '~/types/database.types'

import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

type CartItem = Tables<'cartItem'>
type Cart = Tables<'cart'>

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartItems = ref<CartItem[]>([])
    const cart = ref<Cart | null>(null)
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()
    const { deleteCartItems, deleteCart, updateCartItems, updateCart } =
      useApiServices()

    const isMiniCartVisible = ref(false)

    const totalQuantity = computed(() => {
      return cartItems.value.reduce((acc, item) => acc + item.quantity, 0)
    })

    async function createOrUpdateCart() {
      try {
        if (!cart.value) {
          cart.value = createNewCart(user.value?.id || 'anonymous')
        }

        cart.value.totalprice = calculateTotalPrice(cartItems.value)
        cart.value.updatedat = new Date().toISOString()

        // Update cart in database
        await updateCart(cart.value)

        // Update cart items in database
        const aggregatedCartItems = cartItems.value.map((item) => ({
          ...item,
          cartId: cart.value!.id,
        }))
        await updateCartItems(aggregatedCartItems)
      } catch (error) {
        console.error('Error updating cart:', error)
      }
    }

    function createNewCart(createdBy: string) {
      const now = new Date().toISOString()
      return {
        id: uuidv4(),
        totalprice: 0,
        currency: '$',
        createdat: now,
        updatedat: now,
        createdby: createdBy,
      }
    }

    function calculateTotalPrice(
      items: Array<{ price: number; quantity: number }>,
    ) {
      return items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    }

    function addToCart(item: CartItem) {
      const currentCartItems = [...cartItems.value]
      const existingItemIndex = currentCartItems.findIndex(
        (i) => i.productId === item.productId,
      )
      if (existingItemIndex >= 0) {
        currentCartItems[existingItemIndex].quantity += item.quantity
        currentCartItems[existingItemIndex].price =
          item.price * currentCartItems[existingItemIndex].quantity
      } else {
        item.cartId = cart.value?.id || ''
        currentCartItems.push(item)
      }
      cartItems.value = [...currentCartItems]
      createOrUpdateCart()
    }

    async function removeCartItem(index: number) {
      const currentCartItems = [...cartItems.value]
      const removedItem = currentCartItems.splice(index, 1)[0]
      cartItems.value = [...currentCartItems]
      await createOrUpdateCart()

      // Delete item from database
      if (removedItem.id) {
        const { error } = await supabase
          .from('cartItem')
          .delete()
          .eq('id', removedItem.id)
        if (error) {
          console.error('Error deleting cart item:', error)
        }
      }
    }

    async function clearCart() {
      if (cart.value) {
        try {
          Promise.all([
            await deleteCart(cart.value.id),
            await deleteCartItems(cart.value.id),
          ])
        } catch (error) {
          console.error('Error clearing cart:', error)
        }
      }

      cartItems.value = []
      cart.value = null
    }

    function increaseItemQuantity(idx: number) {
      const currentCartItems = [...cartItems.value]
      currentCartItems[idx].quantity += 1
      cartItems.value = [...currentCartItems]
      createOrUpdateCart()
    }

    function decreaseItemQuantity(idx: number) {
      const currentCartItems = [...cartItems.value]
      if (currentCartItems[idx].quantity > 1) {
        currentCartItems[idx].quantity -= 1
      } else {
        currentCartItems.splice(idx, 1)
      }
      cartItems.value = [...currentCartItems]
      createOrUpdateCart()
    }

    async function syncCartWithUser() {
      try {
        // First, try to fetch the user's existing cart from the database
        const { data: existingCart, error: fetchError } = await supabase
          .from('cart')
          .select('*')
          .eq('createdby', user.value?.id)
          .order('updatedat', { ascending: false })
          .limit(1)
          .single()

        if (fetchError && fetchError.code !== 'PGRST116') {
          console.error('Error fetching cart:', fetchError)
          throw fetchError
        }

        if (existingCart) {
          // If a cart exists in the database, use it
          cart.value = existingCart
          // Fetch cart items for this cart
          const { data: items, error: itemsError } = await supabase
            .from('cartItem')
            .select('*')
            .eq('cartId', existingCart.id)

          if (itemsError) {
            console.error('Error fetching cart items:', itemsError)
            throw itemsError
          }

          cartItems.value = items || []
        } else if (cart.value) {
          // If no cart in database but we have a local cart, update it with user ID
          await createOrUpdateCart()
        }
      } catch (error) {
        console.error('Error syncing cart with user:', error)
      }
    }

    // Watch for user changes
    watch(
      user,
      async (newUser) => {
        if (newUser) {
          await syncCartWithUser()
        } else {
          await clearCart()
        }
      },
      {
        immediate: true,
      },
    )

    return {
      cartItems,
      addToCart,
      removeCartItem,
      increaseItemQuantity,
      clearCart,
      decreaseItemQuantity,
      totalQuantity,
      isMiniCartVisible,
      cart,
      syncCartWithUser,
    }
  },
  {
    persist: true,
  },
)
