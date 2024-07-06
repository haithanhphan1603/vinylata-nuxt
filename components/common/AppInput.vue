<script lang="ts" setup>
const modelValue = defineModel()
</script>

<template>
  <!-- Apply Tailwind CSS classes for styling -->
  <input
    v-bind="$attrs"
    v-model="modelValue"
    type="text"
    class="border border-slate-300 text-slate-700 placeholder-slate-400 focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 rounded-md outline-none"
  />
</template>
