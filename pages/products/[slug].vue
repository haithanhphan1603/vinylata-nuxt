<template>
  <div class="my-12">
    <ClientOnly>
      <Toaster />
    </ClientOnly>
    <Head>
      <Title>{{ product?.name }}</Title>
    </Head>
    <div class="grid grid-cols-[4fr,3fr] gap-10">
      <AspectRatio
        :ratio="16 / 9"
        class="flex justify-center h-full items-center"
      >
        <img
          class="object-cover max-h-[520px] flex justify-center items-center"
          :src="product?.primaryImage"
          :alt="product?.name"
        />
      </AspectRatio>
      <div>
        <h2 class="text-xl">{{ product?.vendors?.name }}</h2>
        <h1 class="text-4xl font-bold">{{ product?.name }}</h1>
        <h4 class="text-xl font-bold text-slate-600 dark:text-slate-300">
          {{ product?.currency }} {{ product?.unitPrice }}
        </h4>

        <Button class="my-8 uppercase font-extrabold px-32 py-2"
          >add to cart</Button
        >
        <div class="relative mb-8">
          <div
            ref="description"
            class="overflow-hidden relative"
            :class="{ 'max-h-24': !showFullDescription }"
          >
            {{ product?.description }}
          </div>
          <button
            v-if="isOverflowing"
            class="text-violet-600 text-right"
            @click="toggleDescription"
          >
            {{ showFullDescription ? 'Read Less' : 'Read More' }}
          </button>
        </div>

        <div class="flex gap-1">
          <strong>Format: </strong>
          <span>{{ product?.productType }} Vinyl</span>
        </div>
        <div class="flex gap-1">
          <strong>Genres: </strong>
          <span>{{ product?.mainCategory.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Toaster from '~/components/ui/toast/Toaster.vue'
import AspectRatio from '~/components/ui/aspect-ratio/AspectRatio.vue'
import { useToast } from '~/components/ui/toast'

const { toast } = useToast()
const supabase = useSupabaseClient()
const route = useRoute()
const product = ref<Product>()

const showFullDescription = ref(false)
const description = ref<HTMLElement | null>(null)
const isOverflowing = ref(false)

const { height } = useElementSize(description)

const toggleDescription = () => {
  showFullDescription.value = !showFullDescription.value
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

watch(height, () => {
  if (description?.value?.scrollHeight > height.value) {
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
  product.value = data[0]
}
fetchProduct(route.params.slug as string)
</script>

<style></style>
