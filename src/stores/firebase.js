import { defineStore } from "pinia";
import { useFirestore, useCollection } from "vuefire";
import { collection, addDoc, where, query, orderBy } from "firebase/firestore";

export const useFirebaseStore = defineStore('firebase', () => {

  const db = useFirestore();

  const q = query(collection(db, 'products'));
  const productsCollection = useCollection(q);

  async function createProduct(product) {
    await addDoc(collection(db, 'products'), product);
  }

  return {
    createProduct,
    productsCollection
  }

});
