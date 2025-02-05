import { defineStore } from "pinia";
import { computed } from "vue";

export const useProductsStore = defineStore('products', () => {

  const categories = [
    {
      id: 1,
      name: 'Sudaderas'
    },
    {
      id: 2,
      name: 'Tenis'
    },
    {
      id: 3,
      name: 'Lentes'
    }
  ];

  // Formato a FormKit con opción deshabilitada
  const categoryOptions = computed(() => {
    const options = categories.map(category => ({
      label: category.name,
      value: category.id
    }));

    // Agregar la opción deshabilitada al inicio
    return [
      { label: 'Seleccione:', value: '', attrs: { disabled: true } }, // Opción deshabilitada
      ...options // Las demás opciones
    ];
  });

  async function createProduct(product) {
    console.log(product);
  }

  return {
    createProduct,
    categoryOptions
  }
});
