import { computed, ref, watchEffect } from "vue";
import { defineStore } from "pinia";
import { getCurrentDate } from "@/helpers/date";
import { useCouponStore } from "./coupons";
import { collection, addDoc, runTransaction, doc } from "firebase/firestore";
import { useFirestore } from "vuefire";

export const useCartStore = defineStore('cart', () => {
  const couponStore = useCouponStore();
  const db = useFirestore();
  const items = ref([]);
  const max_products = 5;
  const totalQuantity = ref(0);
  const subtotal = ref(0);
  const total = ref(0);


  // Observador para calcular subtotal y cantidad total
  watchEffect(() => {
    subtotal.value = items.value.reduce((total, item) => total + (item.quantity * item.price), 0);
    totalQuantity.value = items.value.reduce((total, item) => total + item.quantity, 0);
    total.value = subtotal.value - couponStore.discount;

    // Limpiar el cupón si el carrito está vacío
    if (items.value.length === 0) {
      couponStore.$reset();
    }
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

  function removeItem(id) {
    items.value = items.value.filter(item => item.id !== id);
  }

  async function checkout() {
    try {
      // Validar que haya items en el carrito
      if (items.value.length === 0) {
        console.error("El carrito está vacío. No se puede realizar la compra.");
        return;
      }

      // Mapear los items para eliminar propiedades innecesarias
      const itemsToSend = items.value.map((item) => {
        const { stock, category, error, ...data } = item; // Eliminar propiedades no deseadas
        return data;
      });

      // Crear el documento de venta
      await addDoc(collection(db, 'sales'), {
        items: itemsToSend,
        subtotal: subtotal.value,
        total: total.value,
        discount: Number(couponStore.discount),
        date: getCurrentDate()
      });

      // Sustraer la cantidad de lo disponible
      items.value.forEach(async (item) => {
        const productRef = doc(db, 'products', item.id);
        await runTransaction(db, async (transaction) => {
          const currentProduct = await transaction.get(productRef);
          const stock = currentProduct.data().stock - item.quantity;
          transaction.update(productRef, { stock });
        });
      });

      console.log("Compra realizada exitosamente.");
      $reset();
      couponStore.$reset();
    } catch (error) {
      console.error(error);
    }
  }

  function $reset() {
    // Reiniciar el estado
    items.value = [];
    subtotal.value = 0;
    total.value = 0;
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
    removeItem,
    checkout,
    isEmpty,
    items,
    checkProductStock,
    subtotal,
    totalQuantity,
    total
  };
});
