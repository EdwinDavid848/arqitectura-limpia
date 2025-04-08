<template>
  <article class="todareserva">
    <div class="table-container">
      <form action="" class="buscar" @submit.prevent="buscar"   v-if="permisos.user && (permisos.user.rol === 'administrador' || permisos.user.rol === 'profesor')"      >
            <input type="text" placeholder="Buscar" class="inputbusc" v-model="search">
            <button type="submit" class="gradient-button">Buscar</button>
      </form> 
      <div class="opciones" v-if="permisos.user && permisos.user.rol === 'cliente'">
        <select v-model="state" >
          <option value="" disabled>Opciones de estado</option>
          <option v-for="option in opciones" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <table class="compras-table">
        <thead>
          <tr>
            <td>ID</td>
            <th>Clase</th>
            <th>Usuario</th>
            <th>Fecha</th>
            <th>monto</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody v-for="clase in Clases" :key="clase.id">
          <tr>
            <td>{{ clase.id }}</td>
            <td>{{ clase.clase }}</td>
            <td>{{ clase.usuario }}</td>
            <td>{{ clase.fecha }}</td>
            <td>{{ clase.monto }}</td>
            <td>{{ clase.estado }}</td>
            <td>
              <BotonCancelacion 
                v-if="permisos.user && permisos.user.rol === 'cliente'" 
                :data="clase" 
              />
              <BotonConfirmacion 
                v-if="permisos.user && (permisos.user.rol === 'administrador' || permisos.user.rol === 'profesor')" 
                :data="clase"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import BotonCancelacion from './Botones/BotonCancelacion.vue';
import BotonConfirmacion from './Botones/BotonConfirmacion.vue';
import { VerReservaciones, BuscarReservaciones, ReservacionesUsuario } from '@/services/ReservationClassServices';
import { useAuthStore } from '@/store/authStore';

const permisos = useAuthStore();
const Clases = ref([]);
const opciones = ref(['reserved', 'paid', 'cancelled']);
const state = ref('reserved');
const search = ref('');

const cargarReservaciones = async () => {
  try {
    if (!permisos.user) return;

    if (permisos.user.rol === 'cliente') {
      const data = await BuscarReservaciones(permisos.user.email, state.value);
      Clases.value = data;
      console.log(Clases.value)
    } else {
      const data = await VerReservaciones();
      Clases.value = data;
      console.log(Clases.value)
    }
  } catch (error) {
    console.error('Error al obtener clases:', error);
  }
};

const buscar=async()=>{
  const data = await ReservacionesUsuario(search.value);
  Clases.value = data;
};

onMounted(async () => {
  if (!permisos.isAuthenticated) {
    console.log('Acceso denegado, redirigiendo al login...');
    return;
  }

  await permisos.fetchUserInfo();
  await cargarReservaciones();
});

// Solo los clientes cambian de estado
watch(state, async () => {
  if (permisos.user && permisos.user.rol === 'cliente') {
    await cargarReservaciones();
  }
});
</script>

<style scoped>
.todareserva{
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  
}
.table-container {
  max-height: 400px; /* Ajusta la altura según necesites */
  overflow-y: auto;  /* Agrega scroll vertical */
  border: 1px solid #ccc; /* Opcional: para que se vea más claro el área */
  width: 100%;
  padding: 10px;
}
  .compras-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: #f7b661;
    border-radius: 8px;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
    
  }
  .compras-table th {
    background-color: #ff940a;
    font-weight: bold;
    color: #000000;
  }

  .compras-table td {
    color: #000000;
  }
  
.compras-table th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    border-bottom: 1px solid #ddd;

  }
.opciones{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
.opciones select{
  width: 40%;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid rgb(245, 187, 27);
  font-size: 15px;
  font-weight: bold;
}
</style>