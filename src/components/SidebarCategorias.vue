
<template>
  <div class="sidebar">
    <h2>Categorías</h2>
    <ul>
      <li 
        v-for="category in categories" 
        :key="category"
        :class="{ active: selectedCategory === category }"
        @click="$emit('cambiarCategoria', category)"
        >
        {{ category }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

defineProps({
categories: Array,
});

const selectedCategory = ref(null);
</script>

<style scoped>
.sidebar {
width: 100%;
background-color: rgba(0, 255, 255, 0);
display: flex;
padding: 20px;
justify-content: start;
flex-direction: column;
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
font-size: 18px;
}

.sidebar ul li.active {
background-color: #f4a300; 
color: white;
font-weight: bold;
}
</style>
