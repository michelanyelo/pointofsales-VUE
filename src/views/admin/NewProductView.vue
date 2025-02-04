<script setup>
import NavlinkComp from '@/components/navigation/NavlinkComp.vue';
</script>

<template>
  <div>
    <NavlinkComp url-name="products">Volver</NavlinkComp>
    <h1 class="text-4xl font-black my-10">Nuevo producto</h1>

    <div class="flex justify-center bg-white shadow">
      <div class="mt-10 p-10 w-full 2xl:w-2/4">
        <FormKit type="form" submit-label="Agregar">
          <!-- nombre del producto -->
          <FormKit type="text" label="Nombre" name="nombre" placeholder="Nombre del producto" validation="required"
            :validation-messages="{ required: 'El campo nombre es obligatorio' }" outer-class="mb-4 w-full"
            input-class="w-full p-2 border border-gray-300 rounded" />
          <!-- imagen del producto -->
          <FormKit type="file" label="Imagen" name="image" validation="required"
            :validation-messages="{ required: 'El campo imagen es obligatorio' }" accept=".jpg, .png, .jpeg"
            multiple="true" outer-class="mb-4 w-full" input-class="w-full p-2 border border-gray-300 rounded" />
          <!-- categoria del producto -->
          <FormKit type="select" label="Categoría" name="category" validation="required"
            :validation-messages="{ required: 'El campo categoría es obligatorio' }" :options="[1, 2, 3]"
            outer-class="mb-4 w-full" input-class="w-full p-2 border border-gray-300 rounded" />
          <!-- precio del producto -->
          <FormKit type="number" label="Precio" name="price" placeholder="Precio del producto" validation="required"
            :validation-messages="{ required: 'El campo precio es obligatorio' }" min="1" outer-class="mb-4 w-full"
            input-class="w-full p-2 border border-gray-300 rounded" />
          <!-- stock del producto -->
          <FormKit type="number" label="Disponibles" name="stock" placeholder="Cantidad disponible"
            validation="required" :validation-messages="{ required: 'El campo disponible es obligatorio' }" min="1"
            outer-class="mb-4 w-full" input-class="w-full p-2 border border-gray-300 rounded" />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
