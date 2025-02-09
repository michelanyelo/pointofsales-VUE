<script setup>
import { formatCurrency } from '@/helpers/currency';
import AmountComp from '../cart/AmountComp.vue';

defineProps({
  sale: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <div class="border-t border-gray-200 space-y-2 py-6">
    <h2 class="text-2xl font-black">Detalles Venta: {{ }}</h2>
    <p class="text-xl font-black text-gray-500">Producto vendido N°{{ index + 1 }}</p>
    <ul role="list" class="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium">
      <li v-for="item in sale.items" :key="item.id" class="flex space-x-6 py-6">
        <img :src="item.image" :alt="'Imagen de ' + item.name" class="h-24 w-24 flex-none rounded-lg">

        <div class="flex-auto space-y-2">
          <h3 class="text-gray-900">{{ item.name }}</h3>
          <p>{{ formatCurrency(item.price) }}</p>
          <p>Cantidad: {{ item.quantity }}</p>
        </div>
      </li>
    </ul>

    <dl class="space-y-1 border-t border-gray-200 pt-2 text-sm font-medium text-gray-700">
      <AmountComp>
        <template #label>Subtotal: </template>
        {{ formatCurrency(sale.subtotal) }}
      </AmountComp>

      <AmountComp v-if="sale.discount" class="bg-green-100">
        <template #label>Descuento: </template>
        {{ formatCurrency(sale.discount) }}
      </AmountComp>

      <AmountComp>
        <template #label>Total pagado: </template>
        {{ formatCurrency(sale.total) }}
      </AmountComp>
    </dl>
  </div>
</template>

<style scoped></style>
