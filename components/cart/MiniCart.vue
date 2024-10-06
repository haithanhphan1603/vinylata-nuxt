<template>
  <Card
    v-if="cartItems.length > 0"
    class="w-[420px] overflow-scroll max-h-[620px]"
  >
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
    <CardContent>
      <div class="pt-4 border-b-slate-200 flex gap-2 justify-between">
        <div class="flex items-center gap-1">
          <div class="rounded-full bg-violet-600 p-1">
            <Earth class="h-4 w-4" color="white" stroke-width="1" />
          </div>
          <span class="text-xs">World Wide Shipping</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="rounded-full bg-violet-600 p-1">
            <ShieldCheck class="h-4 w-4" color="white" stroke-width="1" />
          </div>
          <span class="text-xs"> Secure Checkout </span>
        </div>
      </div>
      <Separator class="my-2" />
      <div class="flex justify-between text-base font-bold">
        <span>Total</span>
        <span>${{ totalPrice }}</span>
      </div>
      <Separator class="my-2" />
      <div class="flex gap-2" />
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '~/store/cart'
import { Earth, ShieldCheck } from 'lucide-vue-next'
import { Separator } from '../ui/separator'

const cartStore = useCartStore()
const { decreaseItemQuantity, increaseItemQuantity, removeCartItem } = cartStore
const { totalQuantity, cartItems, cart } = storeToRefs(cartStore)

const totalPrice = computed(() => {
  return cart.value?.totalprice?.toFixed(2)
})
</script>

<style scoped></style>
