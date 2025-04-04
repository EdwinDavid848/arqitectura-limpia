<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";


const modelRedirigir = ref(false);
const modelPasswordAprobado = ref(false)
const loading = ref(false);
const redirigir = ref(false);
const route = useRoute();
const router = useRouter();
const token = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const message = ref("");
const errorMessage = ref("");

onMounted(() => {
  token.value = route.query.token || "";
});

const resetPassword = async () => {
  message.value = "";
  errorMessage.value = "";

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = "Las contraseñas no coinciden.";
    return;
  } else if (!newPassword.value || !confirmPassword.value) {
    errorMessage.value = "Debe llenar la contraseña.";
    return;
  }
  loading.value = true;

  try {
    const response = await axios.post("http://localhost:8000/reset-password", {
      token: token.value,
      new_password: newPassword.value,
    });

    message.value = response.data.message;
    loading.value = false;
    redirigir.value = true
    modelPasswordAprobado.value = true

    setTimeout(() =>{
      modelPasswordAprobado.value = false;
      modelRedirigir.value = true;
      setTimeout(() => {
        modelRedirigir.value = true;
        router.push("/login");
      }, 3000);
    }, 3000)


  } catch (error) {
    errorMessage.value =
      error.response?.data?.detail || "Ocurrió un error, intenta nuevamente.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="contanier_principal">
  <div v-if="modelPasswordAprobado" class=" overlay">
    <div class="modal_password">
      <p>Contraseña Actulizada Exitosamente</p>
      <img src="F:\Nurv Vue Js\PROYECTO_PROTOTIPO\vue-project\src\assets\img\marca-de-verificacion.png" alt="" style="height: 100px;">
    </div>
  </div>
    <div>
        <div v-if="modelRedirigir" class="overlay" >
            <div class="modal">
                <p>Redirigiendo</p>
                <span v-if="redirigir === true" class="spinner"></span>
                <span v-else>Proceso Terminado </span>
            </div>
        </div>
    </div>
    <div class="container">
      <h2>Cambiar Contraseña</h2>
      <p>Ingresa tu nueva contraseña.</p>

      <input type="password" v-model="newPassword" placeholder="Nueva contraseña" required />
      <input type="password" v-model="confirmPassword" placeholder="Confirmar contraseña" required />
      
      <button @click="resetPassword" class="BotonRecuperar" :disabled="modelRedirigir" >
        <span v-if="loading" class="spinner"></span>
        <span v-else >Actualizar Contraseña</span>
      </button>

      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.contanier_principal {
  background
  : url('C:\Users\patid\arqitectura-limpia\src\assets\78950467_l_normal_none.jpg') center/cover no-repeat;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.container {
  background: rgba(0, 0, 0, 0.5);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  width: 400px;
  text-align: center;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  pointer-events: auto; /* Asegura que capture los eventos */
}

.modal {
  background-color: #ffb515;
  width: 20%;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column-reverse;
  gap: 10px;
}
.modal p{
  color: rgb(0, 0, 0);
  text-transform: uppercase;
  font-weight: bold;

}
.modal_password{
  background-color: #266601;
  width: auto;
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
}
.modal_password p{
  color: white;
  font-weight: 500;
  font-size: 20px;
}
.container h2, p {
  color: white;

}

input {
  width: 95%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin-top: 10px;
  margin-bottom: 10px;
}

.BotonRecuperar {
  width: 100%;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #ffd900;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 5px;
  transition: 0.3s;
}

.BotonRecuperar:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgb(22, 19, 19);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}


/* Animación del spinner */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>
