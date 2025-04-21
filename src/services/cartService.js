import axios from "axios";

const API_URL = 'https://proyectobackend2025-production.up.railway.app';

export const getCarrito = async (emailCliente) => {
    const response = await axios.get(`${API_URL}/ver_carrito/${emailCliente}`);
    return response.data;
};

export const agregarAlCarrito = async (productoId, cantidad, emailCliente) => {
    const response = await axios.post(`${API_URL}/agregar_al_carrito/${emailCliente}`, {
        producto_id: productoId,
        cantidad: cantidad
    });
    return response.data;
};



export const actulizarElCarrito = async (productoId, cantidad, emailCliente) => {
    const response = await axios.put(`${API_URL}/actualizar_producto_carrito/${emailCliente}`, {
        producto_id: productoId,
        cantidad: cantidad
    });
    return response.data;
};


export const eliminarDelCarrito = async (emailCliente, productoId) => {
    try {
        const response = await axios.delete(`${API_URL}/eliminar_del_carrito/${emailCliente}/${productoId}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar producto del carrito:", error);
        throw error;
    }};

