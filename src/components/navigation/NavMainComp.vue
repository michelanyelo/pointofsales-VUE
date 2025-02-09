<script setup>
import NavlinkComp from './NavlinkComp.vue';
import LogoComp from './LogoComp.vue';
import { useProductsStore } from '@/stores/products';

const productsStore = useProductsStore();
</script>

<template>
  <header
    class="px-10 py-5 bg-gray-700 flex flex-col lg:flex-row gap-5 lg:gap-0 lg:items-center lg:justify-between absolute top-0 w-full z-10">
    <div>
      <LogoComp />

      <div class="flex gap-5 text-white mt-2">
        <h2 class="text-lg font-extrabold">Filtros: </h2>

        <div class="flex items-center gap-2" v-for="category in productsStore.categories" :key="category.id">
          <input type="radio" name="category" :id="category.id" :value="category.id"
            :checked="productsStore.selectedCategory === category.id"
            @change="productsStore.selectedCategory = +$event.target.value"
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
          <label :for="category.id" class="text-gray-100">{{ category.name }}</label>
        </div>
      </div>
    </div>

    <nav class="py-3">
      <NavlinkComp :to="{ name: 'products' }">Administrar</NavlinkComp>
    </nav>
  </header>
</template>

<style scoped></style>
