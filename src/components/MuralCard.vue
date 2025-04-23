<template>
<div v-if="props.data" id="cards-container" >
  <div class="card">

      <div 
        class="card-image" 
        :style="props.data.foto ? { backgroundImage: `url(${props.data.foto})` } : {}"
      >
        <img v-if="props.data.foto" :src="props.data.foto" alt="Imagen de publicación" class="card-img-test" />
      </div>

      <div class="card-content">
        <h3 class="card-title">{{ props.data.titulo }}</h3>
        <p class="card-description">{{ props.data.descripcion }}</p>
        <p class="card-author">Por {{ props.data.email }}</p>

      <div class="bottonmenu">
        <button id="Btn" class="BtnEditar" @click.stop="subir(publications)" v-if="esDelUsuario">
          <div class="sign">📝</div>
          <div class="text">Editar</div>
        </button>

        
        <button id="Btn" class="BtnEliminar" @click="EliminarPub" v-if="permisos.user && permisos.user.rol==='administrador' || esDelUsuario" > 
            <div class="sign">🗑️</div>
            <div class="text">Eliminar</div>
        </button>
      </div>
      </div>
    </div>
     <MuralForms v-show="hability" @close="hability = false" :publications="props.data"></MuralForms>
  </div>
</template>

<script setup>
import { ref,defineProps, onMounted, computed} from 'vue';
import { useAuthStore } from '@/store/authStore';
import { deletePublication } from "@/services/MuralServices";
import MuralForms from './MuralForms.vue';
import Swal from 'sweetalert2';

const permisos=useAuthStore();

const props = defineProps({
  data: Object,
});

const EliminarPub = async () => {
    console.log("🔹 Eliminando clase con ID:", props.data.id); // Debugging
  
    try {
       await deletePublication(props.data.id); 
        Swal.fire({
          icon: 'success',
          title: 'Clase eliminada con éxito',
          text: 'Recargue la página para verificar'
        }).then(() => {
          window.location.reload(); // 🔄 Recargar la página después de eliminar
        });
      
    } catch (error) {
      console.error("❌ Error al eliminar clase:", error);
    }
  };
  
const hability=ref(false)
const subir = () =>{
  hability.value=true;
}
const esDelUsuario = computed(() => {
  return permisos.user && props.data.email === permisos.user.email;
});

onMounted(async () => {
  if (!permisos.isAuthenticated) {
        console.log("Acceso denegado, redirigiendo al login...");
      }else{
        permisos.fetchUserInfo();
      }
      console.log('mural', props.habilitada)
  

});
</script>


<style scoped>
   
 
   
#cards-container {

  margin: 10px;
  
}
.bottonmenu{
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
}
/* Tarjeta individual */
.card {
  width: 100%;
  background-color: #fff8ed;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-10px);
}

/* Imagen de la tarjeta */
.card-image {
  width: 100%;
  height: 80%; /* Ajusta según el diseño */
  background-size: cover;
  background-position: center;
}

.card-img-test {
  width: 100%;
  max-height: 100%;
  object-fit: cover;
  min-height: 230px;
  max-height: 410px;
}

/* Contenido de la tarjeta */
.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-title {
  font-family: arial;
  font-size: 2rem;
  font-weight: bold;
  color: rgb(20, 15, 15);
  margin: 0;
}

.card-description {
  font-family: arial;
  font-size: 1.2rem;
  color: #3b3b3b;
  line-height: 1.4;
}

.card-author {
  font-family: arial;
  font-size: 0.9rem;
  color: #3b3b3b;
  margin-top: auto;
  text-align: right;
}
.menuButtons{
  z-index: 10;
}

/* From Uiverse.io by vinodjangid07 */ 
.BtnEliminar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: .3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: rgb(255, 65, 65);
  margin-top: 5px;
}

.BtnEditar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: .3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: rgb(5, 65, 65);
}


/* plus sign */
.sign {
  width: 100%;
  transition-duration: .3s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
}


/* text */
.text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: .3s;
}
/* hover effect on button width */
#Btn:hover {
  width: 125px;
  border-radius: 40px;
  transition-duration: .3s;
}

#Btn:hover .sign {
  width: 30%;
  transition-duration: .3s;
  padding-left: 20px;
}
/* hover effect button's text */
#Btn:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: .3s;
  padding-right: 10px;
}
/* button click effect*/
#Btn:active {
  transform: translate(2px ,2px);
}
@media (max-width: 480px) {
  #cards-container {
  margin: 1px;
  }
  .card {
    max-width: 180px;
  }

  .card-content {
    padding: 10px;
    gap: 6px;
  }

  .card-title {
    font-size: 1.1rem;
  }

  .card-description {
    font-size: 0.9rem;
  }

  .card-author {
    font-size: 0.7rem;
  }

  .card-img-test {
    min-height: 150px;
    max-height: 200px;
  }
}
@media (max-width: 360px) {
  
  .card{
    max-width: 157px;
  }
}
</style>
