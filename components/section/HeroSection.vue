<script setup lang="ts">
import { AspectRatio } from '@/components/ui/aspect-ratio'
</script>

<template>
  <AspectRatio :ratio="16 / 9">
    <img
      src="/news.webp"
      alt="Photo by Drew Beamer"
      class="rounded-md object-cover w-full h-3/4"
    />
  </AspectRatio>
</template>
