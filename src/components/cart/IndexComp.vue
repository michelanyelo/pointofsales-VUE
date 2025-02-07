<script setup>
import { useCartStore } from '@/stores/cart';
import ItemComp from './ItemComp.vue';

const cartStore = useCartStore();
</script>

<template>
  <p v-if="cartStore.isEmpty" class="text-xl text-center text-gray-900">Tu carro está vacío. ¡Descubre las últimas
    tendencias de moda que tenemos para ti!</p>
  <div v-else>
    <p class="text-xl font-bold text-gray-600">Carro ({{ cartStore.items.length }})</p>
    <ul role="list" class="mt-6 divide-y divide-gray-200">
      <ItemComp v-for="item in cartStore.items" :key="item.id" :item="item" />
    </ul>
  </div>
</template>

<style scoped></style>
