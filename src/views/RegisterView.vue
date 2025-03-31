<template>
  <article class="login-container">
    <div class="login-content">
      <div class="welcome-section">
        <h2>Bienvenido de nuevo!</h2>
        <p>No tienes una cuenta? <span class="highlight">Crea tu cuenta</span>, solo toma unos minutos.</p>
        <FormRegistroComp modo="registro" buttonText="Registrarse" @submit="handleRegister"/>

      </div>
    </div>
  </article>  
</template>

<script setup>
import { useAuthStore } from '@/store/authStore';
import FormRegistroComp from '@/components/FormUserComp.vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();



const handleRegister = async (useData) => {
  const response = await authStore.register(useData);
  
  if (response.success) {
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'Tu cuenta ha sido creada correctamente'
    });
    router.push('/');

  } else {
    console.log("Error en el registro:", response.error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: response.error 
    });
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
</style>


<!--
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
-->