<template>
    <header :class="{ 'scrolled': isScrolled }">
        <logo-comp />
        <nav class="rutasViwes">
            <router-link class="ruta" to="/principa">Nosotros</router-link>
            <router-link class="ruta" to="">Productos</router-link>
            <router-link class="ruta" to="">Clases</router-link>
            
            <!-- Si el usuario NO está autenticado, mostrar Login y Registro -->
            <template v-if="!isAuthenticated">
                <router-link class="ruta" to="/">Login</router-link>
                <router-link class="ruta" to="/register">Registro</router-link>
            </template>

            <!-- Si el usuario está autenticado, mostrar Dashboard y Cerrar Sesión -->
            <template v-else>
                <router-link class="ruta" to="/dashboard">Dashboard</router-link>
                <button class="ruta" @click="logout">Cerrar sesión</button>
            </template>
        </nav>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useAuthStore } from "@/store/authStore"; 
import { useRouter } from "vue-router";
import LogoComp from "@/components/LogoComp.vue";

const authStore = useAuthStore();
const router = useRouter();

const isAuthenticated = computed(() => authStore.isAuthenticated);

// Si el usuario ya no está autenticado, redirigirlo al login
    watch(isAuthenticated, (newVal) => {
        if (!newVal) {
            console.log("Token expirado, redirigiendo al login...");
            router.push("/");
        }
    });

const logout = () => {
    authStore.logout();
    router.push("/");  
};

const isScrolled = ref(false);
const handleScroll = () => {
    isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    
    authStore.checkTokenExpiration();
    
    setInterval(() => {
        authStore.checkTokenExpiration();
    }, 10000); // 10 segundos
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>


<style scoped>
header {
    background-color: rgba(255, 0, 0, 0);
    color: #f0f8ff;
    padding: 5px 10px;
    display: flex;
    align-items: center;  
    position: fixed; 
    top: 0; 
    left: 0;
    width: 100%;
    transition: all 0.4s ease-in-out; 
    z-index: 1000; 
}

.scrolled {
    background-color: rgb(255, 255, 255);
    padding: 8px; 
}

.scrolled .rutasViwes .ruta {
    color: black;
}
.scrolled .rutasPerfil .ruta {
    color: black;
}

logo-comp {
    flex-shrink: 0;  
}

.rutasViwes {
    display: flex;
    flex-grow: 2;  /* Ocupa el espacio disponible */
    justify-content: space-around;
    align-items: center;
    padding: 10px;
}

.rutasPerfil {
    display: flex;
    justify-content: flex-end; 
    flex-grow: 0.5;  
    background-color: rgba(0, 255, 255, 0);
}

.ruta {
    color: white;
    text-decoration: none;
    font-family: "Maven Pro", sans-serif;
    position: relative;
    transition: color 0.3s;
    font-weight: 500;
    margin: 0 10px;
}

</style>
