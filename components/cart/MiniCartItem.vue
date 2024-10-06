<template>
  <Card class="flex gap-6 relative p-4 items-center">
    <div
      class="flex justify-center items-center h-[100px] w-[100px] min-w-[100px]"
    >
      <img :src="product?.primaryImage" class="object-contain" />
    </div>
    <div class="flex flex-col gap-0.5">
      <CommonAppLink class="!font-bold" to="/test">
        {{ product?.vendors.name }}
      </CommonAppLink>
      <div>
        <h4>{{ product?.name }}</h4>
        <h5 class="font-bold text-sm">${{ itemPrice }}</h5>
      </div>

      <div class="flex mt-1">
        <Button
          class="text-xs bg-violet-500 text-white"
          size="xs"
          :disabled="item.quantity === 1"
          @click="emit('decreaseQuantity')"
        >
          <Minus class="h-3 w-3" />
        </Button>
        <div class="border border-input w-10 text-center">
          {{ item.quantity }}
        </div>
        <Button
          class="text-xs bg-violet-500 text-white"
          size="xs"
          @click="emit('increaseQuantity')"
        >
          <Plus class="h-3 w-3" />
        </Button>
      </div>
      <CircleX
        class="absolute right-3 cursor-pointer"
        fill="#cbd5e1"
        color="#1e293b"
        stroke-width="1"
        @click="emit('removeItem')"
      />
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Card } from '../ui/card'
import Button from '../ui/button/Button.vue'
import { CircleX, Plus, Minus } from 'lucide-vue-next'
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

<style scoped></style>
