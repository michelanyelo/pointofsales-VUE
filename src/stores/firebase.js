import { defineStore } from "pinia";
import { useFirestore, useCollection } from "vuefire";
import { collection, addDoc, where, query, orderBy } from "firebase/firestore";
import { computed } from "vue";

export const useFirebaseStore = defineStore('firebase', () => {

  const db = useFirestore();
  const productsRef = collection(db, 'products');

  async function createProduct(product) {
    await addDoc(...productsRef, product);
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
    productsCollection,
    noResults
  }

});
