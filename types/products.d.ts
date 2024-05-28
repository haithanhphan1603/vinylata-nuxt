declare interface Product {
  id: number
  name: string
  description: string
  unitPrice: number
  primaryImage: string
  categoryId: number
  vendorId: number
  imageUrls?: string[]
}
