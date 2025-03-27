<template>
  <div ref="menuRef" class="relative">
    <!-- Botón Hamburguesa -->
    <button @click="toggleMenu" class="Hamburguesa">
      ☰
    </button>


    <!-- Menú Desplegable -->
    <div v-if="menuAbierto" class="menuHamburguesa" >

      <button id="Btn" class="BtnHabilitar">
        <div class="sign">👁️‍🗨️</div>
        <div class="text">Habilitar</div>
      </button>

      <button id="Btn" class="BtnEditar">
        <div class="sign">📝</div>
      <div class="text">Editar</div>
      </button>

      <button id="Btn" class="BtnEliminar"> 
        <div class="sign">🗑️</div>
      <div class="text">Eliminar</div>
</button>



    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
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
  right: 0;
  margin-top: 2px;
  width: 40%;
  background-color: rgb(255, 255, 255);
  
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
