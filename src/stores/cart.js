import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore('cart', () => {

  const items = ref([]);

  function addItem(item) {
    items.value.push(item);
  }

  const isEmpty = computed(() => items.value.length === 0);

  return {
    addItem,
    isEmpty
  }
});
