<script setup>
import { useCartStore } from '@/stores/cart';
import { useCouponStore } from '@/stores/coupons';
import ItemComp from './ItemComp.vue';
import AmountComp from './AmountComp.vue';
import CouponComp from '../CouponComp.vue';
import { formatCurrency } from '@/helpers/currency';

const cartStore = useCartStore();
const couponStore = useCouponStore();
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

      <AmountComp v-if="couponStore.isApplied" class="text-green-700">
        <template #label>Descuentos: </template>
        <p class="text-green-700 font-semibold"> -{{ formatCurrency(couponStore.discount) }}</p>
      </AmountComp>

      <AmountComp>
        <template #label>Total a pagar: </template>
        {{ formatCurrency(cartStore.total) }}
      </AmountComp>
    </dl>

    <CouponComp />

    <button type="button"
      class="mt-10 w-full bg-gray-800 hover:bg-gray-900 hover:cursor-pointer rounded-xl text-white uppercase font-semibold p-3"
      @click="cartStore.checkout">
      pagar
    </button>

  </div>
</template>

<style scoped></style>
