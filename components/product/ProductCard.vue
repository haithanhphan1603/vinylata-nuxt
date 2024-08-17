<template>
  <Card class="h-96 border-none">
    <CardHeader
      class="'rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50',"
    >
      <img :src="product.primaryImage" :alt="product.name" />
    </CardHeader>
    <CommonAppLink to="/" class="text-lg font-semibold text-slate-800 mt-4">
      {{ product.name }}
    </CommonAppLink>
    <p>
      {{ product.vendors?.name }}
    </p>
    <span class="text-sm font-semibold text-slate-400">
      {{ product.productType }}
    </span>
    <p class="text-md font-semibold text-slate-600">
      {{ product.currency }} {{ product.unitPrice }}
    </p>
  </Card>
</template>

<script setup lang="ts">
import Card from '../ui/card/Card.vue'
import CardHeader from '../ui/card/CardHeader.vue'
interface Props {
  product: Product
}

defineProps<Props>()
</script>

<style scoped></style>
