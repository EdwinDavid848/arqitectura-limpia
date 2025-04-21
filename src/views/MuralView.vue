<template>
  <div :style="{ backgroundColor: backgroundColor, transition: 'background-color 0.3s ease' }" class="min-h-screen">
    
    <!-- Menú hamburguesa -->
    <div class="md:hidden flex justify-end p-4">
      <button @click="toggleMenu" class="hamburger focus:outline-none">
        <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>

    <!-- Contenedor principal -->
    <div class="contenedor-botones flex-col md:flex-row md:flex justify-between items-start md:items-center p-4 space-y-4 md:space-y-0" :class="{ 'hidden': !menuOpen && isMobile }">
      <!-- Buscador -->
      <form @submit.prevent="buscar" class="formulario-mural flex flex-col md:flex-row gap-2 w-full md:w-auto">
        <input
          type="text"
          placeholder="Buscar"
          class="inputbusc w-full md:w-64 shadow-md"
          v-model="search"
        />
        <button type="submit" class="gradient-button w-auto">Buscar</button>
      </form>

      <!-- Botones de acciones -->
      <div class="contenedor-botones-secundarios flex gap-2">
        <button
          class="gradient-button"
          @click="encontrar"
          v-if="permisos.user"
        >
          Mis publicaciones
        </button>
        <button
          class="gradient-button"
          @click="subir()"
          v-if="permisos.user"
        >
          Subir Publicación
        </button>
      </div>

      <MuralForms v-show="Booleanvalue" @close="Booleanvalue = false" />
    </div>

    <!-- Contenido -->
    <section class="conten p-4">
      <galeriaMural :buscador="search" :buscadorUser="buscadorUsuario"></galeriaMural>
    </section>
    
    <p v-if="Booleanvalue">Formulario activado</p>
  </div>
</template>

  <script setup>
  import { ref, onMounted } from 'vue';
  import galeriaMural from '@/components/galeriaMural.vue';
  import MuralForms from '@/components/MuralForms.vue';
  import { useAuthStore } from "@/store/authStore";
  import backgroundMural from "@/composables/backgroundMural"; // ✅ importamos
  
  const { backgroundColor } = backgroundMural(); // ✅ ¡aquí sí la usamos!
  
  const permisos = useAuthStore();
  const search = ref('');
  const buscadorUsuario = ref(null);
  const Booleanvalue = ref(false);
  
  const buscar = () => {};
  const encontrar = () => {
    buscadorUsuario.value = buscadorUsuario.value ? null : permisos.user.email;
  };
  const subir = () => {
    Booleanvalue.value = true;
  };
  
  onMounted(() => {
    if (!permisos.isAuthenticated) {
      console.log("Acceso denegado, redirigiendo al login...");
    } else {
      permisos.fetchUserInfo();
    }
  });
  </script>
  
  <style scoped>
  
  .box {
        height:100%;
        width:100%;
        min-height: 100vh;
        padding-bottom: 20px;
      }
  .gradDynamic{
      position:relative;
    }
  
    .gradDynamic:after, .gradDynamic:before{
      position:absolute;
      top:0;
      bottom:0;
      left:0;
      right:0;
      content:"";
      z-index:-1;
    }
  
    .gradDynamic:after {
    background: linear-gradient(90deg,#ffeed5,#ffdaa9,#febf73,#fd9f47);
    background-size: 400% 400%;
    animation: colorSpinMulti 20s ease infinite;
  }
  
  .gradDynamic:before {
    background-color: rgb(#fdfdfd);
  }
    
  .formulary{
  
  padding: 20px;
  padding-top: 100px;
  display: flex;
  justify-content: space-between;
  }
  @keyframes colorSpinMulti {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  .min-h-screen{
    margin-top: 100px;
  }
  .contenedor-botones{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
  }

  .inputbusc{
        background-color: white; /* Fondo blanco */
    color: rgb(0, 0, 0); /* Color del texto */
    border: 2px solid rgb(#fd9f47); /* Borde anaranjado */
    border-radius: 10px; /* Bordes redondeados */
    padding: 5px 15px; /* Espaciado interno */
    font-size: 16px; /* Tamaño del texto */
    cursor: pointer; /* Cursor de mano al pasar */
    transition: all 0.3s ease; 
    margin-right: 10px;
  

  }
  .contenedor-botones-secundarios button{
    margin: 0px 5px;
  }
  
  .gradient-button {
    background: linear-gradient(90deg, #ff6a00 0%, #d14400 100%); /* Degradado naranja */
    color: white; /* Texto blanco */
    border: none; /* Sin bordes */
    border-radius: 10px; /* Bordes redondeados */
    padding: 10px 20px; /* Espaciado interno */
    font-size: 16px; /* Tamaño del texto */
    cursor: pointer; /* Cursor de mano */
    transition: transform 0.2s ease, box-shadow 0.2s ease; /* Transición suave */
  }
  
  .gradient-button:hover {
    transform: translateY(-2px); /* Sube ligeramente al pasar */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra al pasar */
  }
  
  .gradient-button:active {
    transform: translateY(2px); /* Baja ligeramente al hacer clic */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Sombra reducida */
  }
   
  .formulary {
  padding: 20px;
  padding-top: 100px;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
}

.inputbusc {
  background-color: white;
  color: #333;
  border: 2px solid #fd9f47;
  border-radius: 10px;
  padding: 8px 16px;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.inputbusc:focus {
  outline: none;
  border-color: #ff6a00;
  box-shadow: 0 0 0 3px rgba(255, 106, 0, 0.2);
}

  




.min-h-screen {
  margin-top: 100px;
}

/* Flex principal */
.contenedor-botones {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
}

/* Formulario */
.formulario-mural {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

/* Botones secundarios */
.contenedor-botones-secundarios {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* Input buscador */
.inputbusc {
  background-color: white;
  color: #333;
  border: 2px solid #fd9f47;
  border-radius: 10px;
  padding: 8px 16px;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.inputbusc:focus {
  outline: none;
  border-color: #ff6a00;
  box-shadow: 0 0 0 3px rgba(255, 106, 0, 0.2);
}

/* Botón degradado */
.gradient-button {
  background: linear-gradient(90deg, #ff6a00 0%, #d14400 100%);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.gradient-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.gradient-button:active {
  transform: translateY(2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Responsive mejoras específicas */
@media (max-width: 768px) {
  .contenedor-botones {
    flex-direction: column;
    align-items: stretch;
  }

  .formulario-mural {
    width: 100%;
    flex-direction: column;
  }

  .contenedor-botones-secundarios {
    width: 100%;
    justify-content: space-between;
  }

  .gradient-button,
  .inputbusc {
    width: 100%;
  }
}


</style>
