<template>
  <header class="bg-white text-black shadow-md">
    <div class="container mx-auto flex justify-between items-center p-5">
      <div class="text-3xl font-semibold flex items-center gap-1">
        <Icon class="text-sky-600" size="2.5rem" name="tabler:vinyl" />
        <h1>Viny<span class="text-sky-600">lata</span></h1>
      </div>
      <ul class="flex gap-8">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/">Genres</NuxtLink></li>
      </ul>
    </div>
  </header>
</template>
