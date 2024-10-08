<template>
  <section>
    <ClientOnly>
      <Toaster />
    </ClientOnly>
    <div
      class="grid grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-6 lg:gap-4 mt-4 sm:mt-6 lg:mt-8"
    >
      <NuxtLink
        v-for="category in categories"
        :key="category.id"
        class="relative overflow-hidden cursor-pointer"
        :to="`/collections/${category.slug}`"
      >
        <AspectRatio
          :ratio="1 / 1"
          class="hover:scale-[1.05] transform transition-transform duration-300 ease-in-out"
        >
          <img
            class="category-section__img w-full h-full object-cover"
            :src="category.backgroundImage"
            :alt="category.name"
          />
          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-4xl lg:text-5xl text-white w-full text-center font-extrabold px-2"
          >
            {{ category.name }}
          </div>
          <div class="absolute inset-0 bg-violet-900 opacity-40" />
        </AspectRatio>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '../ui/toast/use-toast'
import Toaster from '../ui/toast/Toaster.vue'
import AspectRatio from '../ui/aspect-ratio/AspectRatio.vue'

const supabase = useSupabaseClient()
const { toast } = useToast()

interface Category {
  id: number
  name: string
  slug: string
  backgroundImage: string
}

const categories = ref<Category[]>([])

async function fetchSampleCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('id', { ascending: false })
    .limit(6)
  if (error) {
    console.log(error)
    toast({
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
      variant: 'destructive',
    })
  } else {
    categories.value = data
  }
}

fetchSampleCategories()
</script>

<style scoped></style>
