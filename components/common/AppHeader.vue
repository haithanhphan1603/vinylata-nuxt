<script lang="ts" setup>
import AppLink from './AppLink.vue'
import AppInput from './AppInput.vue'

const searchKey = ref('')
</script>

<template>
  <header class="bg-white text-black shadow-md">
    <div class="container mx-auto flex justify-between items-center p-5">
      <div class="text-3xl font-semibold flex items-center gap-1">
        <Icon class="text-violet-600" size="2.5rem" name="arcticons:vinyl" />
        <div>
          <p class="text-sm font-medium -mb-2">THE</p>
          <h1>VINY<span class="text-violet-600">LATA</span></h1>
        </div>
      </div>
      <div>
        <app-input placeholder="test" v-model="searchKey"></app-input>
      </div>
      <ul class="flex gap-8 font-normal">
        <li><AppLink to="/" label="home">Home</AppLink></li>
        <li><AppLink to="/about" label="about">About</AppLink></li>
        <li><AppLink to="/" label="genres"></AppLink></li>
      </ul>
    </div>
  </header>
</template>
