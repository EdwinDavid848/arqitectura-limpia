import axios from 'axios';

const API_URL = 'https://proyectobackend2025-production.up.railway.app';


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

export async function BuscarReservaciones(email,state) {
    try{
        const data =  await axios.get(`${API_URL}/SearchClass/${email}/${state}`)
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

export async function CambiarEstado(id, state) {
    try{
        const response = await axios.put(`${API_URL}/EditReserver/${id}/${state}`)
        return response.data
    }catch(error){
        console.error("Error obteniendo clases:", error);
        return [];
    }
    
}

export async function pago(idClase,metodo,monto,fecha) {
    try{
        const response=await axios.post(`${API_URL}/pagarClass/`, 
            {
                reservation_id: idClase,
                metodo_pago: metodo,
                monto: monto,
                fecha_pago: fecha
            }, {
                headers: {
                'Content-Type': 'application/json'
                }
            });
        return response.data;
    }catch(error){
        console.error("Error al reservar la clase:", error);
      return null;
    }
    
}