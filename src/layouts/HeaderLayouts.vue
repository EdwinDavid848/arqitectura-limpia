<template>
    <header :class="headerEstilos">
      <logo-comp class="logo" />
      <button
        class="menu-toggle"
        :class="{ 'menu-negro': isMenuNegro }"
        @click="toggleMenu"
      >
        ☰
      </button>
  
      <nav :class="['rutasViwes', { open: isMenuOpen }]">
        <section class="contRutas">
            <router-link class="ruta" to="/principa" @click="cerrarMenu">Nosotros</router-link>
            <router-link class="ruta" to="/tienda" @click="cerrarMenu">Productos</router-link>
            <router-link class="ruta" to="/clases" @click="cerrarMenu">Clases</router-link>
            <router-link class="ruta" to="/mural" @click="cerrarMenu">Mural</router-link>
        </section>
  
        <section class="rutasPerfil" v-if="!isAuthenticated">
            <router-link class="ruta" to="/register" @click="cerrarMenu">Registro</router-link>
            <router-link class="ruta" to="/" @click="cerrarMenu">Login</router-link>
        </section>
  
        <section class="rutasPerfil" v-else>
            <router-link class="ruta" to="/dashboard" @click="cerrarMenu">Perfil</router-link>
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

    const isMenuOpen = ref(false);
    const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
    };




const isScrolled = ref(false);


const handleScroll = () => {
  if (window.innerWidth >= 768) {
    isScrolled.value = window.scrollY > 10;
  } else {
    isScrolled.value = false; 
  }
};

const handleResize = () => {
  // Si se vuelve pequeña la pantalla, desactiva el scroll efecto
  if (window.innerWidth < 768) {
    isScrolled.value = false;
  }
};

const cerrarMenu = () => {
  isMenuOpen.value = false;
};


const headerEstilos =computed(() =>{
    if (route.path === "/principa") {
        return { 'scrolled': isScrolled.value, 'header-principa': true };

    } else if (route.path === "/tienda"  || route.name === "solicitarProducto"  || route.path === "/comprar_producto" || route.path === "/mural") {
        return { 'scrolled': isScrolled.value, 'header-tienda': true };
    } else if (route.path === "/inventario_productos" ){
        return{  'header-inventario': true}
    }else if (route.path === "/dashboard"){
        return{  'header-perfil': true}
     } else {
        return { 'scrolled': isScrolled.value };
    }
})

const isMenuNegro = computed(() => {
  return (
    route.path === "/tienda" ||
    route.name === "solicitarProducto" ||
    route.path === "/comprar_producto" ||
    route.path === "/mural" ||
    route.path === "/dashboard"
  );
});


onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);

  authStore.checkTokenExpiration();
  setInterval(() => {
    authStore.checkTokenExpiration();
  }, 10000);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
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
.header-inventario{
    background-color: rgba(214, 211, 211, 0.822);
}
.header-inventario .rutasViwes .ruta{
    color: black;
    padding: 15px;
}

.header-perfil{
    background-color: rgb(255, 255, 255);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

}
.header-perfil .rutasViwes .ruta{
    color: black;
    padding: 15px;
}


.menu-toggle {
  display: none;
  font-size: 28px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  margin-right: 10px;
}
@media screen and (max-width: 768px) {
  .menu-toggle {
    display: block;
  }
  .header-tienda .rutasViwes .ruta{
    padding: 9px;
}

  .rutasViwes {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    background-color: #ffffff;
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
    transition: max-height 0.4s ease-in-out, padding 0.4s ease-in-out;
    padding: 0;
    z-index: 999;
  }

  .rutasViwes.open {
    max-height: 500px; 
    padding: 10px 0;
  }

  .contRutas,
  .rutasPerfil {
    flex-direction: column;
    align-items: center;
  }

  .ruta {
    color: black !important;
    margin: 10px 0;
    transition: color 0.3s;
  }

  .scrolled .rutasViwes .ruta {
    color: black;
  }

  .ruta {
    display: block;
    font-size: 16px; /* ajusta según necesidad */
    padding: 8px 16px;
    color: black ;
    text-align: center;
    text-decoration: none;
    width: 100%;
  }

  .ruta:hover {
    background-color: #f0f0f0;
  }
}

.menu-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  color: white; /* color por defecto */
  z-index: 999;
  transition: color 0.5s ease; /* Añadido para la animación de color */
}

.menu-toggle.menu-negro {
  color: black;
}



</style>


