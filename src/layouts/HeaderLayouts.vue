<template>
    <header :class="{ 'scrolled': isScrolled }">
        <logo-comp/>
        <nav class="rutasViwes">
            <router-link class="ruta" to="/principa">Nosotros</router-link>
            <router-link class="ruta" to="">Productos</router-link>
            <router-link class="ruta" to="">Clases</router-link>
            <router-link class="ruta" to="/">Login</router-link>
            <router-link class="ruta" to="/register">Registro</router-link>
        </nav>
        <nav class="rutasPerfil">
            <router-link class="ruta" to="/register">Registro</router-link>
            <router-link class="ruta" to="/">Login</router-link>
        </nav>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import LogoComp from "@/components/LogoComp.vue";

const isScrolled = ref(false);

const handleScroll = () => {
    isScrolled.value = window.scrollY > 10; 
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
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
