<script setup>
useContentHead('index')

// Récupérer les articles référencés dans index.md
const { data: products } =  await useAsyncData('catalogue', () => queryContent('/catalogue').find())
</script>

<template>
  <div>
    <ContentDoc />
    <ul>
      <li v-for="product in products" :key="product._id">
        <NuxtLink :to="`${product._path}`">{{ product.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

