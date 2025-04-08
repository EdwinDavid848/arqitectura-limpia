<template>
    <div class="box gradDynamic">
      <h2 class="section-title">Historial de Compras</h2>
      <input type="text" v-model="searchQuery" placeholder="Nombre del usario o correo" class="search-bar" @input="filterUsuarios"/>
      
     
      <table v-if="compras.length" class="compras-table">
        <thead>
          <tr>
            <th>ID Pedido</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Estado</th>
            <th>Metodo de Pago</th>
            <th>Monto Total</th>
            <th>Fecha De Pago</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(compra, index) in compras" :key="index">
            <td>{{ compra.pedido_id }}</td>
            <td>{{ compra.comprador }}</td>
            <td>{{compra.correo}}</td>
            <td>{{ compra.estado_pedido }}</td>
            <td>{{ compra.metodo_pago }}</td>
            <td>{{ currency(compra.monto) }}</td>
            <td>{{  compra.fecha_pago }}</td>
            <td>
              <button @click="showTicket(compra)" class="btn-detalles">Ver Detalles</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="no-data-message">No se encontraron compras.</p>
      <div v-if="isTicketVisible" class="ticket-modal" @click.self="closeTicket">
        <div class="ticket-content">
          <header class="modal-header">
            <h3>Detalles del Pedido #{{ currentCompra.pedido_id }}</h3>
            <button @click="closeTicket" class="btn-close">&times;</button>
          </header>
          <section class="ticket-details">
            <ul>
              <li v-for="(producto, idx) in currentCompra.productos" :key="idx">
                <strong>{{ producto.producto_nombre }}</strong><br />
                Precio unitario: <span class="precio">{{ currency(producto.precio_unitario)}}</span><br />
                Cantidad: {{ producto.cantidad }}<br />
                <span class="total">Total Producto: {{  currency(producto.precio_unitario * producto.cantidad) }}</span>
              </li>
            </ul>
          </section>
          <footer class="modal-footer">
            <button @click="closeTicket" class="btn-close-modal">Cerrar</button>
          </footer>
        </div>
      </div>
    </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { historialAdministradorCompras } from '@/services/productService';

const isTicketVisible = ref(false);
const currentCompra = ref(null);
const compras = ref([]);
const comprasOriginales = ref([]);
const searchQuery = ref('');

// ✅ ESTA FUNCIÓN DEBE ESTAR AQUÍ
const currency = (value) => {
  if (typeof value !== 'number') return value;
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(value);
};

const filterUsuarios = () => {
  const query = searchQuery.value.toLowerCase();
  compras.value = comprasOriginales.value.filter(
    (compra) =>
      compra.comprador.toLowerCase().includes(query) ||
      compra.correo.toLowerCase().includes(query)
  );
};

const showTicket = (compra) => {
  currentCompra.value = compra;
  isTicketVisible.value = true;
};

const closeTicket = () => {
  isTicketVisible.value = false;
};

onMounted(async () => {
  try {
    const data = await historialAdministradorCompras();
    compras.value = data;
    comprasOriginales.value = data;
  } catch (error) {
    console.error('Error al obtener historial de compras:', error);
  }
});
</script>



<style scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
    height:100%;
    width:100%;
    min-height: 100vh;
    padding-bottom: 20px;
    padding-top: 100px;
  }
  
.gradDynamic{
  position:relative;
}

.gradDynamic:after, .gradDynamic:before{
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  content:"";
  z-index:-1;
}

.gradDynamic:after{
  background:radial-gradient(circle,rgb(0, 0, 0),transparent);
  background-size:400%;
  animation:colorSpin 30s linear infinite;
}

.gradDynamic:before{
  background-color:rgb(223, 146, 5);
}

@keyframes colorSpin{
  25%{background-position:0 100%}
  50%{background-position:100% 100%}
  75%{background-position:100% 0}
  100%{filter:hue-rotate(360deg)}
}


.search-bar {
  width: 20%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.admin-section {
  height: 100%;
  padding: 100px 20px;
  border-radius: 8px;
}

.section-title {
  font-size: 1.8em;
  font-weight: bold;
  margin-bottom: 20px;
  color: #f8efef;
}
.compras-table {
  width: 90%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #ff940a;
  border-radius: 8px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  border-bottom: 1px solid #ddd;

}

th {
  background-color: #ff940a;
  font-weight: bold;
  color: #000000;
}

td {
  color: #000000;
}

.no-data-message {
  color: #999;
  font-style: italic;
  text-align: center;
  margin-top: 20px;
}

/* Estilo de los botones */
.btn-detalles {
  padding: 6px 12px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.9em;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.btn-detalles:hover {
  background-color: #2980b9;
}

.ticket-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.ticket-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-out;
}

/* Encabezado del modal */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.modal-header h3 {
  font-size: 1.5em;
  color: #333;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: #777;
  transition: color 0.3s;
}

.btn-close:hover {
  color: #e74c3c;
}

/* Detalles del pedido en el modal */
.ticket-details ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ticket-details li {
  margin-bottom: 15px;
}

.ticket-details li strong {
  font-weight: bold;
  color: #2c3e50;
}

.precio {
  color: #27ae60;
  font-weight: bold;
}

.total {
  font-weight: bold;
  color: #e67e22;
  display: block;
  margin-top: 5px;
}

/* Pie del modal */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn-close-modal {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.btn-close-modal:hover {
  background-color: #c0392b;
}

/* Animación de desvanecimiento */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .admin-section {
    padding: 15px;
  }

  .compras-table {
    font-size: 0.9em;
  }

  .section-title {
    font-size: 1.5em;
  }

  th, td {
    padding: 8px;
  }

  .ticket-content {
    width: 95%;
  }
}
</style>
