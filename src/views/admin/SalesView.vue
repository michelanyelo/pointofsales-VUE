<script setup>
import { useSalesStore } from '@/stores/sales';
import SaleDetailComp from '@/components/sales/SaleDetailComp.vue'
import { formatCurrency } from '@/helpers/currency';

const salesStore = useSalesStore();
</script>

<template>
  <div>
    <h1 class="text-4xl font-black">Resumen de ventas</h1>
    <div class="md:flex md:items-start gap-5">
      <div class="md:w-1/2 lg:w-1/3 bg-white flex justify-center mt-5">
        <!-- Element Plus DatePicker -->
        <el-date-picker v-model="salesStore.date" type="daterange" range-separator=" | " start-placeholder="Entrada"
          end-placeholder="Salida" format="DD/MM/YYYY" size="large" value-format="DD/MM/YYYY">
          <!-- Slot para el ícono del calendario -->
          <template #prefix>
            <i class="fa-solid fa-calendar-days text-gray-500"></i>
          </template>
        </el-date-picker>
      </div>
      <div class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-5 pb-32">
        <p class="text-center text-xl font-bold text-green-600 animate-pulse" v-if="!salesStore.isDateSelected">
          Selecciona un rango de fechas para ver las ventas
        </p>
        <p class="text-center text-xl" v-else>
          Ventas de la fecha:
          <span class="font-black text-green-600 ml-1">{{ salesStore.date.join(" - ") }}</span>
        </p>
        <div class="space-y-5" v-if="salesStore.salesCollection.length">
          <SaleDetailComp v-for="(sale, index) in salesStore.salesCollection" :key="sale.id" :sale="sale"
            :index="index" />
          <p class="text-right text-2xl">Total del día:
            <span class="font-black">{{ formatCurrency(salesStore.totalSalesDay) }}</span>
          </p>
        </div>
        <p v-else-if="salesStore.noSales" class="text-center text-xl font-bold  text-red-600 animate-pulse">
          No hay
          ventas
          registradas en este
          día</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-green-600 {
  color: #42b983;
  /* Verde de Vue */
}

.animate-pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}
</style>
