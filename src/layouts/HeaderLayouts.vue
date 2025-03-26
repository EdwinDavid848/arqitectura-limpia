<template>
    <header :class="headerEstilos">
        <logo-comp class="logo" />
        <nav class="rutasViwes">
            <section class="contRutas">
                <router-link class="ruta" to="/principa">Nosotros</router-link>
                <router-link class="ruta" to="/tienda">Productos</router-link>
                <router-link class="ruta" to="/clases">Clases</router-link>  
                <router-link class="ruta" to="/mural">Mural</router-link>  
            </section>
            <section class="rutasPerfil" v-if="!isAuthenticated">
                <router-link class="ruta" to="/register">Registro</router-link>
                <router-link class="ruta" to="/">Login</router-link>
            </section>

            <section class="rutasPerfil" v-else>
                <router-link class="ruta" to="/dashboard">Perfl</router-link>
            </section>
        </nav>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useAuthStore } from "@/store/authStore"; 
import { useRouter, useRoute } from "vue-router";
import LogoComp from "@/components/LogoComp.vue";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const isAuthenticated = computed(() => authStore.isAuthenticated);

    watch(isAuthenticated, (newVal) => {
        if (!newVal) {
            console.log("Token expirado, redirigiendo al login...");
            router.push("/");
        }
    });



const isScrolled = ref(false);
const handleScroll = () => {
    isScrolled.value = window.scrollY > 10;
};

const headerEstilos =computed(() =>{
    if (route.path === "/principa") {
        return { 'scrolled': isScrolled.value, 'header-principa': true };
    } else if (route.path === "/tienda"  || route.name === "solicitarProducto") {
        return { 'scrolled': isScrolled.value, 'header-tienda': true };
    } else {
        return { 'scrolled': isScrolled.value };
    }
})

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    
    authStore.checkTokenExpiration();
    
    setInterval(() => {
        authStore.checkTokenExpiration();
    }, 10000); 
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>


<style scoped>
.logo {
    flex-shrink: 0;
}
header {
    background-color: rgba(255, 0, 0, 0);
    color: #f0f8ff;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between; 
    position: fixed; 
    top: 0; 
    left: 0;
    width: 100%;
    transition: all 0.4s ease-in-out; 
    z-index: 1000; 
}

logo-comp {
    flex-shrink: 0; 
}

.rutasViwes {
    display: grid;
    flex-grow: 2;  
    grid-template-columns: 2fr 1fr;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    transition: all 0.4s ease-in-out;

}

.contRutas {
    display: flex;
    justify-content: space-around;
    width: 100%;
}

.rutasPerfil {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

.ruta {
    color: white;
    text-decoration: none;
    font-family: "Maven Pro", sans-serif;
    transition: color 0.3s;
    font-weight: 500;
    margin: 0 10px;
}
.scrolled {
    background-color: rgb(255, 255, 255); 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.4s ease-in-out;
}
.scrolled .rutasViwes{
    padding: 20px;
}
.scrolled .rutasViwes .ruta{
    color: black;
}
.header-tienda {
    background-color: rgb(255, 255, 255); 
    color: black;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

}
.header-tienda .rutasViwes .ruta{
    color: black;
    padding: 15px;
}
</style>