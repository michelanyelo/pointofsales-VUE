<script setup>
import NavlinkComp from '@/components/navigation/NavlinkComp.vue';
</script>

<template>
  <div>
    <NavlinkComp url-name="products">Volver</NavlinkComp>
    <h1 class="text-4xl font-black mt-4">Nuevo producto</h1>

    <FormKit type="form">
      <FormKit type="text" />
    </FormKit>
  </div>
</template>

<style scoped></style>
