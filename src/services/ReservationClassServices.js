import axios from 'axios';

const API_URL = 'http://localhost:8000'; 

export async function VerReservaciones() {
    try{
        const dates = await axios.get(`${API_URL}/Reservations/`);
        console.log(dates.data)
            return dates.data;
    }catch (error){
        console.error("Error obteniendo clases:", error);
        return [];
    }
    
}

export async function ReservacionesUsuario(user) {
    try{
        const data =  await axios.get(`${API_URL}/reservaciones/${user}`)
        console.log(data.data)
        return data.data
    }catch(error){
        console.error("Error obteniendo clases:", error);
        return [];
    }
}

export async function BuscarReservaciones(email) {
    try{
        const data =  await axios.get(`${API_URL}/SearchClass/${email}`)
        console.log(data.data)
        return data.data
    }catch(error){
        console.error("Error obteniendo clases:", error);
        return [];
    }
}

export async function AddReservaciones(clase, email, fecha) {
    try {
      const response = await axios.post(`${API_URL}/reservarClass/`, {
        titulo_clase: clase,
        email_user: email,
        date_class: fecha
      });
      return response.data;
    } catch (error) {
      console.error("Error al reservar la clase:", error);
      return null;
    }
  }