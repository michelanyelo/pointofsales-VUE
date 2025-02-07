<script setup>
import NavMainComp from '@/components/navigation/NavMainComp.vue';
import ProductCardComp from '@/components/ProductCardComp.vue';
import CartComp from '@/components/cart/IndexComp.vue';
import { useProductsStore } from '@/stores/products';

const productsStore = useProductsStore();

</script>

<template>
  <NavMainComp />

  <main class="pt-20 lg:flex lg:h-screen lg:overflow-y-hidden">
    <div class="lg:w-2/3 lg:h-screen lg:overflow-y-scroll pt-10 mt-10 pb-32 px-10">
      <p v-if="productsStore.noResults" class="text-center text-4xl">No hay productos</p>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
        <ProductCardComp v-for="product in productsStore.filteredProducts" :key="product.id" :product="product" />
      </div>
    </div>

    <aside class="lg:w-1/3 lg:h-screen lg:overflow-y-scroll pt-20 pb-32 px-10">
      <CartComp />
    </aside>
  </main>
</template>

<style scoped></style>
