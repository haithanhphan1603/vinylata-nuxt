<template>
  <div class="bg-gradient-to-b from-violet-950 to-violet-900 py-10">
    <h2 class="font-extrabold text-4xl text-violet-50 text-center uppercase">
      Keep In Touch
    </h2>
    <div class="flex gap-4 mt-6 px-44">
      <Input placeholder="Name" />
      <Input placeholder="Email" type="email" />
      <Button class="px-12 text-md font-bold bg-violet-500 uppercase"
        >Sign up</Button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import Input from '../ui/input/Input.vue'
import Button from '../ui/button/Button.vue'
</script>

<style></style>
