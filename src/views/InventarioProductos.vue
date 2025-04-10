<template>
    <div class="box gradDynamic">
      <section class="cont-ingresar">
        <h1 class="titprod">Ingresar Producto</h1>
        <FormInventarioProductosComp @submit="handleInventario" />
        <h1 class="tit-tabla">Tablas de Productos</h1>
        <TablasProductoComp @editar="cargarProducto" />
      </section>
 
      <!--actualizacion de productos -->
      <transition name="fade">
        <div v-if="productoEditar" class="modal-overlay" @click.self="cerrarModal">
          <div class="modal-content">
            <h2>Actualizar Producto</h2>
            <FormActualizarProductosComp
                    :producto="productoEditar"
                    @submit="handleInventario"
                    @close="cerrarModal"
                />
          </div>
        </div>
      </transition>
    </div>
</template>
 
  <script setup>
  import { ref } from 'vue';
  import FormInventarioProductosComp from '@/components/FormInventarioProductosComp.vue';
  import TablasProductoComp from '@/components/TablasProductoComp.vue';
  import FormActualizarProductosComp from '@/components/FormActualizarProductosComp.vue';
  import { registrarProducto, actualizarProducto } from '@/services/productService';
  import Swal from "sweetalert2";
 
  const productoEditar = ref(null);
 
  const handleInventario = async (producto) => {
    try {
      if (producto.id) {
        await actualizarProducto(producto.id, producto);
        Swal.fire("Éxito", "Producto actualizado", "success");
      } else {
        await registrarProducto(producto);
        Swal.fire("Éxito", "Producto registrado", "success");
      }
      productoEditar.value = null;
    } catch (error) {
      Swal.fire("Error", "No se pudo procesar la solicitud", "error");
    }
  };
 
  const cargarProducto = (producto) => {
    productoEditar.value = { ...producto };
  };
 
  const cerrarModal = () => {
    productoEditar.value = null;
  };
  </script>
 
  <style scoped>
  .box {
    height: 100%;
    width: 100%;
    min-height: 100vh;
    padding-bottom: 20px;
    padding-top: 40px;
  }
 
  .gradDynamic {
    position: relative;
  }
 
  .gradDynamic:after,
  .gradDynamic:before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: "";
    z-index: -1;
  }
 
  .gradDynamic:after {
    background: radial-gradient(circle, rgb(236, 230, 230), transparent);
    background-size: 400%;
    animation: colorSpin 30s linear infinite;
  }
 
  .gradDynamic:before {
    background-color: rgb(192, 191, 190);
  }
 
  @keyframes colorSpin {
    25% {
      background-position: 0 100%;
    }
    50% {
      background-position: 100% 100%;
    }
    75% {
      background-position: 100% 0;
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }
 
  h1 {
    text-align: center;
    font-size: 2.2rem;
    color: #fffdfa;
    transition: font-size 0.3s;
    text-shadow: 1px 3px 4px rgba(39, 38, 38, 0.5); 
    text-transform: uppercase;

  }

  .cont-ingresar {
    padding-top: 100px;
  }
  .titprod {
    text-align: center;
  }
  .tit-tabla {
    margin-top: 100px;
    margin-bottom: 50px;
  }
 
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
 
  .modal-content {
    background: rgb(211, 206, 206);
    padding: 0px 20px;
    border-radius: 10px;
    width: 70%;
    height: 600px;
    position: relative;
  }
 
  .modal-content h2 {
    text-align: center;
    font-size: 2rem;
    color: #000000;
    text-shadow: 1px 3px 4px rgba(63, 62, 62, 0.473); 
  }
 
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease-in-out;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
 
  </style>
 




