import { defineStore } from "pinia";
import { loginUser, registerUser } from "@/services/authService";
import { saveToken, getToken, removeToken } from "@/utils/localStorage";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        token: null, // No inicializamos aquí para evitar problemas de sincronización
        tokenExpiration: null,
    }),

    getters: {
        isAuthenticated: (state) => {
            if (!state.token) return false;
            try {
                const decodedToken = jwtDecode(state.token);
                return decodedToken.exp > Date.now() / 1000;
            } catch (error) {
                console.error("Error al decodificar el token:", error);
                return false;
            }
        }
    },

    actions: {
        async login(credentials) {
            try {
                const response = await loginUser(credentials);
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
            console.log("Ejecutando logout...");
            removeToken();
            this.token = null;
            this.tokenExpiration = null;
            this.user = null;
        },
        
        setToken(newToken) {
            try {
                const decodedToken = jwtDecode(newToken);
                this.token = newToken;
                this.tokenExpiration = decodedToken.exp * 1000; 
                saveToken(newToken);
                console.log("Token actualizado en authStore:", newToken);
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        },

        checkTokenExpiration() {
            if (this.token && Date.now() >= this.tokenExpiration) {
                console.log("Token expirado, cerrando sesión...");
                this.logout();
            }
        },

        initializeAuth() {
            const token = getToken();
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const currentTime = Date.now() / 1000;
                    
                    if (decodedToken.exp > currentTime) {
                        this.token = token;
                        this.tokenExpiration = decodedToken.exp * 1000;
                        console.log("Token restaurado correctamente");
                    } else {
                        console.warn("Token expirado al iniciar la app");
                        this.logout();
                    }
                } catch (error) {
                    console.error("Error al decodificar el token al iniciar:", error);
                    this.logout();
                }
            }
        }
    },
});
