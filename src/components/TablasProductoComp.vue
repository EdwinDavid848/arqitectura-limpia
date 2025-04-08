<template>
  <div class="opciones">
    <article>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Buscar producto por nombre..." 
          class="input-search"
        />
      <section>
        <select id="categoryUno" v-model="SelectOpcion" class="input">
          <option id="category" value="">Todas las categorías</option>
          <option v-for="option in categories" :key="option" :value="option">{{ option }}</option>
        </select>
        <button class="opciones_button" @click="obtenerDatosCategoria(SelectOpcion)">Buscar</button>
      </section>
    </article>
  </div>
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
            <button 
              @click="toggleActivo(d)" 
              :class="d.activo ? 'btn-rojo' : 'btn-verde'"
            >
              {{ d.activo ? 'Desactivar' : 'Activar' }}
            </button>
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
import { obtenerProductos, estadoProducto, obtenerProductosPorCategoria } from '@/services/productService';
import Swal from 'sweetalert2';

const datos = ref([]); 
const searchQuery = ref(""); // Input de búsqueda
const limit = ref(4);
const categories = ref(["lana", "piedras", "agujas", "peluche", "ropa"]);
const SelectOpcion = ref("");
const canLoadMore = ref(true);

// Computed para filtrar productos mientras escribe
const filteredDatos = computed(() => {
  if (!searchQuery.value) {
    return datos.value; 
  }
  return datos.value.filter(producto => 
    producto.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Computed para mostrar datos paginados después del filtro
const visibleDatos = computed(() => filteredDatos.value.slice(0, limit.value));

const loadMore = () => {
  if (limit.value + 5 <= filteredDatos.value.length) {
    limit.value += 5;
  } else {
    limit.value = filteredDatos.value.length; 
    canLoadMore.value = false; 
  }
};

const obtenerDatosCategoria = async () => {
  try {
    datos.value = await obtenerProductosPorCategoria(SelectOpcion.value);
    canLoadMore.value = datos.value.length > limit.value;
  } catch (error) {
    Swal.fire("Error", "No se pudieron cargar la categorias de productos", "error");
  }
};

const toggleActivo = async (producto) => {
  const accion = producto.activo ? "desactivar" : "activar";

  const confirmacion = await Swal.fire({
    title: `¿Quieres ${accion} este producto?`,
    text: "Esta acción puede revertirse",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: `Sí, ${accion}`,
    cancelButtonText: "Cancelar",
  });

  if (confirmacion.isConfirmed) {
    try {
      const result = await estadoProducto(accion, producto.id);

      if (result.success) {
        producto.activo = !producto.activo;
        Swal.fire("Hecho", `Producto ${accion} correctamente`, "success");
      } else {
        throw new Error("Respuesta no válida");
      }
    } catch (error) {
      Swal.fire("Error", `No se pudo ${accion} el producto`, "error");
    }
  }
};

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

.btn-rojo {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-verde {
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-rojo:hover {
  background-color: #c0392b;
}

.btn-verde:hover {
  background-color: #27ae60;
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

.opciones{
  display: flex;
  align-items: center;
  justify-content:center;
}
.opciones article{
      height: 80px;
      display: flex;
      justify-content:space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
  }
#categoryUno{
  height: 40px;
  border-radius: 5px;
  padding: 0px 5px;
  font-weight: bold;
  text-transform: uppercase;
}
.input-search{
  height: 40px;
  width: 500px;
  border-radius: 5px;
  padding: 0px 5px;
  font-weight: bold;
}
.opciones_button{
      background-color: #000000;
      color: white;
      width: 100px;
      height: 40px;
      border-radius: 5px;
      margin-left: 10px;
      margin-right: 10px;
      transition: all 0.5s ease;
    }
.opciones_button:hover{
      background-color: #ffffff;
      color: black;
    }
</style>