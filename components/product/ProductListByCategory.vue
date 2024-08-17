<template>
  <div v-if="products && categoryName">
    <h1 class="text-violet-600 font-extrabold text-center text-4xl">
      {{ upperCaseCategoryName }}
    </h1>
    <Swiper
      :slides-per-view="5"
      :modules="SwiperNavigation"
      :space-between="30"
      :navigation="true"
      class="mt-8"
    >
      <SwiperSlide v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
interface Props {
  categoryId: number
}
const props = defineProps<Props>()
const categoryName = ref<string>('')
const products = ref<Product[]>([])

const PRODUCTS_CATEGORIES = 'products_categories'

const supabase = useSupabaseClient()

const upperCaseCategoryName = computed(() => {
  return categoryName.value.toUpperCase()
})

async function fetchCategoryName() {
  const { data, error } = await supabase
    .from('categories')
    .select('name')
    .eq('id', props.categoryId)
  if (error) {
    console.error(error)
  } else {
    categoryName.value = data[0].name
  }
}

async function fetchProductsByCategoryId() {
  const { data, error } = await supabase
    .from(PRODUCTS_CATEGORIES)
    .select('*,products(*,vendors(name))')
    .eq('categoryId', props.categoryId)
    .limit(10)
  if (error) {
    console.error(error)
  } else {
    products.value = data.map((item) => item.products)
  }
}

fetchProductsByCategoryId()
fetchCategoryName()
</script>

<style scoped></style>
