<script lang="ts" setup>
import { useAppStore } from '../store/app'

const appStore = useAppStore()

appStore.fetchProducts()
</script>

<template>
  <section class="container">
    <SectionHeroSection />
    <SectionNewProductSection class="mt-24" />
  </section>
</template>
