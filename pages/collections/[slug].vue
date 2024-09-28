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
        <div v-for="product in validProducts" :key="product.id">
          <ProductCard :product="product" />
        </div>

        <template v-if="isLoading">
          <ProductCardSkeleton v-for="i in 4" :key="i" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from '~/components/product/ProductCard.vue'
const supabase = useSupabaseClient()
const slug = useRoute().params.slug

const collectionRef = ref<HTMLElement | null>(null)

const category = ref<Category>()
const products = ref<Product[]>([])
const totalProducts = ref<number>(0)

const isLoading = ref(false)

const searchInfo = reactive({
  start: 0,
  end: 11,
  sortBy: '',
  productType: [],
})

const PRODUCTS_CATEGORIES = 'products_categories'

const validProducts = computed(() =>
  products.value.filter((product) => product && product.id != null),
)

async function fetchCategory() {
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
  let query = supabase
    .from(PRODUCTS_CATEGORIES)
    .select('products!inner(*,vendors(name))')
    .eq('categoryId', category.value?.id)
    .range(searchInfo.start, searchInfo.end)

  if (searchInfo.productType.length > 0) {
    query = query.in('products.productType', searchInfo.productType)
  }
  const { data, error } = await query

  if (error) {
    console.error(error)
  } else {
    const fetchedProducts = data.map((item: any) => item.products)
    products.value = [...products.value, ...fetchedProducts]
    isLoading.value = false
  }
}

async function fetchTotalProducts() {
  let query = supabase
    .from('products_categories')
    .select(
      `
      products!inner (
        id,
        productType
      )
    `,
      { count: 'exact' },
    )
    .eq('categoryId', category.value?.id)

  if (searchInfo.productType.length > 0) {
    query = query.in('products.productType', searchInfo.productType)
  }

  const { count, error } = await query
  if (error) {
    console.error('Error fetching total products:', error)
  } else {
    console.log('Total products:', count)
    totalProducts.value = count
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
    }
  }
}

const debouncedHandleScroll = useDebounce(handleScroll, 300)

watch(
  () => searchInfo.end,
  async () => {
    await fetchProducts()
  },
)

watch(
  () => searchInfo.productType,
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

fetchData()

onMounted(() => {
  window.addEventListener('scroll', debouncedHandleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', debouncedHandleScroll)
})
</script>

<style scoped></style>
