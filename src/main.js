import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia' // Importar Pinia

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia) // Usar Pinia como store global
app.mount('#app')
