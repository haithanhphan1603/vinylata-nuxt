import type { Tables } from '~/types/database.types'

export const useCart = () => {
  interface ProductWithVendor extends Tables<'products'> {
    vendors: { name: string }
  }

  const product = ref<ProductWithVendor | null>(null)

  const getCartItemPrice = (quantity: number) => {
    return (quantity * (product.value?.unitPrice ?? 0)).toFixed(2)
  }

  return {
    product,
    getCartItemPrice,
  }
}
