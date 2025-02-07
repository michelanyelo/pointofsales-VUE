<script setup>
import { useCartStore } from '@/stores/cart';
import { formatCurrency } from '@/helpers/currency';

const cartStore = useCartStore();

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

      <select name="amount" class="w-48 text-center p-1 rounded-lg bg-white">
        <option v-for="i in cartStore.checkProductStock(item)" :value="i">{{ i }}</option>
      </select>
    </div>
  </li>
</template>

<style scoped></style>
