<template>
  <article class="todareserva">
    <div class="table-container">
      <!-- FILTRO DE ESTADO -->
      <div class="opciones" v-if="permisos.user">
        <select v-model="state" @change="filterEstado">
          <option value="" disabled>Opciones de estado</option>
          <option v-for="option in opciones" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <!-- From Uiverse.io by mrhyddenn --> 
      <form class="buscar" @submit.prevent="buscar" v-if="permisos.user && (permisos.user.rol === 'administrador' || permisos.user.rol === 'profesor')"  >
          <input type="input" class="inputbusc" placeholder="Nombre o Correo" required="" v-model="search">
          <button type="submit" class="gradient-button">Buscar</button>
      </form>
      
      
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
        <tbody v-for="clase in reserva" :key="clase.id">
          <tr>
            <td>{{ clase.id }}</td>
            <td>{{ clase.clase }}</td>
            <td>{{ clase.usuario }}</td>
            <td>{{ clase.fecha }}</td>
            <td>{{ clase.monto }}</td>
            <td>{{ clase.estado }}</td>
            <td>
              <BotonCancelacion 
                v-if="clase.estado=='reserved' && permisos.user && permisos.user.rol === 'cliente'" 
                :data="clase" 
              />
              <BotonConfirmacion 
                v-if="clase.estado=='reserved' && permisos.user && (permisos.user.rol === 'administrador' || permisos.user.rol === 'profesor') " 
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
const reserva=ref([])
const opciones = ref(['reserved', 'paid', 'cancelled']);
const state = ref('reserved');
const search = ref('');

const filterEstado =()=>{
  const query=state.value.toLowerCase();
  reserva.value=Clases.value.filter(
    (clase)=> clase.estado.toLowerCase().includes(query)
  )
}

const cargarReservaciones = async () => {
  try {
    if (!permisos.user) return;

    if (permisos.user.rol === 'cliente') {
      const data = await BuscarReservaciones(permisos.user.email, state.value);
      Clases.value = data;
      reserva.value=data.map( us =>({
        ...us,
        estados:us.estado
      }));
      console.log(Clases.value)
    } else {
      const data = await VerReservaciones();
      Clases.value = data;
      reserva.value=data.map( us =>({
        ...us,
        estados:us.estado
      }));
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
  margin-top: 10px;
}
  .compras-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: #fcfaf8;
    border-radius: 8px;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
    
  }
  .compras-table th {
    background-color: #ee8e10;
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

  }
.opciones{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.opciones select{
  width: 40%;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid rgb(245, 187, 27);
  font-size: 15px;
  font-weight: bold;
}
.gradient-button {
  background: linear-gradient(90deg, #ff6a00 0%, #d14400 100%); /* Degradado naranja */
  color: white; /* Texto blanco */
  border: none; /* Sin bordes */
  border-radius: 10px; /* Bordes redondeados */
  padding: 10px 20px; /* Espaciado interno */
  font-size: 16px; /* Tamaño del texto */
  cursor: pointer; /* Cursor de mano */
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* Transición suave */
}

.gradient-button:hover {
  transform: translateY(-2px); /* Sube ligeramente al pasar */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra al pasar */
}

.gradient-button:active {
  transform: translateY(2px); /* Baja ligeramente al hacer clic */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Sombra reducida */
}
.inputbusc{
      background-color: white; /* Fondo blanco */
  color: rgb(0, 0, 0); /* Color del texto */
  border: 2px solid rgb(#fd9f47); /* Borde anaranjado */
  border-radius: 10px; /* Bordes redondeados */
  padding: 5px 15px; /* Espaciado interno */
  font-size: 16px; /* Tamaño del texto */
  cursor: pointer; /* Cursor de mano al pasar */
  transition: all 0.3s ease; 
}
</style>