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
import type { CollectionSearchParams } from '~/types/search.types'
import { SortBy } from '~/types/search.types'
import { useApiServices } from '~/composables/apiServices'

const supabase = useSupabaseClient()
const slug = useRoute().params.slug
const { getProductsByCategory, getCategoryBySlug, getTotalProductsByCategory } =
  useApiServices()

const collectionRef = ref<HTMLElement | null>(null)

const category = ref<Tables<'categories'>>()
const products = ref<Tables<'products'>[]>([])
const totalProducts = ref<number>(0)

const isLoading = ref(false)

const searchInfo = reactive<CollectionSearchParams>({
  start: 0,
  limit: 10,
  sortBy: SortBy.MANUAL,
  productType: [],
})

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

async function fetchTotalProducts() {
  totalProducts.value = await getTotalProductsByCategory(
    category.value?.id ?? 0,
    searchInfo,
  )
}

async function fetchProducts() {
  if (products.value.length >= (totalProducts.value ?? 0)) {
    return
  }
  isLoading.value = true

  const fetchedProducts = await getProductsByCategory(
    category.value?.id ?? 0,
    searchInfo,
  )
  products.value = [...products.value, ...fetchedProducts]
  isLoading.value = false
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
      searchInfo.start = searchInfo.start + searchInfo.limit
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
