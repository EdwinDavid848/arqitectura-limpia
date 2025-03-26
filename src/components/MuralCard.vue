<template>
<div v-if="props.data" class="cards-container">
  <div class="card">
    <!-- Imagen de fondo -->
    <div 
      class="card-image" 
      :style="props.data.foto ? { backgroundImage: `url(${encodeURI(props.data.foto)})` } : {}"
    ></div>

    <!-- Contenido de la tarjeta -->
    <div class="card-content">
      <h3 class="card-title">{{ props.data.titulo }}</h3>
      <p class="card-description">{{ props.data.descripcion }}</p>
      <p class="card-author">Por {{ props.data.email }}</p>
    </div>
  </div>
</div>



</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  data: Object,
});

</script>

<style scoped>
   
   .cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

/* Tarjeta individual */
.card {
  width: 300px;
  background-color: #fff8ed;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-10px);
}

/* Imagen de la tarjeta */
.card-image {
  height: 60%;
  background-size: cover;
  background-position: center;
  position: relative;
}



/* Contenido de la tarjeta */
.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-title {
  font-family: arial;
  font-size: 2rem;
  font-weight: bold;
  color: rgb(20, 15, 15);
  margin: 0;
}

.card-description {
  font-family: arial;
  font-size: 1.2rem;
  color: #3b3b3b;
  line-height: 1.4;
}

.card-author {
  font-family: arial;
  font-size: 0.9rem;
  color: #3b3b3b;
  margin-top: auto;
  text-align: right;
}

</style>
