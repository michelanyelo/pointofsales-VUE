<script setup>
import { reactive } from 'vue';
import NavlinkComp from '@/components/navigation/NavlinkComp.vue';
import useImage from '@/composables/useImage';
import { useProductsStore } from '@/stores/products';

// Importa las funciones y variables del composable
const { onFileChange, isImageUploaded, url } = useImage();

const formData = reactive({
  name: 'Sudadera',
  category: '',
  price: '',
  stock: '',
  image: ''
});

const productsStore = useProductsStore();
const submitHandler = async data => {
  const { ...values } = data

  try {
    await productsStore.createProduct({
      ...values,
      image: url.value
    });

  } catch (error) {
    console.error(error);
  }
}

</script>

<template>
  <div>
    <NavlinkComp url-name="products">Volver</NavlinkComp>
    <h1 class="text-4xl font-black my-10">Nuevo producto</h1>
    <div class="flex justify-center bg-white shadow">
      <div class="mt-10 p-10 w-full 2xl:w-2/4">
        <FormKit type="form" submit-label="Agregar"
          incomplete-message="Lo sentimos, no todos los campos están rellenados correctamente" @submit="submitHandler">
          <FormKit type="text" label="Nombre" name="name" placeholder="Nombre del producto..." validation="required"
            :validation-messages="{ required: 'El nombre del producto es obligatorio' }"
            v-model.trim="formData.nombre" />
          <FormKit type="file" label="Imagen" name="image" validation="required"
            :validation-messages="{ required: 'La imagen del producto es obligatoria' }"
            accept=".jpg, .png, .jpeg, .webp" @change="onFileChange" v-model.trim="formData.image" />
          <!-- Mostrar la vista previa de la imagen -->
          <div v-if="isImageUploaded">
            <h3>Vista previa:</h3>
            <img :src="url" alt="Vista previa" class="w-32" />
          </div>
          <FormKit type="select" label="Categoría" name="category" validation="required"
            :validation-messages="{ required: 'La categoría del producto es obligatoria' }"
            :options="productsStore.categoryOptions" v-model.number="formData.category" />
          <FormKit type="number" label="Precio" name="price" placeholder="Precio del producto..." validation="required"
            :validation-messages="{ required: 'El precio del producto es obligatorio' }" min="1"
            v-model.number="formData.price" />
          <FormKit type="number" label="Stock" name="stock" placeholder="Cantidad disponible..." validation="required"
            :validation-messages="{ required: 'El stock del producto es obligatorio' }" min="1"
            v-model.number="formData.stock" />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
