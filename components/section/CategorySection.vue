<template>
  <section>
    <ClientOnly>
      <Toaster />
    </ClientOnly>
    <div class="grid grid-cols-2 gap-4 mt-8">
      <div
        v-for="category in categories"
        :key="category.id"
        class="relative overflow-hidden cursor-pointer"
      >
        <AspectRatio
          :ratio="16 / 9"
          class="hover:scale-[1.1] transform transition-transform duration-300 ease-in-out"
        >
          <img
            class="category-section__img w-full h-full"
            :src="category.backgroundImage"
          />
          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl text-white w-full text-center font-extrabold"
          >
            {{ category.name }}
          </div>
          <div class="absolute inset-0 bg-violet-900 opacity-30" />
        </AspectRatio>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useToast } from '../ui/toast/use-toast'
import Toaster from '../ui/toast/Toaster.vue'
import AspectRatio from '../ui/aspect-ratio/AspectRatio.vue'

const supabase = useSupabaseClient()
const { toast } = useToast()

const categories = ref<Category[]>([])

async function fetchSampleCategories() {
  const { data, error } = await supabase.from('categories').select('*').limit(4)
  if (error) {
    console.log(error)
    toast({
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
      variant: 'destructive',
    })
  }
  categories.value = data
}

fetchSampleCategories()
</script>

<style scoped lang="scss">
.category-section__img {
}
</style>
