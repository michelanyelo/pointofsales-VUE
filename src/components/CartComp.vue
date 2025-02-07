<script setup>
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
</script>

<template>
  <p v-if="cartStore.isEmpty" class="text-xl text-center text-gray-900">El carrito está vacío</p>
</template>

<style scoped></style>
