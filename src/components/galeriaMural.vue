<script setup>
import { ref } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';
import MuralCard from './MuralCard.vue';
import { fetchPublications } from '@/services/MuralServices';


const posts = ref([]);
const container = ref(null);

const loadMore = async () => {
  try {
    const response = await fetchPublications();
    console.log("Datos recibidos:", response); // Verifica que `foto` tiene valores correctos

    if (Array.isArray(response) && response.length) {
      posts.value.push(...response);
    } else {
      console.warn("No hay más datos para cargar");
    }
  } catch (error) {
    console.error("Error al cargar los posts:", error);
  }
};

useInfiniteScroll(container, async () => {
  if (!posts.value.length) return; // Evita cargar si no hay posts aún
  await loadMore();
}, { distance: 50 }); // Asegura que solo cargue cuando el usuario esté cerca del final


</script>

<template>
  <div ref="container">
    <MuralCard v-for="post in posts" :key="post.id" :data="post" />
  </div>
</template>


<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
}
</style>
