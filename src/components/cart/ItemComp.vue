<script setup>
import { useCartStore } from '@/stores/cart';
import { formatCurrency } from '@/helpers/currency';

const cartStore = useCartStore();

// Props
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
      <select name="amount" class="w-48 text-center p-1 rounded-lg bg-white"
        @change="cartStore.updateQuantity(item.id, +$event.target.value)" :value="item.quantity">
        <option v-for="i in cartStore.checkProductStock(item)" :key="i" :value="i">{{ i }}</option>
      </select>
      <!-- Mostrar mensaje de error personalizado -->
      <div v-if="item.error" class="text-sm text-red-600">
        <p>Has alcanzado el límite máximo de productos</p>
      </div>
    </div>
  </li>
</template>

<style scoped></style>
