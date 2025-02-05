import { defineStore } from "pinia";
import { useFirestore } from "vuefire";
import { collection, addDoc } from "firebase/firestore";

export const useFirebaseStore = defineStore('firebase', () => {

  const db = useFirestore();

  async function createProduct(product) {
    await addDoc(collection(db, 'products'), product);
  }

  return {
    createProduct
  }

});
