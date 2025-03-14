import { defineStore } from 'pinia';
import { loginUser, registerUser } from '@/services/authService';
import { saveToken, getToken, removeToken } from '@/utils/localStorage';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: getToken() || null,  
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        async login(credentials) {
            try {
                const response = await loginUser(credentials);
                console.log("Datos recibidos en login:", response);

                if (response.access_token) {
                    this.setToken(response.access_token);
                } else {
                    console.error("No se recibió un token válido:", response);
                }
                return response;
            } catch (error) {
                console.error("Error en login:", error);
                return { error: "Error en la autenticación" };
            }
        },

        async register(userData) {
            return await registerUser(userData);
        },

        async logout() {
            this.token = null;
            removeToken();
            console.log("Usuario deslogeado, token eliminado");
        },

        setToken(newToken) {
            this.token = newToken;
            saveToken(newToken);
            console.log("Token actualizado en authStore:", newToken);
        }
    }
});
