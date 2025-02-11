<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  urlName: String,
});

</script>

<template>
  <RouterLink :to="{ name: urlName }" class="rounded bg-green-400 hover:bg-green-500 font-bold py-2 px-10 text-center">
    <slot></slot>
  </RouterLink>
</template>

<style scoped></style>
