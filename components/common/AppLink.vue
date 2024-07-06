<script setup lang="ts">
interface Props {
    to: string
    label: string
}
const props = defineProps<Props>();

const upperCaseLabel = computed(() => props.label.toUpperCase())

</script>

<template>
    <nuxt-link :to class="hover:text-violet-600">{{ upperCaseLabel }}</nuxt-link>
</template>

<style scoped>
a {
    transition: color .3s ease-in-out;
}
</style>