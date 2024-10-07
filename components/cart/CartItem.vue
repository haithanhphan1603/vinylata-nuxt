<template>
  <div class="flex items-center justify-between py-4 border-b">
    <div class="flex w-1/2 gap-8 items-center">
      <img
        :src="product?.primaryImage"
        alt="Product image"
        class="w-40 h-40 object-contain"
      />
      <div>
        <h3 class="font-bold">{{ product?.name }}</h3>
        <p class="text-sm text-gray-600">{{ product?.vendors.name }}</p>
      </div>
    </div>
    <div class="flex w-1/2 justify-between text-center">
      <p class="font-bold w-1/3">{{ item.price }}</p>
      <div class="flex items-center justify-center w-1/3">
        <button
          class="px-2 py-1 bg-gray-200 text-black"
          @click="emit('decreaseQuantity')"
        >
          -
        </button>
        <span class="px-4 py-1 border-t border-b">{{ item.quantity }}</span>
        <button
          class="px-2 py-1 bg-green-500 text-white"
          @click="emit('increaseQuantity')"
        >
          +
        </button>
      </div>
      <p class="font-bold w-1/3">{{ itemPrice }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tables } from '~/types/database.types'

interface Props {
  item: Tables<'cartItem'>
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'removeItem' | 'decreaseQuantity' | 'increaseQuantity'): void
}>()

interface ProductWithVendor extends Tables<'products'> {
  vendors: { name: string }
}

const product = ref<ProductWithVendor | null>(null)

const itemPrice = computed(() => {
  return (props.item.quantity * (product.value?.unitPrice ?? 0)).toFixed(2)
})

const supabase = useSupabaseClient()

async function fetchProduct() {
  const { data, error } = await supabase
    .from('products')
    .select('name, unitPrice, primaryImage, vendors(name)')
    .eq('id', props.item.productId)
  if (error) {
    console.error(error)
  }
  product.value = data?.[0]
}

await fetchProduct()
</script>
