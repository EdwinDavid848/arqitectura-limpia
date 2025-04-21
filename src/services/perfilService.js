import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = 'https://proyectobackend2025-production.up.railway.app';


export const updateField = async (email, field, value) => {
  try {
    await axios.put(`${API_URL}/usuarios/${field}/${email}`, { value });

    await Swal.fire({
      icon: 'success',
      title: '¡Actualización exitosa!',
      text: `${field} actualizado con éxito.`,
      timer: 2000,
      showConfirmButton: false,
    });

    window.location.reload();
  } catch (error) {
    console.error(error);
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `Error al actualizar ${field}: ${error.response?.data?.detail || error.message}`,
    });
  }
};

export const updatePassword = async (email, originalPassword, newPassword) => {
  try {
    if (!originalPassword || !newPassword) {
      await Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Los campos de contraseña son obligatorios.',
      });
      return;
    }

    const response = await axios.put(`${API_URL}/password`, {
      original: originalPassword,
      nuevo: newPassword,
      email,
    });

    await Swal.fire({
      icon: 'success',
      title: '¡Contraseña actualizada!',
      text: response.data.message,
      timer: 2000,
      showConfirmButton: false,
    });

    window.location.reload();
  } catch (error) {
    console.error(error);
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `Error al actualizar la contraseña: ${error.response?.data?.detail || error.message}`,
    });
  }
};
