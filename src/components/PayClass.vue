<template>
    <article class="todareserva">
      <div class="table-container">
        <table class="compras-table">
        <thead >
          <tr>
            <td> ID </td>
            <th>Clase</th>
            <th>usuario</th>
            <th>fecha</th>
            <th>Estado</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody v-for="clase in Clases.slice(0, 5)" :key="clase.id">
          <tr>
            <td>{{clase.id}}</td>
            <td>{{ clase.clase }}</td>
            <td>{{ clase.user }}</td>
            <td>{{ clase.fecha_class }}</td>
            <td>{{ clase.estado }}</td>
            <td><BotonCancelacion></BotonCancelacion> <BotonConfirmacion></BotonConfirmacion></td>
          </tr>
        </tbody>
      </table>
      </div>
    </article>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import BotonCancelacion from './Botones/BotonCancelacion.vue';
import BotonConfirmacion from './Botones/BotonConfirmacion.vue';
import { VerReservaciones } from '@/services/ReservationClassServices';

const Clases = ref([]);


onMounted(async () => {
  try {
    const data = await VerReservaciones();
    if (Array.isArray(data)) {
      Clases.value = data;
    } else {
      console.error("Error: La API no devolvió un array.", data);
    }
  } catch (error) {
    console.error("Error al obtener clases:", error);
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
  max-height: 300px; /* Ajusta la altura según necesites */
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
  
</style>