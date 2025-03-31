<template>
    <div class="cont_tab">
      <table class="tab">
        <thead>
          <tr class="thead_tabla">
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Tipo de Unidad</th>
            <th>Color</th>
            <th>Funciones</th>
          </tr>
        </thead>
        <tbody class="tb_tabla">
          <tr v-for="d in visibleDatos" :key="d.id" class="tbody_tb">
            <td>{{ d.nombre }}</td>
            <td class="descripcion-tabla">{{ d.descripcion }}</td>
            <td>{{ d.category }}</td>
            <td>{{ d.precio }}</td>
            <td>{{ d.tipo_unidad }}</td>
            <td>{{ d.color }}</td>
            <td class="botoness">
              <button @click="$emit('editar', d)" class="editar">Editar</button>
              <button @click="eliminarProductos(d.id)" class="eliminar">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button v-if="canLoadMore" @click="loadMore" class="load-more-btn">
        Cargar más
      </button>
    </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { obtenerProductos } from '@/services/productService';

const datos = ref([]); 
const limit = ref(5);

const visibleDatos = computed(() => {
    return datos.value ? datos.value.slice(0, limit.value) : []; 
});

onMounted(async () => {
    try {
        const response = await obtenerProductos();
        if (Array.isArray(response)) {
            datos.value = response; 
        } else {
            console.error("Error: obtenerProductos no devolvió un array", response);
        }
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
});
</script>


<style scoped>


.cont_tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  font-family: Arial, sans-serif;
}

.tab {
  width: 100%;
  max-width: 1200px;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.thead_tabla {
  background-color: #18130d;
  color: white;
  text-align: left;
}

.thead_tabla th {
  padding: 12px 15px;
  font-size: 16px;
  border-bottom: 2px solid #34495e;
}

.tb_tabla tr {
  border-bottom: 1px solid #ddd;
}

.tb_tabla tr:nth-child(even) {
  background-color: #f9f9f9;
}

.tb_tabla tr:hover {
  background-color: #f1f1f1;
}

.tb_tabla td {
  padding: 10px 15px;
  font-size: 14px;
}

.descripcion-tabla {
  max-width: 250px;
  word-wrap: break-word;
}

.botoness {
  display: flex;
  gap: 8px;
}

.editar,
.eliminar {
  border: none;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
}

.editar {
  background-color: #d1a62e;
  color: white;
}

.editar:hover {
  background-color: #bd8d0a;
}

.eliminar {
  background-color: #e74c3c;
  color: white;
}

.eliminar:hover {
  background-color: #c0392b;
}

.load-more-btn {
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #27ae60;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
}

.load-more-btn:hover {
  background-color: #219150;
}


</style>