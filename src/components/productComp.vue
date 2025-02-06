<script setup>
import { formatCurrency } from '@/helpers/currency'

defineProps({
  product: Object
});
</script>

<template>
  <li class="flex items-center space-x-6 border border-gray-200 p-6 bg-white shadow">
    <img :src="product.image" :alt="product.name" class="h-28 w-28">
    <div class="space-y-2">
      <h3 class="text-gray-900">{{ product.name }}</h3>
      <p class="font-bold">{{ formatCurrency(product.price) }}</p>
      <p>{{ product.stock }} existencias</p>
    </div>
  </li>
</template>

<style scoped></style>
