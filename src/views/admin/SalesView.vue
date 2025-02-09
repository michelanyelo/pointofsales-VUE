<script setup>
import { ref } from 'vue';
const date = ref('');

</script>

<template>
  <div>
    <h1 class="text-4xl font-black">Resumen de ventas</h1>
    <div class="md:flex md:items-start gap-5">
      <div class="md:w-1/2 lg:w-1/3 bg-white flex justify-center mt-5">
        <!-- Element Plus DatePicker -->
        <el-date-picker v-model="date" type="daterange" range-separator=" | " start-placeholder="Entrada"
          end-placeholder="Salida" format="DD/MM/YYYY" size="large" value-format="DD/MM/YYYY">
          <!-- Slot para el ícono del calendario -->
          <template #prefix>
            <i class="fa-solid fa-calendar-days text-gray-500"></i>
          </template>
        </el-date-picker>
        {{ date }}
      </div>
      <div class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-5 pb-32">
        <p>Ventas aquí</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
