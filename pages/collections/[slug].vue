<template>
  <div ref="collectionRef" class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row md:space-x-8">
      <div class="w-full md:w-1/4 mb-6 md:mb-0">
        <CategorySearchBar v-model="searchInfo" class="sticky top-4" />
      </div>
      <div class="w-full md:w-3/4">
        <h1
          class="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase mb-6 sm:mb-8"
        >
          {{ category?.name }}
        </h1>
        <div
          class="grid gap-4 sm:gap-6 lg:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 py-6 sm:py-8 lg:py-10"
        >
          <template v-if="validProducts.length > 0">
            <div v-for="product in validProducts" :key="product.id">
              <ProductCard :product="product" />
            </div>
          </template>

          <template v-if="isLoading">
            <ProductCardSkeleton
              v-for="i in 4"
              :key="i"
              class="h-48 sm:h-52 lg:h-60 w-full"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ProductCard from '~/components/product/ProductCard.vue'
import type { Tables } from '~/types/database.types'
import { SortBy } from '~/types/search.types'

const supabase = useSupabaseClient()
const slug = useRoute().params.slug

const collectionRef = ref<HTMLElement | null>(null)

const category = ref<Tables<'categories'>>()
const products = ref<Tables<'products'>[]>([])
const totalProducts = ref<number>(0)

const isLoading = ref(false)

const searchInfo = reactive({
  start: 0,
  end: 11,
  sortBy: SortBy.MANUAL,
  productType: [],
})

const PRODUCTS_CATEGORIES = 'products_categories'
const PRODUCTS = 'products'

const validProducts = computed(() =>
  products.value.filter((product) => product && product.id != null),
)

async function fetchCategory() {
  if (slug === 'all') {
    category.value = {
      name: 'All',
      id: 0,
      slug: 'all',
      backgroundImage: '',
      description: '',
    }
    return
  }

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
  if (error) {
    console.error(error)
  } else {
    category.value = data[0]
  }
}

async function fetchProducts() {
  if (products.value.length >= (totalProducts.value ?? 0)) {
    return
  }

  isLoading.value = true
  let query

  if (slug !== 'all') {
    query = supabase
      .from(PRODUCTS_CATEGORIES)
      .select('products(*,vendors(name))')
      .eq('categoryId', category.value?.id ?? 0)
  } else {
    query = supabase.from(PRODUCTS).select('*')
  }

  query = query.range(searchInfo.start, searchInfo.end)

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
  } else {
    const fetchedProducts =
      slug !== 'all' ? data.map((item: any) => item.products) : data
    products.value = [...products.value, ...fetchedProducts]
    isLoading.value = false
  }
}

async function fetchTotalProducts() {
  let query = supabase.from('products_categories').select(
    `
      products!inner (
        id,
        productType
      )
    `,
    { count: 'exact' },
  )
  if (slug !== 'all') {
    query = query.eq('categoryId', category.value?.id ?? 0)
  }

  if (searchInfo.productType.length > 0) {
    query = query.in('products.productType', searchInfo.productType)
  }

  const { count, error } = await query
  if (error) {
    console.error('Error fetching total products:', error)
  } else {
    console.log('Total products:', count)
    totalProducts.value = count ?? 0
  }
}

async function fetchData() {
  await fetchCategory()
  await fetchTotalProducts()
  await fetchProducts()
}

function handleScroll(_e: Event) {
  if (collectionRef.value) {
    const element = collectionRef.value
    if (element.getBoundingClientRect().bottom < window.innerHeight) {
      searchInfo.start = searchInfo.end + 1
      searchInfo.end += 10
      fetchProducts()
    }
  }
}

const debouncedHandleScroll = useDebounce(handleScroll, 300)

watch(
  [() => searchInfo.productType, () => searchInfo.sortBy],
  async () => {
    products.value = [] // Reset products array
    searchInfo.start = 0
    searchInfo.end = 11
    await fetchTotalProducts()
    await fetchProducts()
  },
  {
    deep: true,
  },
)

await fetchData()

onMounted(() => {
  window.addEventListener('scroll', debouncedHandleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', debouncedHandleScroll)
})
</script>

<style scoped></style>
