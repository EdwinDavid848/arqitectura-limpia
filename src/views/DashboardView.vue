<template>
  <div class="Contenedor_Perfil">
    <div class="mostrarInformacion">
      <!-- BOTÓN PARA MOSTRAR EL MENÚ EN PANTALLAS PEQUEÑAS -->
      <button class="boton-toggle-menu" @click="mostrarMenu = !mostrarMenu" v-if="isMobile">
        Menú
      </button>

      <!-- MENÚ DE NAVEGACIÓN -->
      <transition name="desplegar-menu">
        <nav class="header_perfil" v-if="mostrarMenu">
          <button
            @click="mostrarDiv('Shopping Cart')"
            :class="['links_Perfil', seccionActiva === 'Shopping Cart' ? 'activo' : '']"
          >
            Shopping Cart
          </button>
          <button
            @click="mostrarDiv('Class History')"
            :class="['links_Perfil', seccionActiva === 'Class History' ? 'activo' : '']"
          >
            Class History
          </button>
          <router-link
            to="/mural"
            :class="['links_Perfil', seccionActiva === 'Publications' ? 'activo' : '']"
            @click="seleccionarOpcion('Publications')"
          >
            Publications
          </router-link>
          <button
            @click="mostrarDiv('Configuration')"
            :class="['links_Perfil', seccionActiva === 'Configuration' ? 'activo' : '']"
          >
            Configuration
          </button>
        </nav>
      </transition>

      <!-- CONTENIDO PRINCIPAL -->
      <div class="info_perfil">
        <div v-if="isLoading">
          <p>Cargando información del perfil...</p>
        </div>
        <div v-else>
          <div v-if="divActual === 'Shopping Cart'">
            <UserHistorialComprasView />
          </div>

          <div v-if="divActual === 'Class History'">
            <button
              class="buttongestion"
              @click="cambio"
              v-if="authStore.user && (authStore.user.rol === 'administrador' || authStore.user.rol === 'profesor')"
            >
              Gestión de clases
            </button>
            <h2 class="reservaciones">Reservaciones</h2>
            <PayClass />
          </div>

          <router-link v-else-if="divActual === 'Publications'" to="/mural"></router-link>

          <div v-else-if="divActual === 'Configuration'">
            <ConfigurarPerfilComp
              v-if="authStore.user"
              :nombre="authStore.user.nombre"
              :email="authStore.user.email"
              :rol="authStore.user.rol"
              :telefono="authStore.user.telefono"
              :password="authStore.user.password"
            />
          </div>

          <div v-else></div>
        </div>
      </div>
    </div>

    <!-- PERFIL DEL USUARIO -->
    <div class="mostrarPerfil">
      <div class="cont_img">
        <img src="@/assets/perfil.png" alt="Perfil" />
      </div>
      <div v-if="authStore.user" class="opciones_Perfil">
        <h1 style="text-transform: uppercase;">{{ authStore.user.nombre }}</h1>
        <h1 class="correo">{{ authStore.user.email }}</h1>
        <h2>Info</h2>
        <button id="logout" @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'vue-router';
import ConfigurarPerfilComp from '@/views/ConfigurarPerfilComp.vue';
import PayClass from '@/components/PayClass.vue';
import UserHistorialComprasView from './UserHistorialComprasView.vue';

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

const mostrarMenu = ref(false);
const isMobile = ref(false);
const divActual = ref('Configuration');
const seccionActiva = ref('');
const isLoading = ref(false); // Puedes controlarlo si necesitas cargar datos del backend

const mostrarDiv = (div) => {
  divActual.value = div;
  seccionActiva.value = div;
  if (isMobile.value) {
    mostrarMenu.value = false;
  }
};

const seleccionarOpcion = (opcion) => {
  seccionActiva.value = opcion;
  divActual.value = opcion;
  if (isMobile.value) {
    mostrarMenu.value = false;
  }
};

const logout = () => {
  cartStore.limpiarCarrito();
  authStore.logout();
  router.push('/');
};

const cambio = () => {
  router.push('/TodaClase');
};

onMounted(() => {
  const verificarTamaño = () => {
    isMobile.value = window.innerWidth <= 768;
    mostrarMenu.value = !isMobile.value;
  };

  verificarTamaño();
  window.addEventListener('resize', verificarTamaño);

  if (!authStore.isAuthenticated) {
    console.log('Acceso denegado, redirigiendo al login...');
    router.push('/');
  } else {
    authStore.fetchUserInfo();
  }
});
</script>



<style scoped>
/* From Uiverse.io by adamgiebl */ 
.buttongestion {
  align-items: center;
  appearance: none;
  background-color: #EEF2FF;
  border-radius: 8px;
  border-width: 2px;
  border-color: #cea021;
  box-shadow: rgba(83, 109, 254, 0.2) 0 2px 4px, rgba(83, 109, 254, 0.15) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fdbb05;
  cursor: pointer;
  display: inline-flex;
  font-weight: bold;
  height: 56px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 24px;
  padding-right: 24px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 20px;
  margin-bottom: 10px;
  margin-left: 70%;
}

.buttongestion:focus {
  outline: none;
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(83, 109, 254, 0.4) 0 2px 4px, rgba(83, 109, 254, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.buttongestion:hover {
  box-shadow: rgba(83, 109, 254, 0.3) 0 4px 8px, rgba(83, 109, 254, 0.2) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  transform: translateY(-2px);
}

.buttongestion:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
}
  .Contenedor_Perfil{
    background-color: #e0d9d9;
      background-repeat: no-repeat;
      min-height: 100vh;
      display: grid;
      justify-content: center;
      grid-template-columns: 3fr 1fr;
      padding-bottom: 50px;
  }
  .mostrarInformacion{
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 20px;
  }
  .header_perfil {
      width: 95%;
      height: 60px;
      border-radius: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-bottom: 1px solid rgb(100, 98, 98);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      background: linear-gradient(to bottom, #faf8f8, #ffffff);

  }
  

.links_Perfil {
  color: #696969; 
  position: relative;
  padding: 0.5rem 1.2rem;
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 999px;
  overflow: hidden;
  z-index: 0;
  transition: color 0.3s ease;
  text-decoration: none;
  font-weight: bold;
}

.links_Perfil::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 140%;
  height: 250%;
  background-color: #e7791e;
  border-radius: 999px;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.3s ease;
  z-index: -1;
}

.links_Perfil:hover::before {
  transform: translate(-50%, -50%) scale(1);
}
.links_Perfil.activo {
  color: #000000; 
}


  .info_perfil {
      background: linear-gradient(to bottom, #faf8f8, #ffffff);
  width: 95%;
  border-top: 2px solid rgb(100, 98, 98);
  height: 100%;
  max-height: 600px; 
  overflow-y: auto; 
  box-shadow: 0 8px 6px rgba(0, 0, 0, 0.493);
  border-radius: 15px;
  padding: 15px;
}

  .mostrarPerfil  {
      display: grid;
      grid-template-rows: 0.5fr 2fr;
      margin-right: 20px;
      gap: 10px;
      background: linear-gradient(to bottom, #faf8f8, #ffffff);
      box-shadow: 0 8px 6px rgba(0, 0, 0, 0.493);
      height: 100%;
      border-radius: 15px;
  }
  .cont_img{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;

  }
  .cont_img img{
      height: 150px;
      width: 100%;
      border-radius: 50%;
      border: 0.5px solid rgb(163, 161, 161);
  }
  .correo{
    font-size: 25px;
    color: #461b04;
  }
  .opciones_Perfil{
      display: grid;
      grid-template-rows:0.2fr 0.5fr 0.2fr 1fr;
      text-align: center;
      justify-content: center;
  }
  #logout {
      margin-top: 20px;
      background-color: #f8c537;
      height: 50px;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;
  }
  #logout:hover {
      background-color: #ff8c42;
  }

  @media (min-width: 1025px) and (max-width: 1366px) {
     .Contenedor_Perfil{
        min-height: 100vh;
        padding-top: 110px;
    }
    .header_perfil{
      width: 95%;
      height: auto;
      padding: 15px 0px;
      border-radius: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
      .mostrarPerfil  {
        height: 100%;
    }
        .cont_img{
        height: 200px;

    }
    .cont_img img{
        height: 75%;
        width: 30%;
    }
}
@media (min-width: 1367px) {
    .Contenedor_Perfil{
      min-height: 100vh;
      padding-top: 110px;
    }
    .header_perfil{
      width: 95%;
      height: auto;
      padding: 15px 0px;
      border-radius: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
      .mostrarPerfil  {
        height: 100%;
    }
        .cont_img{
        height: 200px;

    }
    .cont_img img{
        height: 75%;
        width: 30%;
    }
}


@media (min-width: 1441px) and (max-width: 1600px) {
    .Contenedor_Perfil{
      min-height: 100vh;
      padding-top: 110px;
    }
    .header_perfil{
      width: 95%;
      height: auto;
      padding: 15px 0px;
      border-radius: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
      .mostrarPerfil  {
        height: 100%;
    }
        .cont_img{
        height: 200px;

    }
    .cont_img img{
        height: 150px;
        width: 40%;
    }
}
  @media (max-width: 1441px) {
      .Contenedor_Perfil{
        min-height: 100vh;
          padding-top: 110px;

      }
      .mostrarPerfil  {
        height: auto;
    }
        .cont_img{
        height: 200px;

    }
    .cont_img img{
        height: 150px;
    }

  }


  @media (max-width: 768px) {
  .Contenedor_Perfil {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    padding: 20px;
    margin-top: 90px;

  }

  .header_perfil {
    flex-direction: column;
    gap: 10px;
    height: auto;
    padding: 10px;
  }

  .info_perfil {
    width: 100%;
    max-height: none;
    overflow: visible;
  }

  .mostrarPerfil {
    width: 100%;
    margin: 0;
    margin-bottom: 20px;
    grid-template-rows: auto auto;
    padding: 20px;
  }

  .cont_img {
    height: auto;
  }

  .cont_img img {
    height: 120px;
    width: 120px;
    object-fit: cover;
  }

  .opciones_Perfil h1,
  .opciones_Perfil h2 {
    font-size: 18px;
  }

  .correo {
    font-size: 16px;
  }

  .buttongestion {
    margin-left: 0;
    width: 100%;
    font-size: 16px;
    padding: 12px;
  }
}

.boton-toggle-menu {
  display: none;
  margin-bottom: 10px;
  padding: 10px 15px;
  background-color: #f2a007;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .boton-toggle-menu {
    display: block;
  }

  .header_perfil {
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    border-radius: 12px;
    padding: 10px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    gap: 10px;
  }
}


.desplegar-menu-enter-active,
.desplegar-menu-leave-active {
  transition: all 0.3s ease;
}

.desplegar-menu-enter-from,
.desplegar-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.desplegar-menu-enter-to,
.desplegar-menu-leave-from {
  opacity: 1;
  transform: translateY(0);
}



</style>
