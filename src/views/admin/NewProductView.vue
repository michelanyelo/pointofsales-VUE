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
          <FormKit type="text" label="Nombre" name="name" placeholder="Nombre del producto..." validation="required"
            :validation-messages="{ required: 'El nombre del producto es obligatorio' }" />

          <FormKit type="file" label="Imagen" name="image" validation="required"
            :validation-messages="{ required: 'La imagen del producto es obligatoria' }"
            accept=".jpg, .png, .jpeg, .webp" />

          <FormKit type="select" label="Categoría" name="category" validation="required"
            :validation-messages="{ required: 'La categoría del producto es obligatoria' }" :options="[1, 2, 3]" />

          <FormKit type="number" label="Precio" name="price" placeholder="Precio del producto..." validation="required"
            :validation-messages="{ required: 'El precio del producto es obligatorio' }" min="1" />

          <FormKit type="number" label="Stock" name="stock" placeholder="Cantidad disponible..." validation="required"
            :validation-messages="{ required: 'El stock del producto es obligatorio' }" min="1" />
        </FormKit>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
