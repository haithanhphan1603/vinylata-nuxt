<template>
  <Card class="w-[420px]">
    <CardHeader class="text-center border-b-slate-200 border-b">
      <CardTitle class="text-xl"
        >Your Viny<span class="text-violet-600">lata</span> Cart ({{
          totalQuantity
        }})</CardTitle
      >
    </CardHeader>
    <CardContent class="p-0">
      <ul>
        <li v-for="item in cartItems" :key="item.productId">
          <Card class="flex gap-4">
            <img :src="item.productImgUrl" class="h-[125px] w-[125px]" />
            <div class="flex py-4 flex-col">
              <CommonAppLink class="!font-bold" to="/test">
                {{ item.productVendorName }}
              </CommonAppLink>
              <h4>{{ item.productName }}</h4>
              <h5 class="font-bold text-sm">${{ item.price }}</h5>
            </div>
          </Card>
        </li>
      </ul>
    </CardContent>
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
import { useCartStore } from '~/store/cart'

const { totalQuantity, cartItems } = storeToRefs(useCartStore())
</script>

<style scoped></style>
