import axios from 'axios';
import { useAuthStore } from '@/store/authStore'; // si estás fuera de setup, usa método alterno

const API_URL = 'https://proyectobackend2025-production.up.railway.app';


export const obtenerUsuarios = async () => {
  const auth = useAuthStore(); // accede a tu store de auth
  const token = auth.token;

  try {
    const response = await axios.get(`${API_URL}/todousuarios`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

export const actualizarRolUsuario = async (email, nuevoRol) => {
  const auth = useAuthStore();
  const token = auth.token;

  try {
    return await axios.put(`${API_URL}/usuarios/rol/${email}`, {
      value: nuevoRol
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};
