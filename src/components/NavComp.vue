<script setup>
import NavlinkComp from './NavlinkComp.vue';

</script>

<template>
  <header class="px-10 py-5 bg-gray-700 flex justify-between absolute top-0 w-full z-10">
    <div>
      <h1 class="text-3xl font-black text-white">POS <span class="text-green-400">Vue.js</span></h1>
    </div>
    <nav class="py-3">
      <NavlinkComp url-name="admin">Administrar</NavlinkComp>
    </nav>
  </header>
</template>

<style scoped></style>
