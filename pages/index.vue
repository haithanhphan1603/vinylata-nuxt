<script lang="ts" setup>
useHead({
  title: 'Vinylata',
  meta: [{ name: 'description', content: 'My amazing site.' }],
})
</script>

<template>
  <section class="container">
    <SectionHeroSection />
    <SectionProductSection class="mt-24" />
    <SectionCategorySection class="mt-24" />
    <SectionLetterSubscriptionSection class="my-12" />
    <SectionAboutSection />
  </section>
</template>

<style scoped></style>
