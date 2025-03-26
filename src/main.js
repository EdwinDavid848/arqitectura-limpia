import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia' // Importar Pinia
import { useAuthStore } from './store/authStore';


const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia) 

const authStore = useAuthStore();
authStore.initializeAuth();
// Usar Pinia como store global
app.mount('#app')
