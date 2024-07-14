<script lang="ts" setup>
import AppHeader from '~/components/common/AppHeader.vue'
</script>

<template>
  <div>
    <AppHeader />
    <section class="container overflow-hidden">
      <slot />
    </section>
  </div>
</template>
