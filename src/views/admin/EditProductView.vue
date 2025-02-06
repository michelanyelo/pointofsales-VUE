<script setup>
import { watch, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doc } from 'firebase/firestore'
import { useFirestore, useDocument } from 'vuefire'
import NavlinkComp from '@/components/navigation/NavlinkComp.vue'
import { useProductsStore } from '@/stores/products'
import useImage from '@/composables/useImage'

// consultar firestore
const route = useRoute();
const router = useRouter();
const idProduct = route.params.id;
const db = useFirestore();
const docRef = doc(db, 'products', idProduct);
const product = useDocument(docRef);

const { onFileChange, isImageUploaded, url } = useImage()
const productsStore = useProductsStore()

const formData = reactive({
  name: '',
  category: '',
  price: '',
  stock: '',
  image: ''
})

watch(product, (product) => {
  if (!product) {
    router.push({ name: 'products' });
  }
  // formData.name = product.name,
  //   formData.category = product.category,
  //   formData.price = product.price,
  //   formData.stock = product.stock,
  //   formData.image = product.image

  // lo anterior es igual a

  Object.assign((formData), product);
});

</script>

<template>
  <div class="mt-10">
    <NavlinkComp to="products">
      Volver
    </NavlinkComp>
    <h1 class="text-4xl my-10 font-extrabold">Editar Producto</h1>

    <div class="flex justify-center bg-white shadow">
      <div class="mx-auto mt-10 p-10 w-full  2xl:w-2/4">

        <FormKit type="form" :value="formData" submit-label="Guardar Cambios"
          incomplete-message="No se pudo enviar, revisa los mensajes" @submit="submitHandler" :actions="false">
          <FormKit type="text" label="Nombre" name="name" placeholder="Nombre de Producto" validation="required"
            v-model.trim="formData.name" :validation-messages="{ required: 'El Nombre del Producto es Obligatorio' }" />

          <FormKit type="select" label="Categoría" name="category" validation="required"
            v-model.number="formData.category" :validation-messages="{ required: 'La Categoría es Obligatoria' }"
            :options="productsStore.categoryOptions" />

          <FormKit type="number" label="Precio" name="price" placeholder="Precio de Producto" step="1" min="1"
            v-model.number="formData.price" />

          <FormKit type="number" label="Disponibles" name="stock" placeholder="Productos Disponibles"
            v-model.number="formData.stock" step="1" min="0" />

          <div v-if="isImageUploaded">
            <p class="font-black">Imagen Nueva:</p>
            <img :src="url" alt="Nueva imagen Producto" class="w-52" />
          </div>

          <div v-else>
            <p class="font-black">Imagen Actual:</p>
            <img :src="formData.image" :alt="'Imagen de' + formData.image" class="w-52" />
          </div>


          <FormKit type="file" label="Cambiar Imagen" name="image" multiple="false" accept=".jpg"
            @change="onFileChange" />

          <FormKit type="submit">Guardar Cambios</FormKit>

        </FormKit>
      </div>
    </div>
  </div>
</template>
