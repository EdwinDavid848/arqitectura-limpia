<template>
  <div ref="container" class="publication-list" @scroll="handleScroll">
    <div ref="container" class="mural-container">
      <MuralCard v-for="post in publications" :key="post.id" :data="post"/>
    </div>

    <div v-if="loading" class="loading">Cargando más publicaciones...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import MuralCard from "./MuralCard.vue";
import { fetchPublications, searchPublicationsByTitle, searchPublicationsByUser } from '@/services/MuralServices';
import { defineProps } from 'vue';

const publications = ref([]);
const loading = ref(false);

const props = defineProps({ 
  buscador: String, 
  buscadorUser: String,
});


const loadPublications = async () => {
  loading.value = true;
  try {
    if (props.buscadorUser) {
      // Si se busca por usuario, ignoramos la búsqueda por título
      console.log("Buscando publicaciones de usuario:", props.buscadorUser);
      publications.value = await searchPublicationsByUser(props.buscadorUser);


    } else if (props.buscador) {
      // Si no hay usuario pero sí un término de búsqueda, buscamos por título
      console.log("Buscando publicaciones con título:", props.buscador);
      publications.value = await searchPublicationsByTitle(props.buscador);
    } else {
      // Si no hay búsqueda, cargamos todas las publicaciones
      console.log("Cargando todas las publicaciones");
      publications.value = await fetchPublications();
    }
  } catch (error) {
    console.error("Error al cargar publicaciones:", error);
  } finally {
    loading.value = false;
  }
};

// Observa cambios en `buscador` y `buscadorUser` y ejecuta `loadPublications()`
watch([() => props.buscador, () => props.buscadorUser], () => {
  console.log("Cambio detectado en buscador o buscadorUser");
  loadPublications();
}, { immediate: true });

onMounted(() => {
  loadPublications();
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
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  padding: 20px;
  justify-content: center;
}


.loading {
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: #666;
}

@media (max-width: 1400px) {
  .mural-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1200px) {
  .mural-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .mural-container {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas en tablet/móvil grande */
  }
}

@media (max-width: 480px) {
  .mural-container {
    
    grid-template-columns: repeat(2, 1fr); /* 2 columnas también en móvil pequeño */
  }
}
</style>
