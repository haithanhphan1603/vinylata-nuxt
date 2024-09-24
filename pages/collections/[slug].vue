<template>
  <div ref="collectionRef" class="flex px-16">
    <div class="w-1/4" />
    <div class="w-3/4">
      <h1 class="text-5xl font-extrabold uppercase">
        {{ category?.name }}
      </h1>
      <div class="grid gap-6 grid-cols-4 py-10">
        <div v-for="product in products" :key="product.id">
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
const products = ref<Product[]>()
const totalProducts = ref<number>()

const isLoading = ref(false)

const searchInfo = ref({
  start: 0,
  end: 11,
})

const PRODUCTS_CATEGORIES = 'products_categories'

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
  if ((products.value?.length ?? 0) >= (totalProducts.value ?? 0)) {
    return
  }

  isLoading.value = true
  const { data, error } = await supabase
    .from(PRODUCTS_CATEGORIES)
    .select('*,products(*,vendors(name))')
    .eq('categoryId', category.value?.id)
    .range(searchInfo.value.start, searchInfo.value.end)
  if (error) {
    console.error(error)
  } else {
    console.log(data)
    const fetchedProducts = data.map((item: unknown) => item.products)
    products.value = [...(products.value ?? []), ...fetchedProducts]
    isLoading.value = false
  }
}

async function fetchTotalProducts() {
  const { count, error } = await supabase
    .from(PRODUCTS_CATEGORIES)
    .select('products(*)', { count: 'exact', head: true })
    .eq('categoryId', category.value?.id)
  if (error) {
    console.error(error)
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
      searchInfo.value.start = searchInfo.value.end + 1
      searchInfo.value.end += 10
    }
  }
}

const debouncedHandleScroll = useDebounce(handleScroll, 300)

watch(
  searchInfo,
  async () => {
    await fetchProducts()
  },
  { deep: true },
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
