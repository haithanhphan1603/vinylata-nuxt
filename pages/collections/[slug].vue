<template>
  <div ref="collectionRef" class="flex px-16">
    <div class="w-1/4">
      <CategorySearchBar v-model="searchInfo" />
    </div>
    <div class="w-3/4">
      <h1 class="text-5xl font-extrabold uppercase">
        {{ category?.name }}
      </h1>
      <div class="grid gap-6 grid-cols-4 py-10">
        <template v-if="validProducts.length > 0">
          <div v-for="product in validProducts" :key="product.id">
            <ProductCard :product="product" />
          </div>
        </template>

        <template v-if="isLoading">
          <ProductCardSkeleton v-for="i in 4" :key="i" class="h-60 w-52" />
        </template>
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
const { retriveProducts } = useApiService()

interface SearchParams {
  start: number
  limit: number
  sortBy: SortBy
  productType: []
}

const collectionRef = ref<HTMLElement | null>(null)

const category = ref<Tables<'categories'>>()
const products = ref<Tables<'products'>[]>([])
const totalProducts = ref<number>(0)

const isLoading = ref(false)

const searchInfo = reactive<SearchParams>({
  start: 0,
  limit: 10,
  sortBy: SortBy.MANUAL,
  productType: [],
})

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

  try {
    isLoading.value = true
    const categoryBySlug = slug === 'all' ? undefined : slug
    const data = await retriveProducts(
      searchInfo,
      categoryBySlug as string,
      category.value?.id,
    )
    console.log(data)
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
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
