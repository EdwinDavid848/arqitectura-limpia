<template>
<div :style="{ backgroundColor: backgroundColor, transition: 'background-color 0.3s ease' }" class="min-h-screen">
    <div class="formulary">
        <form action="" class="buscar" @submit.prevent="buscar">
            <input type="text" placeholder="Buscar" class="inputbusc" v-model="search">
            <button type="submit" class="gradient-button">Buscar</button>
        </form> 
        <button class="gradient-button" @click="encontrar" v-if="permisos.user">Mis publicaciones</button>
        <button class="gradient-button" @click="subir()" v-if="permisos.user">Subir Publicación</button>
        <MuralForms v-show="Booleanvalue" @close="Booleanvalue = false"></MuralForms>
      </div>
    <section class="conten">
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

.inputbusc{
      background-color: white; /* Fondo blanco */
  color: rgb(0, 0, 0); /* Color del texto */
  border: 2px solid rgb(#fd9f47); /* Borde anaranjado */
  border-radius: 10px; /* Bordes redondeados */
  padding: 5px 15px; /* Espaciado interno */
  font-size: 16px; /* Tamaño del texto */
  cursor: pointer; /* Cursor de mano al pasar */
  transition: all 0.3s ease; 
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
 


</style>