<template>
  <div>this page required authentication</div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>

<style></style>
