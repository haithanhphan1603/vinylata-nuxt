interface CartItem {
  productId: number
  quantity: number
  cartId?: string
  price: number
}

interface Cart {
  totalPrice: number
  currency: string
  createdBy?: string
  id: string
  currency: string
}
