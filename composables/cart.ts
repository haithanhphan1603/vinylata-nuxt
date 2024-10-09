import type { Tables } from '~/types/database.types'

export const useCart = () => {
  interface ProductWithVendor extends Tables<'products'> {
    vendors: { name: string }
  }

  const product = ref<ProductWithVendor | null>(null)
  const supabase = useSupabaseClient()

  const getCartItemPrice = (quantity: number) => {
    return (quantity * (product.value?.unitPrice ?? 0)).toFixed(2)
  }

  async function fetchProduct(productId: number) {
    const { data, error } = await supabase
      .from('products')
      .select('name, unitPrice, primaryImage, vendors(name),currency')
      .eq('id', productId)
    if (error) {
      console.error('Error fetching product', error)
    }
    product.value = data?.[0]
  }

  return {
    product,
    getCartItemPrice,
    fetchProduct,
  }
}
