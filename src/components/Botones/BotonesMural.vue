<template>
<div>
    <button id="Btn" class="BtnEditar" @click="subir(publications)" >
        <div class="sign">📝</div>
        <div class="text">Editar</div>
    </button>
    
      <button id="Btn" class="BtnEliminar" @click="EliminarPub"> 
        <div class="sign">🗑️</div>
        <div class="text">Eliminar</div>
      </button>
    
</div>
    
  <MuralForms v-show="hability" @close="hability = false" :publications="props.publications"></MuralForms>
  
</template>
  
<script setup>
  import { ref, defineProps } from "vue";
  import { deletePublication } from "@/services/MuralServices";
  import MuralForms from "../MuralForms.vue";
  import Swal from 'sweetalert2';
  
  // Definir props correctamente
const props = defineProps({
  publications: Object,
  hability: Boolean // 🔹 Se agregó hability como prop
});

console.log("🔍 Recibiendo publicación en BotonesMural:", props.publications); 
console.log("✅ hability en BotonesMural:", props.hability);


  const EliminarPub = async () => {
    console.log("🔹 Eliminando clase con ID:", props.publications.id); // Debugging
  
    try {
      const response = await deletePublication(props.publications.id); 
      if (response && response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Clase eliminada con éxito',
          text: 'Recargue la página para verificar'
        }).then(() => {
          window.location.reload(); // 🔄 Recargar la página después de eliminar
        });
      } 
    } catch (error) {
      console.error("❌ Error al eliminar clase:", error);
    }
  };
  
const hability=ref(false)
const subir = () =>{
  hability.value=true;
}
</script>
  
<style scoped>

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
</style>
  