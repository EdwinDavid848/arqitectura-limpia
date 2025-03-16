<template>
  <article class="login-container">
    <div class="login-content">
      <div class="welcome-section">
        <h2>Bienvenido de nuevo!</h2>
        <p>No tienes una cuenta? <span class="highlight">Crea tu cuenta</span>, solo toma unos minutos.</p>
        <FormRegistroComp modo="login" buttonText="Login" @submit="handleLogin"/>

      </div>
    </div>
  </article>  
</template>
  
<script setup>
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';
import FormRegistroComp from '@/components/FormRegistroComp.vue';

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
    width: 400px;
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
</style>