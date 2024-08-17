<template>
  <Card class="h-96 border-none">
    <div
      ref="myHoverableElement"
      class="rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 relative"
    >
      <AspectRatio :ratio="1" class="flex justify-center items-center">
        <img :src="product.primaryImage" :alt="product.name" />
      </AspectRatio>
      <Button v-if="isHovered" class="w-full font-extrabold absolute bottom-0">
        ADD TO CART
      </Button>
    </div>
    <CommonAppLink
      to="/"
      class="text-lg font-semibold text-slate-800 mt-4 dark:text-slate-50"
    >
      {{ product.name }}
    </CommonAppLink>
    <p class="text-slate-950 dark:text-slate-50">
      {{ product.vendors?.name }}
    </p>
    <span class="text-sm font-semibold text-slate-400 dark:text-slate-400">
      {{ product.productType }}
    </span>
    <p class="text-md font-semibold text-slate-600 dark:text-slate-300">
      {{ product.currency }}{{ product.unitPrice }}
    </p>
  </Card>
</template>

<script setup lang="ts">
import Card from '../ui/card/Card.vue'
import Button from '../ui/button/Button.vue'
import AspectRatio from '../ui/aspect-ratio/AspectRatio.vue'
import { useElementHover } from '@vueuse/core'
interface Props {
  product: Product
}

defineProps<Props>()

const myHoverableElement = ref<HTMLElement | null>(null)
const isHovered = useElementHover(myHoverableElement)
</script>

<style scoped></style>
