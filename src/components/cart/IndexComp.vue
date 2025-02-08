<script setup>
import { useCartStore } from '@/stores/cart';
import ItemComp from './ItemComp.vue';
import AmountComp from './AmountComp.vue';
import CouponComp from '../CouponComp.vue';
import { formatCurrency } from '@/helpers/currency';

const cartStore = useCartStore();
</script>

<template>
  <p v-if="cartStore.isEmpty" class="text-xl text-center text-gray-900">Tu carro está vacío. ¡Descubre las últimas
    tendencias de moda que tenemos para ti!</p>
  <div v-else>
    <p class="text-xl font-bold text-gray-600">Resumen de la compra </p>
    <ul role="list" class="mt-6 divide-y divide-gray-200">
      <ItemComp v-for="item in cartStore.items" :key="item.id" :item="item" />
    </ul>

    <dl class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-700">
      <AmountComp>
        <template #label>Productos ({{ cartStore.totalQuantity }}) </template>
        {{ formatCurrency(cartStore.subtotal) }}
      </AmountComp>

      <!-- <AmountComp>
        <template #label>Impuestos: </template>
        {{ formatCurrency(300) }}
      </AmountComp> -->

      <AmountComp>
        <template #label>Total a pagar: </template>
        {{ formatCurrency(cartStore.subtotal) }}
      </AmountComp>
    </dl>

    <CouponComp />

  </div>
</template>

<style scoped></style>
