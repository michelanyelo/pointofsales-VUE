import { defineStore } from "pinia";
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire";
import { collection, addDoc, where, query, orderBy, updateDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { ref, computed } from "vue";
import { ref as storageRef, deleteObject } from "firebase/storage";

export const useProductsStore = defineStore('products', () => {
  // Inicialización de Firebase
  const db = useFirestore();
  const productsRef = collection(db, 'products');
  const storage = useFirebaseStorage();

  // Estado local
  const selectedCategory = ref(1);

  const categories = [
    { id: 1, name: 'Sudaderas' },
    { id: 2, name: 'Tenis' },
    { id: 3, name: 'Lentes' }
  ];

  // Consulta para obtener productos con stock mayor a 0, ordenados por nombre
  const q = query(
    productsRef,
    where('stock', '>', 0),
    orderBy('name', 'asc')
  );

  const productsCollection = useCollection(q);

  // Propiedad computada para verificar si no hay resultados
  const noResults = computed(() => productsCollection.value.length === 0);

  // Formato a FormKit con opción deshabilitada
  const categoryOptions = computed(() => {
    const options = categories.map(category => ({
      label: category.name,
      value: category.id
    }));
    return [
      { label: 'Seleccione:', value: '', attrs: { disabled: true } },
      ...options
    ];
  });

  // Filtrado de productos por categoría
  const filteredProducts = computed(() => {
    return productsCollection.value.filter(product => product.category === selectedCategory.value);
  });

  // Función para crear un producto en Firestore
  async function createProduct(product) {
    await addDoc(productsRef, product);
  }

  // Función para actualizar un producto existente
  async function updateProduct(docRef, product) {
    const { image, url, ...values } = product;
    if (image.length) {
      await updateDoc(docRef, { ...values, image: url.value });
    } else {
      await updateDoc(docRef, values);
    }
  }

  // Función para eliminar un producto y su imagen asociada
  async function deleteProduct(id) {
    try {
      if (!confirm('¿Desea eliminar el producto?')) return;
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.error('El producto no existe.');
        return;
      }
      const { image } = docSnap.data();
      await deleteDoc(docRef);
      if (image) {
        const imageRef = storageRef(storage, image);
        await deleteObject(imageRef);
      }
      console.log('Producto eliminado correctamente.');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  }

  // Retornar funciones y propiedades del store
  return {
    createProduct,
    updateProduct,
    deleteProduct,
    productsCollection,
    noResults,
    categoryOptions,
    filteredProducts,
    categories,
    selectedCategory
  };
});
