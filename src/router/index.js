import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '@/views/LoginView.vue';
import UserRegister from '@/views/RegisterView.vue';
import UserDashboard from '@/views/DashboardView.vue';
import NosotrosViews from '@/views/NosotrosViews.vue';
import SolicitarProductosView from '@/views/SolicitarProductosView.vue';
import ClassView from '@/views/ClassView.vue';
import MuralView from '@/views/MuralView.vue';
import PermisosRolView from '@/views/PermisosRolView.vue';
import UserHistorialComprasView from '@/views/UserHistorialComprasView.vue';
import TiendaView from '@/views/TiendaView.vue';
import ComprarProductoView from '@/views/ComprarProductoView.vue';
import InventarioProductos from '@/views/InventarioProductos.vue';
import InventarioComprasView from '@/views/InventarioComprasView.vue';
import ResetePasswordView from '@/views/ResetePasswordView.vue';
import SolicitarRecuperacionPasswordViews from '@/views/SolicitarRecuperacionPasswordViews.vue';
import VerTodasLasClases from '@/components/VerTodasLasClases.vue';
import { getToken } from "@/utils/localStorage";
import { useAuthStore } from '@/store/authStore'; 


const routes = [
    { path: '/', component: UserLogin },
    { path: '/register', component: UserRegister },
    {path: '/clases', component:ClassView},
    {path: '/principa', component:NosotrosViews},
    {path: '/productos', component: SolicitarProductosView },
    {path:'/mural', component:MuralView},
    {path: '/tienda', component: TiendaView},
    {path: '/inventario_productos', component:InventarioProductos},    {path: '/clases', component:ClassView},
    {path: '/userHistorialCompras', component:UserHistorialComprasView},
    {path: '/solicitar_recuperacion', component:SolicitarRecuperacionPasswordViews},
    {path: '/reset-password', component:ResetePasswordView},
    {path: '/inventario_play', component:InventarioComprasView},
    { path: '/solicitarProducto/:id', name: 'solicitarProducto', component: SolicitarProductosView },
    {path:'/PermisosRol', component:PermisosRolView},
    {path:'/TodaClase', component:VerTodasLasClases},
    {
        path: '/comprar_producto',
        component: ComprarProductoView,
        meta: { requiresAuth: true }
    },
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

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    const token = getToken();
  
    if (!authStore.token && token) {
      authStore.setToken(token);
      await authStore.fetchUserInfo(); 
    }
  
    if (to.meta.requiresAuth && !authStore.token) {
      console.warn("Acceso denegado, redirigiendo al login...");
      next('/');
    } else if (to.meta.requiresAdmin && authStore.role !== 'admin') {
      console.warn("Acceso denegado, no es administrador...");
      next('/acceso-denegado'); 
    } else {
      next();
    }
  });
  
  
export default router;
