<template>
  <article class="login-container">
    <div class="login-content">
      <div class="welcome-section">
        <h2>Bienvenido de nuevo!</h2>
        <p>No tienes una cuenta? <span class="highlight">Crea tu cuenta</span>, solo toma unos minutos.</p>
        <FormRegistroComp modo="login" buttonText="Login" @submit="handleLogin"/>
        <div>
          <button @click="loginWithGoogle" class="google-btn">
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" class="google-logo" /> Iniciar sesión con Google
        </button>
        
        <router-link class="solicitar_recuperacion" to="/solicitar_recuperacion">Recuperar Contraseña</router-link>
        </div>
      </div>
    </div>
  </article>  
</template>
  
<script setup>
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';
import FormRegistroComp from '@/components/FormUserComp.vue';

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async (credentials) => {
  const response = await authStore.login(credentials);
  console.log("Respuesta del login:", response); 

  if (response.access_token) {
    router.push('/dashboard');
  } else {
    alert(response.error || "Error desconocido");
  }
};

const loginWithGoogle = () => {
    window.location.href = "http://127.0.0.1:8000/auth/login";
};

</script>



<style scoped>
.login-container {
    height: 110vh;
    background-image: url("@/assets/78950467_l_normal_none.jpg");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-content {
    background: rgba(0, 0, 0, 0.5);
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    width: 500px;
}
.welcome-section h2 {
    color: white;
    font-size: 2rem;
    text-align: center;
}

.welcome-section p {
    color: white;
    text-align: center;
    margin-bottom: 20px;
}
.highlight {
    font-weight: bold;
    color: #d39103;
}

.solicitar_recuperacion{
    font-size: 19px;
    color: white;
}
.solicitar_recuperacion:hover{
    color: rgb(235, 183, 40);
    transition: all 0.3s ease;
}

.google-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid #ccc;
    width: 100%;
    margin-top: 15px;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
    margin-bottom: 5px;
}

.google-btn:hover {
    background-color: #f1f1f1;
}

.google-logo {
  width: 20px;
    height: 20px;
    margin-right: 10px;
}
</style>