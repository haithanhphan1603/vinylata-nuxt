<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

enum ProductType {
  LP = 'LP',
  _2LP = '2LP',
  CD = 'CD',
  CDDVD = 'CD+DVD',
}

interface SearchInfo {
  productType: string[]
  sortBy: string
  start: number
  end: number
}

const searchInfo = defineModel({
  type: Object as () => SearchInfo,
  required: true,
})

const productTypeOptions = [
  {
    id: ProductType.LP,
    label: ProductType.LP,
  },
  {
    id: ProductType.CD,
    label: ProductType.CD,
  },
  {
    id: ProductType.CDDVD,
    label: ProductType.CDDVD,
  },
  {
    id: ProductType._2LP,
    label: ProductType._2LP,
  },
]

const accordionItems = [
  {
    value: 'item-1',
    title: 'Format',
  },
]

const defaultAccordionItems = accordionItems.map((item) => item.value)
</script>

<template>
  <Accordion
    type="multiple"
    class="w-full pr-8"
    :default-value="defaultAccordionItems"
  >
    <AccordionItem
      v-for="item in accordionItems"
      :key="item.value"
      :value="item.value"
    >
      <AccordionTrigger class="text-lg font-extrabold">{{
        item.title
      }}</AccordionTrigger>
      <AccordionContent>
        <div class="flex gap-2 flex-col">
          <div v-for="option in productTypeOptions" :key="option.id">
            <Checkbox
              :id="option.id"
              :checked="searchInfo.productType.includes(option.id)"
              @update:checked="
                (checked) => {
                  if (checked) {
                    searchInfo.productType.push(option.id)
                  } else {
                    const index = searchInfo.productType.indexOf(option.id)
                    if (index > -1) {
                      searchInfo.productType.splice(index, 1)
                    }
                  }
                }
              "
            />
            <label
              :for="option.id"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-2"
            >
              {{ option.label }} Vinyl
            </label>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
