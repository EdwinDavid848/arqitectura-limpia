<template>
  <div class="Contenedor_Perfil">
      <div class="mostrarInformacion">
          <nav class="header_perfil">
              <button @click="mostrarDiv('Shopping Cart')" class="links_Perfil">Shopping Cart</button>
              <button @click="mostrarDiv('Class History')" class="links_Perfil">Class History</button>
              <button @click="mostrarDiv('Publications')" class="links_Perfil">Publications</button>
              <button @click="mostrarDiv('Configuration')" class="links_Perfil">Configuration</button>
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
              <img src="@/assets/Producto 1 part1.jpeg" alt="">
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

  const mostrarDiv = (div) => {
      divActual.value = div;
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
    background-color: #cea021;
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
    background: linear-gradient(to bottom, #ffcf6d, #ffcf6d);
    width: 95%;
      height: 60px;
      border-radius: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .links_Perfil{
      text-decoration: none;
      font-size: 20px;
      color: rgb(0, 0, 0);
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      background-color: transparent;
      border: none;
      transition: transform 0.5s ease-in-out;
  }
  .links_Perfil:hover {
      color: #ffffff;
  }

  .info_perfil {
  background: linear-gradient(to bottom, #ffe4a5, #ffcf6d);
  width: 95%;
  height: 100%;
  max-height: 600px; /* Ajusta este valor según tu diseño */
  overflow-y: auto; /* Scroll vertical cuando se sobrepase la altura */
  box-shadow: 0 8px 6px rgba(0, 0, 0, 0.493);
  border-radius: 15px;
  padding: 15px;
}

  .mostrarPerfil  {
      display: grid;
      grid-template-rows: 0.5fr 2fr;
      margin-right: 20px;
      gap: 10px;
      background: linear-gradient(to bottom, #ffe4a5, #ffcf6d);
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
      height: 200px;
      width: 50%;
      border-radius: 50%;
      border: 1px solid black;
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
        height: 75%;
        width: 30%;
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