// Llamadas a la API para login y registro

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; 



export async function loginUser(credentials) {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials, {
            headers: { 'Content-Type': 'application/json' }
        });
  
        console.log("Respuesta del backend (login):", response.data);
  
        if (response.data.access_token) {
            localStorage.setItem("token", response.data.access_token); // Guarda el token en localStorage
            console.log("Token guardado en localStorage:", localStorage.getItem("token"));
        }
  
        return response.data;
    } catch (error) {
        console.error("Error en login:", error);
        return { error: error.response?.data?.detail || "Error desconocido" };
    }
}
  
  export async function registerUser(userData) {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        console.log("Respuesta del backend (registro):", response.data);  // 👈 Verifica la respuesta
        return response.data;  
    } catch (error) {
        console.error("Error en registro:", error.response?.data || error.message);
        return error.response?.data || { error: "Error desconocido en registro" };
    }
}

export async function mostrarProductos(){
    try {
        const respuesta = await axios.get('http://localhost:8000/mostrarimagenes_Categoria/ropa');
        return respuesta.data.slice(0,6)
    } catch (error) {
        console.error("Error obteniendo productos:", error);
        return [];
    }
}
  