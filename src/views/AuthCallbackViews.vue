<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const loading = ref(false); 
const token = route.query.token;

loading.value = true; 

if (token) {
  authStore.setToken(token);
  authStore.fetchUserInfo();
  setTimeout(() => {
    loading.value = false; 
    router.push('/dashboard');
  }, 2000); 
} else {
  setTimeout(() => {
    loading.value = false;
    router.push('/login');
  }, 2000); 
}
</script>



<template>
    <article>
        <div>
            <section v-if="loading" >
                <h3>Redirigiendo..</h3>
                <span  class="spinner"></span>
            </section>
            <span v-else >Actualizar Contraseña</span>
        </div>
    </article>
  <div>
    <p>Procesando autenticación...</p>
  </div>
</template>


<style scoped>
article{
    height: 110vh;
    background-image: url("@/assets/78950467_l_normal_none.jpg");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}
article div{
    background: rgba(0, 0, 0, 0.5);
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    width: 500px;
}
section{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
section h3{
    color: aliceblue;
    margin-bottom: 10px;
    font-weight: bold;
}

.spinner {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgb(240, 114, 11);
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