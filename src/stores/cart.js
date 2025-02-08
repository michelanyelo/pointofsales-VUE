import { computed, ref, watchEffect } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore('cart', () => {

  const items = ref([]);
  const subtotal = ref(0);
  const totalQuantity = ref(0);

  const max_products = 5

  watchEffect(() => {
    subtotal.value = items.value.reduce((total, item) => total + (item.quantity * item.price), 0)
    totalQuantity.value = items.value.reduce((total, item) => total + item.quantity, 0)
  });

  function addItem(item) {
    const index = isItemInCart(item.id)

    if (index >= 0) {
      items.value[index].quantity++;
    } else {
      items.value.push({ ...item, quantity: 1, id: item.id });
    }
  }

  function updateQuantity(id, quantity) {
    items.value = items.value.map(item => item.id === id ? { ...item, quantity } : item);
  }

  const isEmpty = computed(() => items.value.length === 0);

  const isItemInCart = id => items.value.findIndex(item => item.id === id);

  const checkProductStock = computed(() => {
    return (product) => product.stock < max_products ? product.stock : max_products;
  });

  return {
    addItem,
    updateQuantity,
    isEmpty,
    items,
    checkProductStock,
    subtotal,
    totalQuantity
  }
});
