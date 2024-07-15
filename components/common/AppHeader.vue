<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { ShoppingBagIcon, CircleUserRoundIcon } from 'lucide-vue-next'
const searchKey = ref('')
</script>

<template>
  <header class="sticky top-0 z-[1000] bg-background">
    <div class="container mx-auto py-5 px-10">
      <div class="flex items-center">
        <CommonAppIcon />
        <div class="w-full mx-8 flex justify-center items-center">
          <CommonAppSearchBar v-model="searchKey" />
        </div>
        <div>
          <ul class="flex gap-1">
            <li>
              <Button
                class="border-none rounded-full p-3 hover:text-violet-600"
                variant="outline"
              >
                <CircleUserRoundIcon height="1.2rem" width="1.2rem" />
                <span class="sr-only">Profile</span>
              </Button>
            </li>
            <li>
              <Button
                class="border-none rounded-full p-3 hover:text-violet-600"
                variant="outline"
              >
                <ShoppingBagIcon height="1.2rem" width="1.2rem" />
                <span class="sr-only">Cart</span>
              </Button>
            </li>
            <li>
              <CommonAppColorMode />
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
