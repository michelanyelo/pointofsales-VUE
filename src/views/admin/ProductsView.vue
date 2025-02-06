<script setup>
import NavlinkComp from '@/components/navigation/NavlinkComp.vue';
import { useFirebaseStore } from '@/stores/firebase';
import productComp from '@/components/productComp.vue';

const productsDatabase = useFirebaseStore();

</script>

<template>
  <div>
    <NavlinkComp url-name="new-product">Agregar</NavlinkComp>
    <h1 class="text-4xl font-black mt-4">Productos</h1>

    <ul role="list" class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
      <productComp v-for="product in productsDatabase.productsCollection" :key="product.id" :product="product" />
    </ul>
  </div>
</template>

<style scoped></style>
