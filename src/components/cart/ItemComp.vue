<script setup>
import { formatCurrency } from '@/helpers/currency';

defineProps({
  item: Object
});
</script>

<template>
  <li class="flex space-x-6 py-6">
    <img :src="item.image" :alt="`Imagen para el producto ${item.name}`" class="h-20 w-20 flex-none rounded-md">

    <div class="flex-auto space-y-2">
      <h3 class="text-gray-900">{{ item.name }}</h3>
      <p>{{ formatCurrency(item.price) }}</p>
    </div>
  </li>
</template>

<style scoped></style>
