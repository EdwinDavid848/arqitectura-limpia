import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const obtenerUsuarios = async () => {
  try{
    const response = await axios.get(`${API_URL}/TodoUsuario`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};
  
export const actualizarRolUsuario = async (email, nuevoRol) => {
  try{
    return await axios.put(`${API_URL}/usuarios/rol/${email}`, {
      value: nuevoRol
    });
  } catch (error) {
    console.error("Error al actualizar el usuarios:", error);
    throw error;
  }
};