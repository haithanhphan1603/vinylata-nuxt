<template>
  <Card class="flex gap-6 relative p-4 items-center">
    <div
      class="flex justify-center items-center h-[100px] w-[100px] min-w-[100px]"
    >
      <img :src="item.productImgUrl" class="object-contain" />
    </div>
    <div class="flex flex-col gap-0.5">
      <CommonAppLink class="!font-bold" to="/test">
        {{ item.productVendorName }}
      </CommonAppLink>
      <div>
        <h4>{{ item.productName }}</h4>
        <h5 class="font-bold text-sm">${{ item.price }}</h5>
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

interface Props {
  item: CartItem
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'removeItem' | 'decreaseQuantity' | 'increaseQuantity'): void
}>()
</script>

<style scoped></style>
