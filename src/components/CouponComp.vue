<script setup>
</script>

<template>
  <div class="flex items-center w-full mb-4 bg-white rounded-lg shadow-sm">
    <!-- Ícono -->
    <span class="flex items-center justify-center w-12 p-3">
      <div class="bg-green-100 rounded-md px-2 py-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-5 text-green-900 ">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
        </svg>
      </div>
    </span>

    <!-- Input -->
    <input type="text" placeholder="Cupón de descuento"
      class="flex-grow ml-2 bg-white border-none rounded-r-lg focus:outline-none placeholder:text-gray-600 placeholder:font-semibold" />

    <button type="button"
      class="p-3 bg-green-400 font-semibold hover:cursor-pointer hover:bg-green-500 rounded-xl">Agregar</button>
  </div>
</template>

<style scoped></style>
