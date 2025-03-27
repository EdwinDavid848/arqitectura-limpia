import { defineStore } from "pinia";
import { getCarrito, agregarAlCarrito, actulizarElCarrito, eliminarDelCarrito } from "@/services/cartService";

export const useCartStore = defineStore("cart", {
    state: () => ({
        items: [], 
    }),

    getters: {
        totalItems: (state) => state.items.reduce((sum, item) => sum + item.cantidad, 0),
        totalPrice: (state) => state.items.reduce((sum, item) => sum + item.total, 0),
    },

    actions: {
        async fetchCarrito(emailCliente) {
            try {
                const response = await getCarrito(emailCliente);
                this.items = response; 
            } catch (error) {
                console.error("Error al obtener el carrito:", error);
            }
        },

        async addToCart(productoId, cantidad, emailCliente) {
            try {
                const response = await agregarAlCarrito(productoId, cantidad, emailCliente);
                await this.fetchCarrito(emailCliente); 
                return response;
            } catch (error) {
                console.error("Error al agregar al carrito:", error);
            }
        },
        async updateCarrito(productoId, cantidad, emailCliente) {
            try {
              await actulizarElCarrito(productoId, cantidad, emailCliente);
              this.items = this.items.map(item => 
                item.producto_id === productoId ? { ...item, amount: cantidad } : item
              );
            } catch (error) {
              console.error("Error al actualizar producto en el carrito:", error);
            }
        },
        async removeFromCart(emailCliente, productoId) {
            try {
                await eliminarDelCarrito(emailCliente, productoId);
                this.items = this.items.filter(item => item.producto_id !== productoId);
            } catch (error) {
                console.error("Error al eliminar producto del carrito:", error);
            }
        }
    },
});