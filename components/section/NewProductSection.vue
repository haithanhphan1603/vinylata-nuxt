<template>
  <section>
    <h1 class="text-violet-950 font-extrabold text-3xl">NEWLY RELEASE</h1>
    <div class="grid gap-4 grid-cols-5 mt-10">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAppStore } from '~/store/app'
const { products } = storeToRefs(useAppStore())
</script>

<style scoped></style>
