<template>
  <section>
    <img
      src="/news.webp"
      alt="Photo by Drew Beamer"
      class="rounded-md object-cover w-full h-[30rem]"
    />
    <div class="flex gap-20 items-center justify-center w-full">
      <img class="hero-section__brand" src="/brand/brand1.png" alt="brand1" />
      <img class="hero-section__brand" src="/brand/brand2.png" alt="brand2" />
      <img class="hero-section__brand" src="/brand/brand3.png" alt="brand3" />
      <img class="hero-section__brand" src="/brand/brand4.png" alt="brand4" />
      <img class="hero-section__brand" src="/brand/brand5.png" alt="brand5" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero-section__brand {
  filter: brightness(0);
  opacity: 50%;
  width: 8rem;
}
</style>
