<template>
  <Card class="w-[420px] overflow-scroll max-h-[620px]">
    <CardHeader class="text-center border-b-slate-200 border-b">
      <CardTitle class="text-xl"
        >Your Viny<span class="text-violet-600">lata</span> Cart ({{
          totalQuantity
        }})</CardTitle
      >
    </CardHeader>
    <div v-if="cartItems.length > 0">
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
        <div class="flex gap-2">
          <Button class="w-full uppercase font-bold" @click="navigateToCart">
            Proceed to Checkout
          </Button>
        </div>
      </CardContent>
    </div>
    <CardContent v-else>
      <div class="flex flex-col items-center justify-center p-6">
        <ShoppingBasket class="h-16 w-16 text-violet-600" />
        <h3 class="text-xl">Your cart is empty</h3>
        <Button class="mt-4" @click="navigateToAllProducts">
          Continue Shopping
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '~/store/cart'
import { Earth, ShieldCheck, ShoppingBasket } from 'lucide-vue-next'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'

const cartStore = useCartStore()
const { decreaseItemQuantity, increaseItemQuantity, removeCartItem } = cartStore
const { totalQuantity, cartItems, cart } = storeToRefs(cartStore)
const router = useRouter()

const totalPrice = computed(() => {
  return cart.value?.totalprice?.toFixed(2)
})

const navigateToCart = () => {
  router.push('/cart')
}

const navigateToAllProducts = () => {
  router.push('/collections/all')
}
</script>

<style scoped></style>
