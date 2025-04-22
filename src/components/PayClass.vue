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
          <td data-label="ID">{{ clase.id }}</td>
          <td data-label="Clase">{{ clase.clase }}</td>
          <td data-label="Usuario">{{ clase.usuario }}</td>
          <td data-label="Fecha">{{ clase.fecha }}</td>
          <td data-label="Monto">{{ clase.monto }}</td>
          <td data-label="Estado">{{ clase.estado }}</td>
          <td data-label="Acción">
            <BotonCancelacion 
              v-if="clase.estado=='reserved' && permisos.user && permisos.user.rol === 'cliente'" 
              :data="clase" 
            />
            <BotonConfirmacion 
              v-if="clase.estado=='reserved' && permisos.user && (permisos.user.rol === 'administrador' || permisos.user.rol === 'profesor')" 
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
.todareserva {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;  /* Asegura que ocupe todo el espacio disponible */
  height: 100%; /* Para asegurar que ocupe todo el alto disponible */
}

.table-container {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  box-sizing: border-box;
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

.compras-table th,
.compras-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.opciones {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  flex-wrap: wrap;
}

.opciones select {
  width: 100%;
  max-width: 300px;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid rgb(245, 187, 27);
  font-size: 15px;
  font-weight: bold;
  box-sizing: border-box;
}

.buscar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.inputbusc {
  background-color: white;
  color: black;
  border: 2px solid #fd9f47;
  border-radius: 10px;
  padding: 10px 15px;
  font-size: 16px;
  box-sizing: border-box;
}

.gradient-button {
  background: linear-gradient(90deg, #ff6a00 0%, #d14400 100%);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.gradient-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.gradient-button:active {
  transform: translateY(2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* ----------------- RESPONSIVE ------------------ */

@media (max-width: 768px) {
  .compras-table th, .compras-table td {
    padding: 8px;
    font-size: 14px;
  }

  .gradient-button,
  .inputbusc,
  .opciones select {
    width: 100%;
    font-size: 14px;
  }

  .buscar {
    flex-direction: column;
    align-items: center;
  }

  /* Asegura que la tabla ocupe todo el espacio disponible */
  .table-container {
    width: 100%;
    padding: 10px;
    height: auto;
  }
}

@media (max-width: 480px) {
  .compras-table {
    font-size: 13px;
    width: 100%;
  }

  .compras-table thead {
    display: none; /* Oculta encabezado para versión móvil */
  }

  .compras-table tr {
    display: block;
    margin-bottom: 15px;
    border-bottom: 2px solid #ccc;
  }

  .compras-table td {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    border: none;
    font-size: 13px;
  }

  .compras-table td::before {
    content: attr(data-label);
    font-weight: bold;
    margin-right: 10px;
  }

  .compras-table td:last-child {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .todareserva {
    flex-direction: column;
    align-items: stretch;
    padding-left: 0;
    padding-right: 0;
    width: 100%; /* Asegura que ocupe todo el espacio disponible */
  }

  .table-container {
    width: 100%;
    padding: 10px;
    height: auto; /* Asegura que la altura se ajuste */
  }
}
</style>
