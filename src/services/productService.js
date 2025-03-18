import axios from 'axios';
import Swal from 'sweetalert2'; 
import { ref } from 'vue'; 
import productService from '@/services/productService'; 

const API_URL = 'http://127.0.0.1:8000';

export const getProductosPorCategoria = async (categoria, limit, offset) => {
  try {
    let respuesta;
    if (categoria.toLowerCase() === 'todos') {
      respuesta = await axios.get(`${API_URL}/mostrarimagenes?limit=${limit}&offset=${offset}`);
    } else {
      respuesta = await axios.get(`${API_URL}/mostrarimagenes_Categoria/${categoria}?limit=${limit}&offset=${offset}`);
    }
    return respuesta.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

const datos = ref([]);
const SelectOpcion = ref('');
const canLoadMore = ref(false);
const limit = ref(10); 

export async function obtenerDatosCategoria() {
  try {
    datos.value = await productService.obtenerProductosPorCategoria(SelectOpcion.value);
    canLoadMore.value = datos.value.length > limit.value;
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    Swal.fire("Error", "No se pudieron cargar las categorías de productos", "error");
  }
}

export async function obtenerProductos() {
  try {
    const response = await axios.get(`${API_URL}/informacionTabla`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
}

export async function obtenerProductosPorCategoria(categoria) {
  try {
    const response = await axios.get(`${API_URL}/informacionTabla/${categoria}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    throw error;
  }
}

export async function registrarProducto(producto) {
  try {
    const formData = new FormData();
    Object.keys(producto).forEach(key => formData.append(key, producto[key]));

    await axios.post(`${API_URL}/insertardos`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { success: true };
  } catch (error) {
    console.error("Error al registrar el producto:", error);
    throw error;
  }
}

export async function eliminarProducto(id) {
  try {
    await axios.delete(`${API_URL}/productos/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
}

export async function actualizarProducto(id, producto) {
  try {
    const formData = new FormData();
    Object.keys(producto).forEach(key => formData.append(key, producto[key]));

    await axios.put(`${API_URL}/productosActualizar/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { success: true };
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error;
  }
}
