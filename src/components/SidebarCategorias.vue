
<template>
  <transition name="slide-fade">
    <div class="sidebar" v-if="true">
      <h2>Categorías</h2>
      <ul>
        <li 
          v-for="category in categories" 
          :key="category"
          :class="{ active: selectedCategory === category }"
          @click="selectCategory(category)">
          {{ category }}
        </li>
      </ul>
    </div>
  </transition>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const emit = defineEmits(['cambiarCategoria', 'cerrarSidebar']);

defineProps({
  categories: Array,
  selectedCategory: String,
});

const selectedCategory = ref(null);

function selectCategory(category) {
  selectedCategory.value = category;
  emit('cambiarCategoria', category);
  emit('cerrarSidebar'); // Notifica al padre para cerrar el sidebar
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: rgba(0, 255, 255, 0);
  display: flex;
  padding: 20px;
  justify-content: start;
  flex-direction: column;
  transition: all 0.3s ease;
}

.sidebar h2 {
  font-size: 1.5em;
  margin-bottom: 20px;
  color: black;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  cursor: pointer;
  margin: 10px 0;
  color: #555;
  padding: 5px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.sidebar ul li:hover {
  background-color: lightgray;
}

.sidebar ul li.active {
  background-color: #f4a300;
  color: white;
  font-weight: bold;
}

/* Transición */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>

