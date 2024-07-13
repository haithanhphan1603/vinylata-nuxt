<script lang="ts" setup>
import { Search } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
const searchKey = defineModel<string>()
</script>

<template>
  <div class="relative w-full max-w-sm items-center">
    <Input
      id="search"
      v-model="searchKey"
      type="text"
      placeholder="Search..."
      class="pl-10 border border-gray-300 rounded-lg w-full h-10 focus:outline-none outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
    />
    <span
      class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
    >
      <Search class="size-6 text-muted-foreground" />
    </span>
  </div>
</template>
