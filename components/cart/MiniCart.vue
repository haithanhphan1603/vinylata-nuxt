<template>
  <Card class="w-[420px] overflow-scroll max-h-[620px]">
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
          <CartMiniCartItem
            :item
            @decrease-quantity="decreaseItemQuantity(index)"
            @increase-quantity="increaseItemQuantity(index)"
            @remove-item="removeCartItem(index)"
          />
        </li>
      </ul>
    </CardContent>
    <CardContent class="py-0 border-b-slate-200" />
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

const cartStore = useCartStore()
const { decreaseItemQuantity, increaseItemQuantity, removeCartItem } = cartStore
const { totalQuantity, cartItems } = storeToRefs(cartStore)
</script>

<style scoped></style>
