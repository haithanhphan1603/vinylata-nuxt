import { v4 as uuidv4 } from 'uuid'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartItems = ref<CartItem[]>([])
    const cart = ref<Cart | null>(null)

    function createOrUpdateCart() {
      if (!cart.value) {
        cart.value = {
          id: uuidv4(),
          totalPrice: 0,
          currency: 'USD',
        }
      }
      cart.value.totalPrice = cartItems.value.reduce((acc, item) => {
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

    function removeCartItem(productId: number) {
      cartItems.value = cartItems.value.filter((i) => i.productId !== productId)
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
    }
  },
  {
    persist: true,
  },
)
