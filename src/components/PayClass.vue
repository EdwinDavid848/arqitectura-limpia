<template>
    <article class="todareserva">
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
        <tbody>
          <tr>
            <td>1019986</td>
            <td>Clase 01</td>
            <td>Daniela</td>
            <td>12-03-2025</td>
            <td>Pagado</td>
            <td><BotonCancelacion></BotonCancelacion> <BotonConfirmacion></BotonConfirmacion></td>
          </tr>
        </tbody>
      </table>
    </article>
</template>
<script setup>
import BotonCancelacion from './Botones/BotonCancelacion.vue';
import BotonConfirmacion from './Botones/BotonConfirmacion.vue';
</script>
<style scoped>
.todareserva{
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
}
  .compras-table {
    width: 90%;
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