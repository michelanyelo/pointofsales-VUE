import { defineStore } from "pinia"; // Importa la función para definir un store de Pinia
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire"; // Importa utilidades de VueFire
import { collection, addDoc, where, query, orderBy, updateDoc, doc, getDoc, deleteDoc } from "firebase/firestore"; // Importa funciones de Firestore
import { computed } from "vue"; // Importa la función para crear propiedades computadas
import { ref as storageRef, deleteObject } from "firebase/storage"; // Importa funciones de Firebase Storage

export const useFirebaseStore = defineStore('firebase', () => {
  const db = useFirestore(); // Inicializa Firestore
  const productsRef = collection(db, 'products'); // Referencia a la colección 'products'
  const storage = useFirebaseStorage(); // Inicializa Firebase Storage

  // Función para crear un producto en Firestore
  async function createProduct(product) {
    await addDoc(productsRef, product); // Añade un nuevo documento a la colección 'products'
  }

  // Función para actualizar un producto existente
  async function updateProduct(docRef, product) {
    const { image, url, ...values } = product; // Desestructura los datos del producto
    if (image.length) {
      // Si hay una nueva imagen, actualiza el documento con la nueva URL
      await updateDoc(docRef, {
        ...values,
        image: url.value
      });
    } else {
      // Si no hay nueva imagen, actualiza solo los demás campos
      await updateDoc(docRef, values);
    }
  }

  // Función para eliminar un producto y su imagen asociada
  async function deleteProduct(id) {
    try {
      // Confirmar con el usuario si desea eliminar el producto
      if (!confirm('¿Desea eliminar el producto?')) {
        return; // Salir si el usuario cancela
      }

      // Referencia al documento en Firestore
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);

      // Verificar si el documento existe
      if (!docSnap.exists()) {
        console.error('El producto no existe.');
        return;
      }

      // Obtener la URL de la imagen del documento
      const { image } = docSnap.data();

      // Eliminar el documento de Firestore
      await deleteDoc(docRef);

      // Eliminar la imagen del Storage (si existe)
      if (image) {
        const imageRef = storageRef(storage, image);
        await deleteObject(imageRef);
      }

      console.log('Producto eliminado correctamente.');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  }

  // Consulta para obtener productos con stock mayor a 0, ordenados por nombre
  const q = query(
    productsRef,
    where('stock', '>', 0), // Filtra productos con stock disponible
    orderBy('name', 'asc'), // Ordena los productos por nombre ascendente
  );

  // Colección de productos que cumple con la consulta
  const productsCollection = useCollection(q);

  // Propiedad computada para verificar si no hay resultados
  const noResults = computed(() => productsCollection.value.length === 0);

  // Retorna las funciones y propiedades del store
  return {
    createProduct,
    updateProduct,
    deleteProduct,
    productsCollection,
    noResults
  };
});
