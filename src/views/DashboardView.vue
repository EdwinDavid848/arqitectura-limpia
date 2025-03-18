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
                  </div>
                  <div v-if="divActual === 'Class History'">
                  </div>
                  <div v-else-if="divActual === 'Publications'" >
                  </div>
                  <div v-else-if="divActual === 'Configuration'" >
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
          <div class="opciones_Perfil">
              <h1 style="text-transform: uppercase;">Nombre</h1>
              <h1 class="correo">Email</h1>
              <h2>Info</h2>
              <button id="logout" @click="logout">Logout</button>
          </div>
      </div>
  </div>
</template>

  
  <script setup>
  import { onMounted } from "vue";
  import { useAuthStore } from '@/store/authStore';
  import { useRouter } from 'vue-router';

  import { ref } from 'vue';

  const divActual = ref('Configuration');

  const mostrarDiv = (div) => {
      divActual.value = div;
  };
    
  const authStore = useAuthStore();
  const router = useRouter();
  
  const logout = () => {
    authStore.logout();
    router.push('/');
  };

  onMounted(() => {
    if (!authStore.isAuthenticated) {
        console.log("Acceso denegado, redirigiendo al login...");
        router.push("/");
      }
  });


  </script>

<style scoped>
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

  .info_perfil{
        background: linear-gradient(to bottom, #ffe4a5, #ffcf6d);
        width: 95%;
        height: 100%;
        border-radius: 5px;
        box-shadow: 0 8px 6px rgba(0, 0, 0, 0.493);
        border-radius: 15px;

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