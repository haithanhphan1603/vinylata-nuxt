<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { ShoppingBagIcon, CircleUserRoundIcon } from 'lucide-vue-next'
import { useCartStore } from '~/store/cart'
const searchKey = ref('')
const links = ref([
  { to: '/', label: 'HOME' },
  { to: '/about', label: 'ABOUT' },
  { to: '/new-releases', label: 'NEW RELEASES' },
  { to: '/pre-orders', label: 'PRE-ORDERS' },
  { to: '/genres', label: 'GENRES' },
  { to: '/faq', label: 'FAQ' },
])

const { totalQuantity } = storeToRefs(useCartStore())
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
            <li class="relative">
              <Button
                class="border-none rounded-full p-3 hover:text-violet-600"
                variant="outline"
              >
                <ShoppingBagIcon height="1.2rem" width="1.2rem" />
                <div
                  class="absolute top-0 text-[0.6rem] right-1 rounded-[50%] bg-violet-600 h-4 w-4 flex items-center justify-center text-white"
                >
                  {{ totalQuantity }}
                </div>
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
          <li v-for="link in links" :key="link.label">
            <CommonAppLink class="text-sm font-light" :to="link.to">{{
              link.label
            }}</CommonAppLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
