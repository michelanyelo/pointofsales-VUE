<script setup>
defineProps({
  product: Object
});
</script>

<template>
  <div class="rounded bg-white shadow relative">
    <img :src="product.image" :alt="`Imagen de ${product.name}`">
  </div>
</template>

<style scoped></style>
