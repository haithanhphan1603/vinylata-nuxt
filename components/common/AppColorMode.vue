<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'

const colorMode = useColorMode()

const toggleTheme = () => {
  if (colorMode.preference === 'light') {
    colorMode.preference = 'dark'
  } else {
    colorMode.preference = 'light'
  }
}
</script>

<template>
  <Button
    class="border-none rounded-full p-3 hover:text-violet-600"
    variant="outline"
    @click="toggleTheme"
  >
    <Icon
      icon="radix-icons:moon"
      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Icon
      icon="radix-icons:sun"
      class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
