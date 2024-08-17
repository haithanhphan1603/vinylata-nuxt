declare interface Product {
  id: number
  name: string
  description: string
  unitPrice: number
  primaryImage: string
  categoryId: number
  vendorId: number
  currency: string
  imageUrls?: string[]
  productType?: ProductType
  vendors?: Vendor
}

declare enum ProductType {
  LP = 'LP',
  TwoLP = '2LP',
}
