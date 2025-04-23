<template>
  <div class="contenedor-Hilos-Lanas">
    <div>
      <!-- Botón para pantallas pequeñas -->
      <div class="cont-btn-categorias">
        <button class="btn-toggle-categorias" @click="toggleSidebar" v-if="isMobile">Categorías</button>
      </div>

      <div class="conts_opcione">
        <div class="cont_botones">
          <button @click="estilo_mostrarProductos('grid')" :class="{ active: estilo === 'grid' }">Columna</button>
          <button @click="estilo_mostrarProductos('list')" :class="{ active: estilo === 'list' }">Fila</button>
        </div>
      </div>
    </div>

    <div class="cont_list" v-if="estilo == 'list'" @scroll="handleScroll">
      <div class="contendroProductos">
        <!-- Sidebar con transición -->
        <SidebarCategorias
          :categories="categories"
          :selectedCategory="selectedCategory"
          @cambiarCategoria="cambiarCategoria"
          @cerrarSidebar="mostrarSidebar = false"
          v-if="mostrarSidebar"
        />
        <div class="product" :class="{ 'animar-aparicion': animar }">
          <ProductCardVersion2 class="product-card" v-for="(producto, index) in productos" :key="index" :producto="producto" :estilo="estilo" />
        </div>
      </div>
    </div>

    <div class="cont_grid" v-if="estilo == 'grid'" @scroll="handleScroll">
      <div class="contendroProductos">
        <SidebarCategorias
          :categories="categories"
          :selectedCategory="selectedCategory"
          @cambiarCategoria="cambiarCategoria"
          @cerrarSidebar="mostrarSidebar = false"
          v-if="mostrarSidebar"
        />
        <div class="product" :class="{ 'animar-aparicion': animar }">
          <ProductCardVersion3 v-for="(producto, index) in productos" :key="index" :producto="producto" :estilo="estilo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useProductos } from '@/composables/useProducto';
import ProductCardVersion2 from '@/components/ProductCard(Version-2).vue';
import ProductCardVersion3 from '@/components/ProductCard(Version-3).vue';
import SidebarCategorias from '@/components/SidebarCategorias.vue';

const { categories, selectedCategory, productos, estilo, animar, cambiarCategoria, estilo_mostrarProductos, handleScroll } = useProductos();

const mostrarSidebar = ref(true);
const isMobile = ref(false);

onMounted(() => {
  isMobile.value = window.innerWidth <= 768;
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 768;
  });
});

function toggleSidebar() {
  mostrarSidebar.value = !mostrarSidebar.value;
}
</script>


<style scoped>
.contenedor-Hilos-Lanas{
  padding-top: 80px;
}
.cont_list{
    background-color: rgba(255, 0, 0, 0);
}
.cont_grid{
  background-color: rgba(255, 0, 0, 0);

}
.cont_grid .product{
  display: flex;
  flex-direction: column;

}


.contendroProductos {
  display: grid;
  grid-template-columns: 250px 1fr;
}

.product-card {
  width: 100%;
  min-height: 250px;
  height: auto;
}


.product {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
  gap: 20px;
  background-color: rgba(0, 255, 255, 0);
}

@media (min-width: 1200px) {
  .product {
    grid-template-columns: repeat(4, 1fr);
  }
}


.product.animar-aparicion {
  animation: aparecer-desde-arriba 0.8s ease-out;
}

@keyframes aparecer-desde-arriba {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.loading-message {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: #888;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.8); 
  border-radius: 5px;
  width: 100%;
}

.cont_botones {
  display: flex;
  justify-content: flex-end;
  margin: 20px 20px;
}

.cont_botones button {
  padding: 10px 20px;
  width: 150px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  background-color: #000000; 
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.cont_botones button:hover {
  background-color: #ffffff; 
  color: black;
}

.cont_botones button.active {
  background-color: #ffffff; 
  color: black;
  border: 1px solid black;
  font-weight: bold;
}
.opciones {
  display: flex;
  align-items: center; 
  justify-content: flex-start; 
  margin: 20px 90px;
}

.label {
  margin-right: 10px; 
  font-size: 18px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;

}


.btn-toggle-categorias {
  display: none;
  margin-bottom: 10px;
  padding: 8px 12px;
  background-color: #f4a300;
  color: white;
  border: none;
  cursor: pointer;
}

/* Mostrar el botón solo en pantallas pequeñas */
@media (max-width: 768px) {
  .btn-toggle-categorias {
    display: block;
  }

  .contendroProductos {
    grid-template-columns: 1fr; /* Modifica para dispositivos móviles */
    margin: 0px;
    padding: 0px;
  }
}

/* Ocultar botones de columna/fila en pantallas pequeñas */
@media (max-width: 768px) {
  .cont_botones {
    display: none;
  }
  .cont-btn-categorias{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn-toggle-categorias {
    display: block;
    width: 80%;
    font-size: 18px;
    font-weight: bold;
    padding: 12px 0;
    background-color: #f4a300;
    color: white;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .btn-toggle-categorias:hover {
    background-color: #d98c00;
  }

  .contendroProductos {
    grid-template-columns: 1fr; /* Forzar una sola columna */
    margin: 0px;
    padding: 0px;

  }
}


.product {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
  gap: 20px;
  background-color: rgba(0, 255, 255, 0);
  padding: 15px;
}

@media (min-width: 600px) {
  .product {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas */
  }
}

@media (min-width: 768px) {
  .product {
    grid-template-columns: repeat(3, 1fr); /* 3 columnas */
  }
}

@media (min-width: 1200px) {
  .product {
    grid-template-columns: repeat(4, 1fr); /* 4 columnas */
  }
}

@media (min-width: 1600px) {
  .product {
    grid-template-columns: repeat(5, 1fr); /* 5 columnas */
  }
}


</style>






