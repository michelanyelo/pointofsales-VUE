<script setup>
import { formatCurrency } from '@/helpers/currency'

defineProps({
  product: Object
});
</script>

<template>
  <li class="flex items-center space-x-6 border border-gray-200 p-6 bg-white shadow">
    <img :src="product.image" :alt="product.name" class="h-28 w-28">
    <div class="space-y-2 flex-auto">
      <h3 class="text-gray-900">{{ product.name }}</h3>
      <p class="font-bold">{{ formatCurrency(product.price) }}</p>
      <p>{{ product.stock }} existencias</p>
    </div>

    <div>
      <RouterLink :to="{ name: 'edit-product', params: { id: product.id } }">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6 text-gray-600">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
      </RouterLink>
    </div>
  </li>
</template>

<style scoped></style>
