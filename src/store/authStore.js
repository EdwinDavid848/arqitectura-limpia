import { defineStore } from "pinia";
import { loginUser, registerUser, informacionPerfil } from "@/services/authService";
import { historialCompras } from "@/services/productService";
import { saveToken, getToken, removeToken, saveEmail, removeEmail } from "@/utils/localStorage";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        token: null, 
        tokenExpiration: null,
        email: null,
        historial: []
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

                    const userInfo = await informacionPerfil(response.access_token);
                    this.user = userInfo;
                    console.log("Información del usuario obtenida:", userInfo);
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
            removeEmail();
            this.token = null;
            this.tokenExpiration = null;
            this.user = null;
            this.email = null;
            this.historial = [];
        },
        async fetchUserInfo() {
            try {
                if (!this.token) return;

                const userData = await informacionPerfil(this.token);
                this.user = userData;
                console.log("Información del usuario obtenida:", this.user);
            } catch (error) {
                console.error("Error al obtener información del usuario:", error);
            }
        },
        async obtenerHistorialCompras() {
            try {
                if (!this.token) return;
        
                const compras = await historialCompras(this.token);
                this.historial = compras; 
                console.log("Historial de compras obtenido:", compras);
            } catch (error) {
                console.error("Error al obtener historial de compras:", error);
            }
        },        
        setToken(newToken) {
            try {
                const decodedToken = jwtDecode(newToken);
                this.token = newToken;
                this.tokenExpiration = decodedToken.exp * 1000; 
                this.email = decodedToken.email || null; 

                saveToken(newToken);
                saveEmail(this.email)
                console.log("Token y email guardados:", newToken, this.email);

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
                        this.email = decodedToken.email || localStorage.getItem("user_email"); // Restaurar email
                        console.log("Token restaurado correctamente");
                        console.log("Token y email restaurados correctamente:", this.email);

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
