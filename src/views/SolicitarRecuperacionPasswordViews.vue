<template>
    <div class="contenedor_solicitar">
      <div class="cont_solicitar">
        <h1>Recuperar Contraseña</h1>
        <p>
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          Sigue las instrucciones en el correo y crea una nueva clave de acceso.
        </p>
        <form @submit.prevent="submitEmail">
          <div class="form-group">
            <input type="email" v-model="email" required placeholder="Email ID" />
          </div>
          <button type="submit" class="Enviar_btn" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            <span v-else>Enviar</span>
          </button>
        </form>
        <p v-if="message">{{ message }}</p>
      </div>
    </div>
</template>


<script setup>
import { ref } from "vue";
import axios from "axios";

const email = ref("");
const message = ref("");
const loading = ref(false);

const submitEmail = async () => {
  loading.value = true;
  message.value = "";

  try {
    const response = await axios.post("http://localhost:8000/forgot-password", {
      email: email.value,
    });
    message.value = response.data.message;
  } catch (error) {
    message.value = error.response?.data?.detail || "Error al enviar la solicitud.";
  } finally {
    loading.value = false;
  }
};
</script>



<style scoped>
  .contenedor_solicitar{
    background: url('@/assets/78950467_l_normal_none.jpg')center/cover no-repeat;   
    display: flex;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .contenedor_solicitar h1{
    color: white;
    font-size: 2rem;
    text-align: center;
  }
  .cont_solicitar{
    background: rgba(0, 0, 0, 0.5);
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    width: 400px;
  }
  .cont_solicitar p{
    color: rgb(226, 221, 221);
    text-align: center;
    margin-bottom: 20px;
    font-size: 18px;
  }
  .form-group {
    margin-bottom: 15px;
}
input {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
}

.Enviar_btn:hover{
  background-color: #f4a300;

}

.Enviar_btn {
  width: 100%;
  position: relative;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #ffd700; 
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 5px;
  transition: 0.3s;
}

.Enviar_btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Estilo del spinner */
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Animación del spinner */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>