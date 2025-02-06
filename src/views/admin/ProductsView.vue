<script setup>
import NavlinkComp from '@/components/navigation/NavlinkComp.vue';
import { useProductsStore } from '@/stores/products';
import productComp from '@/components/ProductComp.vue';

const productsStore = useProductsStore();

</script>

<template>
  <div>
    <NavlinkComp url-name="new-product">Agregar</NavlinkComp>
    <h1 class="text-4xl font-black mt-4">Productos</h1>

    <p v-if="productsStore.noResults">No hay resultados</p>

    <ul v-else role="list" class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
      <productComp v-for="product in productsStore.productsCollection" :key="product.id" :product="product" />
    </ul>
  </div>
</template>

<style scoped></style>
