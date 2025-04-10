<template>
  <div class="Contenedor_Perfil">
      <div class="mostrarInformacion">
        <nav class="header_perfil">
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
          <button
            @click="mostrarDiv('Publications')"
            :class="['links_Perfil', seccionActiva === 'Publications' ? 'activo' : '']"
          >
            Publications
          </button>
          <button
            @click="mostrarDiv('Configuration')"
            :class="['links_Perfil', seccionActiva === 'Configuration' ? 'activo' : '']"
          >
            Configuration
          </button>
        </nav>
          <div class="info_perfil"> 
              <div v-if="isLoading">
                  <p>Cargando información del perfil...</p>
              </div>
              <div v-else>
                  <div v-if="divActual === 'Shopping Cart'">
                    <UserHistorialComprasView/>
                  </div>
                  <div v-if="divActual === 'Class History'">
                    <button class="buttongestion" @click="cambio" v-if="authStore.user && (authStore.user.rol == 'administrador' || authStore.user.rol == 'profesor' )">Gestion de clases</button>
                    <h2 class="reservaciones">Reservaciones</h2>
                    <PayClass></PayClass>
                  </div>
                  <router-link v-else-if="divActual === 'Publications'" to="/mural">
                  </router-link>
                  <div v-else-if="divActual === 'Configuration'" >
                    <ConfigurarPerfilComp  v-if="authStore.user"  :nombre="authStore.user.nombre" :email="authStore.user.email" :rol="authStore.user.rol" :telefono="authStore.user.telefono" :password="authStore.user.password"/>
                  </div>
                  <div v-else>
                  </div>
              </div>
          </div>
      </div>
      <div class="mostrarPerfil">
          <div class="cont_img">
              <img src="@/assets/perfil.png" alt="">
          </div>
          <div v-if="authStore.user" class="opciones_Perfil">
              <h1 style="text-transform: uppercase;">{{authStore.user.nombre}}</h1>
              <h1 class="correo">{{authStore.user.email}}</h1>
              <h2>Info</h2>
              <button id="logout" @click="logout">Logout</button>
          </div>
      </div>
  </div>
</template>

  
  <script setup>
  import { onMounted } from "vue";
  import { useAuthStore } from '@/store/authStore';
  import { useCartStore } from "@/store/cartStore";
  import { useRouter } from 'vue-router';
  import ConfigurarPerfilComp from "@/views/ConfigurarPerfilComp.vue";
  import PayClass from "@/components/PayClass.vue";
  import UserHistorialComprasView from "./UserHistorialComprasView.vue";

  import { ref } from 'vue';

  const divActual = ref('Configuration');

  const seccionActiva = ref('');


  const mostrarDiv = (div) => {
  divActual.value = div;
  seccionActiva.value = div;
};


    
  const authStore = useAuthStore();
  const cartStore = useCartStore();
  const router = useRouter();
  
  const logout = () => {
    cartStore.limpiarCarrito();
    authStore.logout();
    router.push('/');
  };
  const cambio=()=>{
    router.push('/TodaClase');
  }
  
  onMounted(() => {
    if (!authStore.isAuthenticated) {
        console.log("Acceso denegado, redirigiendo al login...");
        router.push("/");
      }else{
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
  font-family: "JetBrains Mono", monospace;
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
    background-color: #ffffff;
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
  font-weight: 400;
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

</style>