import type { Tables } from '~/types/database.types'
import type { CollectionSearchParams } from '~/types/search.types'
import { SortBy } from '~/types/search.types'

const PRODUCTS_CATEGORIES = 'products_categories'
type Product = Tables<'products'>
type CartItem = Tables<'cartItem'>
type Cart = Tables<'cart'>

export const useApiServices = () => {
  const supabase = useSupabaseClient()

  async function getProductsByCategory(
    categoryId: number,
    searchInfo: CollectionSearchParams,
  ) {
    let query = supabase
      .from(PRODUCTS_CATEGORIES)
      .select('products(*,vendors(name))')
      .eq('categoryId', categoryId)
      .not('products(id)', 'is', null)

    query = query.range(
      searchInfo.start,
      searchInfo.start + searchInfo.limit - 1,
    )

    if (searchInfo.productType.length > 0) {
      query = query.in('products.productType', searchInfo.productType)
    }

    // Add sorting logic
    switch (searchInfo.sortBy) {
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
      console.error(error)
      return []
    }
    const aggregatedData = data.map(
      (item: Record<string, Product>) => item.products,
    )
    return aggregatedData
  }

  async function getCategoryBySlug(slug: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
    if (error) {
      console.error(error)
    } else {
      return data[0]
    }
  }

  async function getTotalProductsByCategory(
    categoryId: number,
    searchInfo: CollectionSearchParams,
  ) {
    let query = supabase.from('products_categories').select(
      `
      products!inner (
        id,
        productType
      )
    `,
      { count: 'exact' },
    )
    query = query.eq('categoryId', categoryId)

    if (searchInfo.productType.length > 0) {
      query = query.in('products.productType', searchInfo.productType)
    }

    const { count, error } = await query
    if (error) {
      console.error('Error fetching total products:', error)
      return 0
    }
    return count
  }

  async function deleteCart(cartId: string) {
    const { error: itemsError } = await supabase
      .from('cartItem')
      .delete()
      .eq('cartId', cartId)
    if (itemsError) {
      throw itemsError
    }
  }

  async function deleteCartItems(cartId: string) {
    const { error: cartError } = await supabase
      .from('cart')
      .delete()
      .eq('id', cartId)
    if (cartError) {
      throw cartError
    }
  }

  async function updateCartItems(cartItems: CartItem[]) {
    const { error: itemsError } = await supabase
      .from('cartItem')
      .upsert(cartItems)
    if (itemsError) {
      throw itemsError
    }
  }

  async function updateCart(cart: Cart) {
    const { error: cartError } = await supabase.from('cart').upsert([cart])
    if (cartError) {
      throw cartError
    }
  }

  return {
    getProductsByCategory,
    getCategoryBySlug,
    getTotalProductsByCategory,
    deleteCart,
    deleteCartItems,
    updateCartItems,
    updateCart,
  }
}
