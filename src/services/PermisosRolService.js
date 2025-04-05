import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const obtenerUsuarios = async () => {
    const response = await axios.get(`${API_URL}/TodoUsuario`);
    return response.data;
  };
  
export const actualizarRolUsuario = async (email, nuevoRol) => {
    return await axios.put(`${API_URL}/usuarios/rol/${email}`, {
      value: nuevoRol
    });
};