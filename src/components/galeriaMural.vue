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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* se adapta mejor */
  gap: 1rem;
  max-width: 1200px; /* evita que crezca mucho */
  margin: 0 auto; /* centra horizontalmente */
  padding: 1rem;
}


.loading {
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: #666;
}

.publication-list {
  padding: 1rem;
  display: flex;
  flex-direction: column-reverse;
}

.mural-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  justify-content: center;
}

@media (max-width: 768px) {
  .mural-container {
    display: block;
    column-count: 2;
    column-gap: 1rem;
  }

  .mural-container > * {
    break-inside: avoid;
    margin-bottom: 1rem;
    width: 100%;
  }
}

/* Para móviles muy pequeños */
@media (max-width: 480px) {
  .mural-container {
    column-count: 1;
  }
}



.publication-list {
  padding: 1rem;
  display: flex;
  flex-direction: column-reverse;
}

.mural-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Escritorio */
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  justify-content: center;
}

/* Tabletas */
@media (max-width: 1024px) {
  .mural-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Móviles grandes */
@media (max-width: 768px) {
  .mural-container {
    display: block;
    column-count: 2;
    column-gap: 1rem;
  }

  .mural-container > * {
    break-inside: avoid;
    margin-bottom: 1rem;
    width: 100%;
  }
}

/* Móviles pequeños */
@media (max-width: 480px) {
  .mural-container {
    column-count: 1;
  }
}

.loading {
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: #666;
}
</style>
