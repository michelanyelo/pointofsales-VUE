import { defineStore } from "pinia";
import { computed, ref, shallowRef, watchEffect } from "vue";
import { collection, query, where, orderBy } from "firebase/firestore";
import { useFirestore, useCollection } from "vuefire";

export const useSalesStore = defineStore('sales', () => {
  const date = ref([]); // Rango de fechas seleccionado
  const db = useFirestore();
  const salesQuery = shallowRef(null);
  const salesCollection = useCollection(salesQuery);

  watchEffect(() => {
    if (date.value.length === 2) {
      const [startDate, endDate] = date.value;
      salesQuery.value = query(
        collection(db, 'sales'),
        where('date', '>=', startDate),
        where('date', '<=', endDate),
        orderBy('date')
      );
    } else {
      salesQuery.value = null;
    }
  });

  const isDateSelected = computed(() => date.value.length === 2);

  const noSales = computed(() => !salesCollection.length && date.value?.length > 0);

  const totalSalesDay = computed(() => {
    return salesCollection.value ? salesCollection.value.reduce((total, sale) => total + sale.total, 0) : 0
  });

  return {
    date,
    isDateSelected,
    salesCollection,
    noSales,
    totalSalesDay
  };
});
