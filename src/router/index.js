import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '@/views/LoginView.vue';
import UserRegister from '@/views/RegisterView.vue';
import UserDashboard from '@/views/DashboardView.vue';
import NosotrosViews from '@/views/NosotrosViews.vue';
import { useAuthStore } from '@/store/authStore'; 



const routes = [
    {path: '/', component: UserLogin},
    { path: '/register', component: UserRegister },
    {path: '/principa', component:NosotrosViews},
    {
      path: "/dashboard",
      component: UserDashboard,
      meta: { requiresAuth: true },  // Esta clave debe estar bien definida
  },    

]

const router = createRouter({
    history: createWebHistory(),
    routes
  });

  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    
    // Recuperar el token desde localStorage si el store aún no lo tiene
    if (!authStore.token) {
        authStore.setToken(localStorage.getItem("token"));
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