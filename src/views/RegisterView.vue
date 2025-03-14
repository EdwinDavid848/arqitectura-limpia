<template>
    <div>
      <h1>Registro</h1>
      <AuthForm buttonText="Registrarse" @submit="handleRegister" />
    </div>
</template>
  
  <script setup>
  import { useAuthStore } from '@/store/authStore';
  import AuthForm from '@/components/AuthForm.vue';
  
  const authStore = useAuthStore();
  
  const handleRegister = async (userData) => {
    const response = await authStore.register(userData);
    if (response.success) {
      alert('Registro exitoso, ahora inicia sesión.');
    } else {
      alert(response.error);
    }
  };
  </script>
  