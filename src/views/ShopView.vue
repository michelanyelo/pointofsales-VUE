<script setup>
import NavMainComp from '@/components/navigation/NavMainComp.vue';
import { useFirebaseStore } from '@/stores/firebase';
import ProductCardComp from '@/components/ProductCardComp.vue';

const firebaseStore = useFirebaseStore();
</script>

<template>
  <NavMainComp />

  <main class="pt-20 lg:flex lg:h-screen lg:overflow-y-hidden">
    <div class="lg:w-2/3 lg:h-screen lg:overflow-y-scroll pt-10 mt-10 pb-32 px-10">
      <p v-if="firebaseStore.noResults" class="text-center text-4xl">No hay productos</p>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
        <ProductCardComp v-for="product in firebaseStore.filteredProducts" :key="product.id" :product="product" />
      </div>
    </div>

    <aside class="lg:w-1/3 lg:h-screen lg:overflow-y-scroll pt-10 pb-32 px-10">
      <p>Carro aqui</p>
    </aside>
  </main>
</template>

<style scoped></style>
