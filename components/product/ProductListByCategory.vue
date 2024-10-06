<template>
  <div v-if="products && categoryName">
    <h1 class="text-violet-600 font-extrabold text-center text-4xl">
      {{ upperCaseCategoryName }}
    </h1>
    <div class="swiper-container relative mt-8">
      <Swiper
        ref="swiperRef"
        :slides-per-view="5"
        :modules="[SwiperNavigation]"
        :space-between="30"
        :loop="true"
        @swiper="onSwiper"
      >
        <SwiperSlide v-for="product in products" :key="product.id">
          <ProductCard :product="product" />
        </SwiperSlide>
      </Swiper>
      <Button
        class="absolute top-1/3 -left-5 z-50 p-2 rounded-full bg-violet-400"
        type="button"
        @click="swiperPrevSlide"
      >
        <MoveLeftIcon height="1.5rem" width="1.5rem" />
      </Button>
      <Button
        class="absolute top-1/3 -right-5 z-50 p-2 rounded-full bg-violet-400"
        type="button"
        @click="swiperNextSlide"
      >
        <MoveRightIcon height="1.5rem" width="1.5rem" />
      </Button>
    </div>
    <div class="text-center mt-4">
      <Button
        class="font-extrabold text-md py-6 px-28 bg-violet-950 hover:bg-violet-600 uppercase"
        @click="navigateToCategory"
        >see all</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Swiper as SwiperType } from 'swiper'
import Button from '../ui/button/Button.vue'
import { MoveRightIcon, MoveLeftIcon } from 'lucide-vue-next'
import type { Tables } from '~/types/database.types'

type Product = Tables<'products'> & {
  vendors: { name: string }
}

interface Props {
  categoryId: number
}
const props = defineProps<Props>()
const categoryName = ref<string>('')
const categorySlug = ref<string>('')
const products = ref<Product[]>([])

const PRODUCTS_CATEGORIES = 'products_categories'

const supabase = useSupabaseClient()
const swiperInstance = ref()

const router = useRouter()

const upperCaseCategoryName = computed(() => {
  return categoryName.value.toUpperCase()
})

function onSwiper(swiper: SwiperType) {
  swiperInstance.value = swiper
}

function swiperPrevSlide() {
  swiperInstance.value.slidePrev()
}

function swiperNextSlide() {
  swiperInstance.value.slideNext()
}

async function fetchCategoryName() {
  const { data, error } = await supabase
    .from('categories')
    .select('name,slug')
    .eq('id', props.categoryId)
  if (error) {
    console.error(error)
  } else {
    categoryName.value = data[0].name
    categorySlug.value = data[0].slug
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

function navigateToCategory() {
  router.push(`/collections/${categorySlug.value}`)
}

fetchProductsByCategoryId()
fetchCategoryName()
</script>

<style scoped></style>
