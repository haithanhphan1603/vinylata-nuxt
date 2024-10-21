<template>
  <div class="my-6 md:my-12">
    <ClientOnly>
      <Toaster />
    </ClientOnly>
    <Head>
      <Title>{{ product?.name }}</Title>
    </Head>
    <div class="grid grid-cols-1 md:grid-cols-[4fr,3fr] gap-6 md:gap-10">
      <AspectRatio
        :ratio="16 / 9"
        class="flex justify-center h-full items-center"
      >
        <img
          class="object-cover w-full max-h-[520px]"
          :src="product?.primaryImage"
          :alt="product?.name"
        />
      </AspectRatio>
      <div>
        <AppLink class="text-lg md:text-xl">{{
          product?.vendors?.name
        }}</AppLink>
        <h1 class="text-2xl md:text-4xl font-bold">{{ product?.name }}</h1>
        <h4
          class="text-lg md:text-xl font-bold text-slate-600 dark:text-slate-300 mt-2"
        >
          {{ product?.currency }} {{ product?.unitPrice }}
        </h4>

        <Button
          class="my-6 md:my-8 uppercase font-extrabold px-8 md:px-32 py-2 w-full md:w-auto"
          >add to cart</Button
        >
        <div class="relative mb-6 md:mb-8">
          <div
            ref="description"
            class="overflow-hidden relative"
            :class="{ 'max-h-24': !showFullDescription }"
          >
            {{ product?.description }}
          </div>
          <button
            v-if="isOverflowing"
            class="text-violet-600 text-right w-full"
            @click="toggleDescription"
          >
            {{ showFullDescription ? 'Read Less' : 'Read More' }}
          </button>
        </div>

        <div class="flex flex-col gap-1">
          <div class="flex gap-1">
            <strong>Format:</strong>
            <span>{{ product?.productType }} Vinyl</span>
          </div>
          <div class="flex gap-1">
            <strong>Genres:</strong>
            <span>{{ product?.mainCategory.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Toaster from '~/components/ui/toast/Toaster.vue'
import AspectRatio from '~/components/ui/aspect-ratio/AspectRatio.vue'
import { useToast } from '~/components/ui/toast'
import type { Tables } from '~/types/database.types'
import AppLink from '~/components/common/AppLink.vue'

type ProductsWithRelations = Tables<'products'> & {
  vendors: { name: string }
  mainCategory: { name: string }
}

const { toast } = useToast()
const supabase = useSupabaseClient()
const route = useRoute()
const product = ref<ProductsWithRelations>()

const showFullDescription = ref(false)
const description = ref<HTMLElement | null>(null)
const isOverflowing = ref(false)

const { height } = useElementSize(description)

const toggleDescription = () => {
  showFullDescription.value = !showFullDescription.value
}

watch(height, () => {
  if (description.value && description?.value?.scrollHeight > height.value) {
    isOverflowing.value = true
  }
})

async function fetchProduct(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*,vendors(name),mainCategory(name)')
    .eq('slug', slug)
  if (error) {
    console.log(error)
    toast({
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
      variant: 'destructive',
    })
  }
  product.value = data?.[0]
}

fetchProduct(route.params.slug as string)
</script>

<style></style>
