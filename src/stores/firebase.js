import { defineStore } from "pinia";
import { useFirestore, useCollection } from "vuefire";
import { collection, addDoc, where, query, orderBy, updateDoc } from "firebase/firestore";
import { computed } from "vue";

export const useFirebaseStore = defineStore('firebase', () => {

  const db = useFirestore();
  const productsRef = collection(db, 'products');

  async function createProduct(product) {
    await addDoc(...productsRef, product);
  }

  async function updateProduct(docRef, product) {
    const { image, url, ...values } = product;

    if (image.length) {
      await updateDoc(docRef, {
        ...values,
        image: url.value
      });
    } else {
      await updateDoc(docRef, values);
    }
  }

  const q = query(
    productsRef,
    where('stock', '>', 0),
    orderBy('name', 'asc'),
  );

  const productsCollection = useCollection(q);

  const noResults = computed(() => productsCollection.value.length === 0);

  return {
    createProduct,
    updateProduct,
    productsCollection,
    noResults
  }

});
