<script lang="ts" setup>
const searchKey = ref('')
</script>

<template>
  <header class="shadow-md">
    <div class="container mx-auto p-5">
      <div class="flex items-center">
        <CommonAppIcon />
        <div class="w-full mx-8 flex justify-center items-center">
          <CommonAppSearchBar v-model="searchKey" />
        </div>
        <div>
          <ul class="flex gap-2">
            <li>
              <CommonAppColorMode />
            </li>
          </ul>
        </div>
      </div>
      <nav class="mt-4 flex justify-center items-center">
        <ul class="flex gap-8 justify-end">
          <li><CommonAppLink to="/">Home</CommonAppLink></li>
          <li><CommonAppLink to="/about">About</CommonAppLink></li>
          <li><CommonAppLink to="/">Genres</CommonAppLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>
