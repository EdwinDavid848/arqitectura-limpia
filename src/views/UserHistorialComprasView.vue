<template>
  <section class="cont_historial">
    <table v-if="authStore.historial.length" class="compras-table">
      <thead>
        <tr>
          <th>Fecha De Pago</th>
          <th>Estado</th>
          <th>Método de Pago</th>
          <th>Monto Total</th>
          <th>Detalles</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(compra, index) in authStore.historial" :key="index">
          <td>{{ compra.fecha_pago }}</td>
          <td>{{ compra.estado_pedido }}</td>
          <td>{{ compra.metodo_pago }}</td>
          <td>{{ currency(compra.monto) }}</td>
          <td>
            <button @click="showTicket(compra)" class="btn-detalles">Ver Detalles</button>
        </td>
        </tr>
      </tbody>
    </table>
    <div v-if="isTicketVisible" class="ticket-modal" @click.self="closeTicket">
  <div class="ticket-content">
    <header class="modal-header"> 
      <h3>Detalles del Pedido {{ currentCompra.pedido_id }}</h3>
      <button @click="closeTicket" class="btn-close">&times;</button>
    </header>
    <section class="ticket-details">
      <ul>
        <li v-for="(producto, idx) in currentCompra.productos" :key="idx">
          <strong>{{ producto.producto_nombre }}</strong><br />
          Precio unitario: 
          <span class="precio">{{ currency(producto.precio_unitario) }}</span><br />
          Cantidad: {{ producto.cantidad }}<br />
          <section class="ticket-summary">
            <p><strong>Total del Pedido:</strong> {{ currency(currentCompra.monto) }}</p>
          </section>
        </li>
      </ul>
    </section>
    <footer class="modal-footer">
      <button @click="closeTicket" class="btn-close-modal">Cerrar</button>
    </footer>
  </div>
  </div>
  
  </section>

</template>
  
  <script setup>
  import { onMounted,ref } from 'vue';
  import { useAuthStore } from '@/store/authStore';
  
  const authStore = useAuthStore();
  const isTicketVisible = ref(false);
  const currentCompra = ref(null);

  const showTicket = (compra) => {
    currentCompra.value = compra;
    isTicketVisible.value = true;
  };

  
  const closeTicket = () => {
    isTicketVisible.value = false;
  };

  const currency = (value) => {
    if (typeof value !== 'number') return value;
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
  };
  
  onMounted(() => {
    authStore.obtenerHistorialCompras();
  });
  </script>
  
  
  <style scoped>
  .cont_historial{
    display: flex;
    justify-content: center;
  }
  .admin-section {
    height: 100%;
    padding: 20px;
    border-radius: 8px;
  }

  .section-title {
    font-size: 1.8em;
    font-weight: bold;
    margin-bottom: 20px;
    color: #000000;
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

  /* Estilos del modal */
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





  .ticket-content {
  background: linear-gradient(to bottom right, #fffaf0, #ffffff);
  padding: 30px 20px;
  border-radius: 16px;
  max-width: 600px;
  width: 90%;
  position: relative;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: fadeIn 0.4s ease-out;
}

/* Líneas curvas decorativas */
.ticket-content::before,
.ticket-content::after {
  content: '';
  position: absolute;
  width: 200%;
  height: 200px;
  background: radial-gradient(circle at center, #ff940a 30%, transparent 70%);
  opacity: 0.1;
  z-index: 0;
  transform: rotate(5deg);
}

.ticket-content::before {
  top: -120px;
  left: -50%;
}

.ticket-content::after {
  bottom: -120px;
  right: -50%;
  transform: rotate(-5deg);
}

.ticket-details,
.modal-header,
.modal-footer {
  position: relative;
  z-index: 1; /* Encima de las curvas decorativas */
}

/* Títulos y textos */
.modal-header h3 {
  font-size: 1.6em;
  color: #333;
  font-weight: bold;
}

.ticket-details li strong {
  font-size: 1.05em;
  color: #000;
}

.precio {
  color: #2ecc71;
}

.total {
  color: #ff940a;
  font-weight: 600;
}

/* Botones más suaves */
.btn-close-modal {
  background-color: #ff940a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
}

.btn-close-modal:hover {
  background-color: #e07b00;
}

/* Botón detalles también redondeado */
.btn-detalles {
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.9em;
  border-radius: 20px;
  transition: background-color 0.3s;
}

.btn-detalles:hover {
  background-color: #2980b9;
}


th {
  background-color: #fff;
  color: #ff940a;
  border-bottom: 2px solid #ff940a;
  text-transform: uppercase;
  font-size: 0.9em;
}
.ticket-content {
  transform: scale(0.95);
  opacity: 0;
  animation: showUp 0.3s forwards ease;
}

@keyframes showUp {
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.ticket-details li {
  padding: 10px;
  border-bottom: 1px solid #eee;
  background: #fdfdfd;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.05);
}
.ticket-summary {
  margin-top: 20px;
  font-size: 1.1em;
  text-align: right;
  color: #2c3e50;
}

  </style>
