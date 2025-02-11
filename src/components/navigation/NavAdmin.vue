<script setup>
import { RouterLink } from 'vue-router';
import LogoComp from './LogoComp.vue';
import NavlinkComp from './NavlinkComp.vue';

</script>

<template>
  <header
    class="px-10 py-5 bg-gray-700 flex flex-col lg:flex-row gap-5 lg:gap-0 lg:items-center lg:justify-between absolute top-0 w-full z-10">
    <LogoComp />
    <nav class="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4">
      <RouterLink :to="{ name: 'products' }" class="rounded text-white font-bold p-2">Productos</RouterLink>
      <RouterLink :to="{ name: 'sales' }" class="rounded text-white font-bold p-2">Ventas</RouterLink>
      <NavlinkComp url-name="shop">Ir a la tienda</NavlinkComp>
    </nav>
  </header>
</template>

<style scoped></style>
