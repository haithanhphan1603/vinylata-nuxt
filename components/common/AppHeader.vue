<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/vue'
import {}
const searchKey = ref('')
</script>

<template>
  <header class="shadow-md">
    <div class="container mx-auto py-5 px-10">
      <div class="flex items-center">
        <CommonAppIcon />
        <div class="w-full mx-8 flex justify-center items-center">
          <CommonAppSearchBar v-model="searchKey" />
        </div>
        <div>
          <ul class="flex gap-2">
            <li>
              <CommonAppColorMode />
            </li>
            <li>
              <Button class="border-none rounded-full p-3" variant="outline">
                <Icon
                  icon="tabler:shopping-bag"
                  class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all"
                />
                <span class="sr-only">Cart</span>
              </Button>
            </li>
          </ul>
        </div>
      </div>
      <nav class="mt-4 flex justify-center items-center">
        <ul class="flex gap-8 justify-end">
          <li><CommonAppLink to="/">Home</CommonAppLink></li>
          <li><CommonAppLink to="/about">About</CommonAppLink></li>
          <li><CommonAppLink to="/">Genres</CommonAppLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>
