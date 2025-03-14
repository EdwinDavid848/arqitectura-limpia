<template>
    <div>
      <h1>Login</h1>
      <AuthForm buttonText="Iniciar sesión" @submit="handleLogin" />
    </div>
</template>
  
<script setup>
import { useAuthStore } from '@/store/authStore';
import AuthForm from '@/components/AuthForm.vue';
import { useRouter } from 'vue-router';

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
div{
  margin-top: 50px;
}
</style>
  