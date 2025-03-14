<template>
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <button @click="logout">Cerrar sesión</button>
      <div class="height"></div>
    </div>
</template>
  
  <script setup>
  import { useAuthStore } from '@/store/authStore';
  import { useRouter } from 'vue-router';
  
  const authStore = useAuthStore();
  const router = useRouter();
  
  const logout = () => {
    authStore.logout();
    router.push('/');
  };
  </script>

  <style scoped>
  .height{
    background-color: aqua;
    height: 200pc;
  }
  </style>
  