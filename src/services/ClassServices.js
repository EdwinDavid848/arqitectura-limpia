import axios from 'axios';

const API_URL = 'http://localhost:8000'; 

export async function VerClases() {
    try{
        const dates = await axios.get(`${API_URL}/allClass`);
        console.log(dates.data)
            return dates.data;
    }catch (error){
        console.error("Error obteniendo clases:", error);
        return [];
    }
    
}

export async function AddClass(FormData) {
    try{
        const response = await axios.post(`${API_URL}/insertClass/`, FormData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        return response;
    }catch(error){
        console.error('Error en la petición:', error);
    }
}

export const EditClass = async (titulo, data) => {
    try {
        const formData = new FormData();
        formData.append("new_titulo", data.titulo);  // 👈 FastAPI espera "new_titulo"
        formData.append("descripcion", data.descripcion);
        formData.append("profesor", data.profesor);
        formData.append("fecha", data.fecha);
        formData.append("comienzo", data.comienzo);
        formData.append("final", data.final);
        formData.append("precio", data.precio);
    
        if (data.imagen) {
          formData.append("imagen", data.imagen);
        }
    
        const response = await axios.put(
          `${API_URL}/editClass/${titulo}`, // 👈 FastAPI usa el título, no el ID
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
    
        return response;
    } catch (error) {
      console.error("❌ Error al actualizar la clase:", error);
      throw error;
    }
  };
  

export async function DeleteClass(id) {
    try{
       const response = await axios.delete(`${API_URL}/deleteClass/${id}`);
        return response
    }catch(error){
        console.log('Error al eliminar clase', error)
    }
}

export async function HabilityClass(id, state) {
    try{
        const response = await axios.put(`${API_URL}/editHability/${id}/${state}`)
        return response
    }catch(error){
        console.log('Error en el cambio de estado de la clase', error)
    }
}