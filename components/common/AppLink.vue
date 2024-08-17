<script setup lang="ts">
interface Props {
  to: string
}
defineProps<Props>()
</script>

<template>
  <div class="hover:text-violet-600 font-normal text-base cursor-pointer">
    <nuxt-link :to>
      <slot />
    </nuxt-link>
  </div>
</template>

<style scoped>
a {
  transition: color 0.3s ease-in-out;
}
.nuxt-link-active {
  color: #8a4d76; /* Example active color, adjust as needed */
  font-weight: bold; /* Example styling, adjust as needed */
}
</style>
