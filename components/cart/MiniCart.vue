<template>
  <Card class="w-[420px]">
    <CardHeader class="text-center border-b-slate-200 border-b">
      <CardTitle class="text-xl"
        >Your Viny<span class="text-violet-600">lata</span> Cart ({{
          totalQuantity
        }})</CardTitle
      >
    </CardHeader>
    <CardContent class="p-0 border-b-slate-200">
      <ul>
        <li v-for="(item, index) in cartItems" :key="item.productId">
          <Card class="flex gap-4 relative">
            <img :src="item.productImgUrl" class="h-[125px] w-[125px]" />
            <div class="flex py-4 flex-col">
              <CommonAppLink class="!font-bold" to="/test">
                {{ item.productVendorName }}
              </CommonAppLink>
              <h4>{{ item.productName }}</h4>
              <h5 class="font-bold text-sm">${{ item.price }}</h5>
              <div class="flex mt-1">
                <Button
                  class="text-xs bg-violet-500 text-white"
                  variant="outline"
                  size="xs"
                  :disabled="item.quantity === 1"
                  @click="decreaseItemQuantity(index)"
                >
                  <Minus class="h-3 w-3" />
                </Button>
                <div class="border border-input w-8 text-center">
                  {{ item.quantity }}
                </div>
                <Button
                  class="text-xs bg-violet-500 text-white"
                  variant="outline"
                  size="xs"
                  @click="increaseItemQuantity(index)"
                >
                  <Plus class="h-3 w-3" />
                </Button>
              </div>
              <CircleX
                class="absolute right-3 cursor-pointer"
                fill="#cbd5e1"
                color="#1e293b"
                stroke-width="1"
                @click="removeCartItem(index)"
              />
            </div>
          </Card>
        </li>
      </ul>
    </CardContent>
    <CardContent class="py-0 border-b-slate-200"> <div /></CardContent>
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Button from '../ui/button/Button.vue'
import { CircleX, Plus, Minus } from 'lucide-vue-next'
import { useCartStore } from '~/store/cart'

const cartStore = useCartStore()
const { decreaseItemQuantity, increaseItemQuantity, removeCartItem } = cartStore
const { totalQuantity, cartItems } = storeToRefs(cartStore)
</script>

<style scoped></style>
