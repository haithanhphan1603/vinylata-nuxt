interface CartItem {
  productId: number
  quantity: number
  cartId?: string
  price: number
  productImgUrl: string
  productName: string
  productSlug: string
  productVendorName?: string
}

interface Cart {
  totalPrice: number
  currency: string
  createdBy?: string
  id: string
  currency: string
}
