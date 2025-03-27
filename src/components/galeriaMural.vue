<template>
  <div ref="container" class="publication-list" @scroll="handleScroll">
    <div ref="container" class="mural-container">
      <MuralCard v-for="post in publications" :key="post.id" :data="post" />
    </div>

    <div v-if="loading" class="loading">Cargando más publicaciones...</div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import MuralCard from "./MuralCard.vue";
import { fetchPublications } from '@/services/MuralServices';
const publications = ref([]);
const page = ref(1);
const loading = ref(false);
const container = ref(null);

const loadMore = async () => {
  if (loading.value) return;
  loading.value = true;

  // Simulación de carga de datos (reemplázalo con tu API real)
  try {
    const response = fetchPublications()
    console.log("Datos recibidos:", response);
    const data = await response;
    
    if (data.length) {
      publications.value.push(...data);
      page.value++;
    }
  } catch (error) {
    console.error("Error al cargar publicaciones:", error);
  } finally {
    loading.value = false;
  }
};

const handleScroll = () => {
  if (!container.value) return;
  if (container.value.scrollTop + container.value.clientHeight >= container.value.scrollHeight - 10) {
    loadMore();
  }
};

onMounted(() => {
  loadMore();
});
</script>
<style scoped>
.publication-list {
  padding: 1rem;
  display: flex;
  flex-direction: column-reverse;
}

.mural-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 5 columnas */
  gap: 1rem; /* Espaciado entre tarjetas */
  justify-content: center;
}

.loading {
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: #666;
}
</style>
