<template>
  <div ref="menuRef" class="relative">
    <!-- Botón Hamburguesa -->
    <button @click="toggleMenu" class="Hamburguesa">
      ☰
    </button>


    <!-- Menú Desplegable -->
    <div v-if="menuAbierto" class="menuHamburguesa" >

      <button id="Btn" class="BtnHabilitar" @click="HabilitarClase">
        <div class="sign">👁️‍🗨️</div>
        <div class="text">Habilitar</div>
      </button>

      <button id="Btn" class="BtnEditar" @click="editarClase(clase)">
        <div class="sign">📝</div>
      <div class="text">Editar</div>
      </button>





    </div>
  </div>
  <ClassForm v-if="claseEditando" :clase="claseEditando" @closeForm="cerrarFormulario" @claseActualizada="recargarClases" />

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineProps } from "vue";
import { HabilityClass } from '@/services/ClassServices';
import ClassForm from "../ClassForm.vue";
import Swal from 'sweetalert2';

// Estado del menú
const menuAbierto = ref(false);
const menuRef = ref(null);

// Función para abrir/cerrar el menú
const toggleMenu = () => {
  menuAbierto.value = !menuAbierto.value;
};

// Función para cerrar el menú si se hace clic fuera
const cerrarMenu = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    menuAbierto.value = false;
  }
};

// Escuchar clics fuera del menú
onMounted(() => {
  document.addEventListener("click", cerrarMenu);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", cerrarMenu);
});

// Definir props correctamente
const props = defineProps({
  clase: Object // La clase se pasa como prop desde ClassCard.vue
});


const HabilitarClase = async () => {
  console.log("🔹 Habilitando/Desabilitando clase con ID:", props.clase.id); // Debugging

  try {
    const response = await HabilityClass(props.clase.id, !props.clase.habilitado); 
    if (response && response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Clase editada con éxito',
        text: 'Recargue la página para verificar'
      }).then(() => {
        window.location.reload(); // 🔄 Recargar la página después de eliminar
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo editar la clase, intente de nuevo.'
      });
    }
  } catch (error) {
    console.error("❌ Error al eliminar clase:", error);
  }
};
const claseEditando = ref(null);

const editarClase = (clase) => {
  claseEditando.value = clase; // Carga la clase en el formulario
};

const cerrarFormulario = () => {
  claseEditando.value = null; // Cierra el formulario
};
</script>

<style scoped>
.Hamburguesa{
  width: 30%;
  height: 20px;
  padding: 20px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  border-radius: 2rem;
  background-color: transparent;
}
.menuHamburguesa{
  position: absolute;
  
  margin-top: 2px;
  width: 40%;
  z-index: 5;
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
.BtnHabilitar {
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
  background-color: rgb(180, 180, 180);
  margin-bottom: 5px;
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
