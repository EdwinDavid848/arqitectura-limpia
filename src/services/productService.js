import axios from 'axios';
import Swal from 'sweetalert2'; 
import { ref } from 'vue'; 
import productService from '@/services/productService'; 


const API_URL = 'https://proyectobackend2025-production.up.railway.app';


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
// Variables reactivas


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

export async function estadoProducto(accion, producto_id) {
  try {
    const response = await axios.put(`${API_URL}/estado_producto/${accion}/${producto_id}`);
    return { success: true, message: response.data.detail };
  } catch (error) {
    console.error("Error al cambiar estado del producto:", error);
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

export async function comprarProductos(email_cliente, metodo_pago) {
  try{
    await axios.post(`${API_URL}/realizar_pedido/${email_cliente}/${metodo_pago}`);
    return {success: true};
  }catch(error){
    console.error("Error al comprar el producto:", error);
    throw error;
  }
  
}

export async function historialCompras(access_token) {
  try{
    const historial = await axios.get(`${API_URL}/historialCompra`, {
      headers: {
          Authorization: `Bearer ${access_token}`
      }
  });
  return historial.data
  }catch(error){
    console.error("Error al ver el historial de compras:", error);
    throw error;
  }
  
}


export async function historialAdministradorCompras() {
  try{
    const response = await axios.get(`${API_URL}/InventarioPay`);
    return response.data;
  }catch(error){
    console.error("Error al comprar el producto:", error);
    throw error;
  }
  
}
