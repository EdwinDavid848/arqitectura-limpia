import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '@/views/LoginView.vue';
import UserRegister from '@/views/RegisterView.vue';
import UserDashboard from '@/views/DashboardView.vue';
import NosotrosViews from '@/views/NosotrosViews.vue';
import SolicitarProductosView from '@/views/SolicitarProductosView.vue';
import ClassView from '@/views/ClassView.vue';
import MuralView from '@/views/MuralView.vue';
import { getToken } from "@/utils/localStorage";
import { useAuthStore } from '@/store/authStore'; 



const routes = [
    { path: '/', component: UserLogin },
    { path: '/register', component: UserRegister },
    {path: '/clases', component:ClassView},
    {path: '/principa', component:NosotrosViews},
    {path: '/productos', component: SolicitarProductosView },
    {path:'/mural', component:MuralView},
    {
      path: "/dashboard",
      component: UserDashboard,
      meta: { requiresAuth: true },  // Protección de ruta
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
      return { top: 0, behavior: "smooth" }; 
    }
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    // Corregir la obtención del token
    const token = getToken(); // Usa la función en lugar de localStorage directamente

    if (!authStore.token && token) {
        authStore.setToken(token);
    }

    console.log("Token en authStore antes de navegar:", authStore.token);

    if (to.meta.requiresAuth && !authStore.token) {
        console.warn("Acceso denegado, redirigiendo al login...");
        next('/');
    } else {
        next();
    }
});

  
export default router;
