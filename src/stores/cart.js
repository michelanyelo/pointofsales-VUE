import { computed, ref, watchEffect } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);
  const subtotal = ref(0);
  const totalQuantity = ref(0);
  const max_products = 5;

  // Observador para calcular subtotal y cantidad total
  watchEffect(() => {
    subtotal.value = items.value.reduce((total, item) => total + (item.quantity * item.price), 0);
    totalQuantity.value = items.value.reduce((total, item) => total + item.quantity, 0);
  });

  // Agregar un artículo al carrito
  function addItem(item) {
    const index = isItemInCart(item.id);
    if (index >= 0) {
      if (isOutStock(item, index)) {
        items.value[index].error = true;
        return;
      }
      items.value[index].quantity++;
      items.value[index].error = false
    } else {
      items.value.push({ ...item, quantity: 1, id: item.id, error: null }); // Inicializar sin error
    }
  }

  // Actualizar la cantidad de un artículo
  function updateQuantity(id, quantity) {
    const item = items.value.find((i) => i.id === id);
    if (!item) return;

    // Actualizar la cantidad si es válida
    item.quantity = quantity;
    item.error = null; // Limpiar error si no hay problemas
  }

  // Verificar si el carrito está vacío
  const isEmpty = computed(() => items.value.length === 0);

  // Verificar si un artículo está en el carrito
  const isItemInCart = (id) => items.value.findIndex((item) => item.id === id);

  // Verificar si un artículo está fuera de stock
  const isOutStock = (item, index) =>
    items.value[index].quantity >= item.stock || items.value[index].quantity >= max_products;

  // Calcular el stock máximo disponible para un producto
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
    totalQuantity,
  };
});
