import { SortBy } from '~/types/search.types'

interface SearchParams {
  start: number
  limit: number
  sortBy: SortBy
  productType: []
}

const PRODUCTS = 'products'
const PRODUCTS_CATEGORIES = 'products_categories'

export const useApiService = () => {
  const supabase = useSupabaseClient()
  const retriveProducts = async (
    searchInfo: SearchParams,
    slug: string = '',
    categoryId: number = 0,
  ) => {
    const { start, limit, sortBy, productType } = searchInfo
    let query
    if (!slug) {
      query = supabase.from(PRODUCTS).select('*, vendors(name)')
    } else {
      query = supabase
        .from(PRODUCTS_CATEGORIES)
        .select('products(*,vendors(name))')
        .query.eq('categoryId', categoryId)
    }

    if (productType.length > 0) {
      query = query.in('products.productType', productType)
    }

    query = query.range(start, start + limit - 1)

    // Add sorting logic
    switch (sortBy) {
      case SortBy.PRICE_ASC:
        query = query.order('products(unitPrice)', {
          ascending: true,
        })
        break
      case SortBy.PRICE_DESC:
        query = query.order('products(unitPrice)', {
          ascending: false,
        })
        break
      case SortBy.NAME_ASC:
        query = query.order('products(name)', {
          ascending: true,
        })
        break
      case SortBy.NAME_DESC:
        query = query.order('products(name)', {
          ascending: false,
        })
        break
      case SortBy.CREATED_AT_DESC:
        query = query.order('products(createdAt)', {
          ascending: false,
        })
        break
      // For SortBy.MANUAL, we don't add any specific ordering
      default:
        // No specific ordering for manual or unsupported sorting options
        break
    }

    const { data, error } = await query
    if (error) {
      console.error('Error fetching products', error)
      throw error
    }
    console.log('data', data)
    return data
  }

  return {
    retriveProducts,
  }
}
