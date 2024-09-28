import { v4 as uuidv4 } from 'uuid'
import type { Tables } from '~/types/database.types'

type CartItem = Tables<'cartItem'>
type Cart = Tables<'cart'>

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartItems = ref<CartItem[]>([])
    const cart = ref<Cart | null>(null)

    const isMiniCartVisible = ref(false)

    const totalQuantity = computed(() => {
      return cartItems.value.reduce((acc, item) => {
        return acc + item.quantity
      }, 0)
    })

    function createOrUpdateCart() {
      if (!cart.value) {
        cart.value = {
          id: uuidv4(),
          totalprice: 0,
          currency: 'USD',
          createdat: new Date().toISOString(),
          updatedat: new Date().toISOString(),
          createdby: 'anonymous',
        }
      }
      cart.value.totalprice = cartItems.value.reduce((acc, item) => {
        return acc + item.price * item.quantity
      }, 0)
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

    function removeCartItem(index: number) {
      const currentCartItems = [...cartItems.value]
      currentCartItems.splice(index, 1)
      cartItems.value = [...currentCartItems]
      createOrUpdateCart()
    }

    function clearCart() {
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

    return {
      cartItems,
      addToCart,
      removeCartItem,
      increaseItemQuantity,
      clearCart,
      decreaseItemQuantity,
      totalQuantity,
      isMiniCartVisible,
    }
  },
  {
    persist: true,
  },
)
