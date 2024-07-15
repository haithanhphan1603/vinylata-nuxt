<script lang="ts" setup>
import { useAppStore } from '../store/appStore'

const appStore = useAppStore()

appStore.fetchProducts()
</script>

<template>
  <section class="container">
    <SectionHeroSection />
  </section>
</template>
