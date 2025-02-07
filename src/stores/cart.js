import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore('cart', () => {

  const items = ref([]);

  const max_products = 5

  function addItem(item) {
    items.value.push(item);
  }

  const isEmpty = computed(() => items.value.length === 0);

  const checkProductStock = computed(() => {
    return (product) => product.stock < max_products ? product.stock : max_products;
  });

  return {
    addItem,
    isEmpty,
    items,
    checkProductStock
  }
});
