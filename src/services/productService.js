import axios from 'axios';

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
