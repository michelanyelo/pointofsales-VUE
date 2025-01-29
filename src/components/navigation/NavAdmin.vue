<script setup>
import LogoComp from './LogoComp.vue';
import NavlinkComp from './NavlinkComp.vue';
</script>

<template>
  <header class="px-10 py-5 bg-gray-700 flex justify-between absolute top-0 w-full z-10">
    <LogoComp />
    <nav class="py-3">
      <NavlinkComp url-name="shop">Ir a la tienda</NavlinkComp>
    </nav>
  </header>
</template>

<style scoped></style>
