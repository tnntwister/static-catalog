<template>
    <div>
      <ul>
        <li v-for="product in products" :key="product._path">
          <NuxtLink :to="product._path">{{ product.title }}</NuxtLink>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    products: {
      type: Array,
      required: true
    }
  })
  </script>