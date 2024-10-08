import type { Tables } from '~/types/database.types'

const PRODUCTS = 'products'

type Product = Tables<'products'>
type Category = Tables<'categories'>

export const useAppStore = defineStore('app', () => {
  const supabase = useSupabaseClient()

  const products = ref<Product[] | null>([])
  const categories = ref<Category[]>([])

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from(PRODUCTS)
      .select('*, vendors(name)')
    if (error) {
      console.error('Error fetching products', error)
    } else {
      products.value = data
    }
  }
  return {
    products,
    categories,
    fetchProducts,
  }
})
