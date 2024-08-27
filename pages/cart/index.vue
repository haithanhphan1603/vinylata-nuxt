<template>
  <div>
    <div v-for="item in cartItems" :key="item.productId">
      {{ item.productId }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCartStore } from '~/store/cart'

const cartStore = useCartStore()

const { cartItems } = storeToRefs(cartStore)
console.log(cartItems)
</script>

<style scoped></style>
