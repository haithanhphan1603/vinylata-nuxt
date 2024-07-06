<script lang="ts" setup>
import { useAppStore } from '../store/appStore'

const appStore = useAppStore()
const { products } = storeToRefs(appStore)

appStore.fetchProducts()
</script>

<template>
  <div>{{ products }}</div>
</template>
