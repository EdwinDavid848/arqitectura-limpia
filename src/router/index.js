import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '@/views/LoginView.vue';
import UserRegister from '@/views/RegisterView.vue';
import UserDashboard from '@/views/DashboardView.vue';
import NosotrosViews from '@/views/NosotrosViews.vue';
import SolicitarProdcutosView from '@/views/SolicitarProdcutosView.vue';
import { useAuthStore } from '@/store/authStore'; 


const routes = [
    { path: '/', component: UserLogin },
    { path: '/register', component: UserRegister },
    { path: '/principa', component: NosotrosViews },
    { path: '/solicitarProducto/:id', name: 'solicitarProducto', component: SolicitarProdcutosView },
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

    console.log("Token en authStore antes de navegar:", authStore.token);

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        console.warn("Acceso denegado, redirigiendo al login...");
        next('/');
    } else {
        next();
    }
});

  
export default router;
