import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '@/views/LoginView.vue';
import UserRegister from '@/views/RegisterView.vue';
import UserDashboard from '@/views/DashboardView.vue';
import NosotrosViews from '@/views/NosotrosViews.vue';
import SolicitarProductosView from '@/views/SolicitarProductosView.vue';
import TiendaView from '@/views/TiendaView.vue';
import ComprarProductoView from '@/views/ComprarProductoView.vue';
import InventarioProductos from '@/views/InventarioProductos.vue';
import InventarioProductos2 from '@/views/InventarioProductos2.vue';
import ResetePasswordView from '@/views/ResetePasswordView.vue';
import SolicitarRecuperacionPasswordViews from '@/views/SolicitarRecuperacionPasswordViews.vue';
import SolicitarProdcutosView from '@/views/SolicitarProductosView.vue';
import ClassView from '@/views/ClassView.vue';
import { useAuthStore } from '@/store/authStore'; 


const routes = [
    { path: '/', component: UserLogin },
    { path: '/register', component: UserRegister },
    { path: '/principa', component: NosotrosViews },
    {path: '/tienda', component: TiendaView},
    {path: '/inventario_productos', component:InventarioProductos},
    {path: '/inventario_productos2', component:InventarioProductos2},
    {path: '/clases', component:ClassView},
    {path: '/solicitar_recuperacion', component:SolicitarRecuperacionPasswordViews},
    {path: '/inventario_productos', component:InventarioProductos},
    {path: '/reset-password', component:ResetePasswordView},
    { path: '/solicitarProducto/:id', name: 'solicitarProducto', component: SolicitarProductosView },
    {
        path: '/comprar_producto',
        component: ComprarProductoView,
        meta: { requiresAuth: true }
    },
    { path: '/solicitarProducto/:id', name: 'solicitarProducto', component: SolicitarProdcutosView },
    {
      path: "/dashboard",
      component: UserDashboard,
      meta: { requiresAuth: true },  
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
    console.log("Email en authStore antes de navegar:", authStore.email);


    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        console.warn("Acceso denegado, redirigiendo al login...");
        next('/');
    } else {
        next();
    }
});

  
export default router;
