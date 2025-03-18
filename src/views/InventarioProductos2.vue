<template>
    <div class="box gradDynamic">
        <section class="cont-ingresar">
            <h1 class="titprod">Ingresar Producto</h1>
            <FormInventarioProductosComp @submit="handleInventario"/>
            <h1 class="tit-tabla">Tablas de Porductos</h1>
            <TablasProductoComp @editar="cargarProducto" />
        </section>
    </div>

</template>


<script setup>
import { ref } from 'vue';
import FormInventarioProductosComp from '@/components/FormInventarioProductosComp.vue';
import TablasProductoComp from '@/components/TablasProductoComp.vue';
import { registrarProducto, actualizarProducto } from '@/services/productService';
import Swal from "sweetalert2";


const productoEditar = ref(null);

const handleInventario = async (producto) => {
    try {
        let response;
        if (producto.id) {
            response = await actualizarProducto(producto.id, producto);
            Swal.fire("Éxito", "Producto actualizado", "success");
        } else {
            response = await registrarProducto(producto);
            Swal.fire("Éxito", "Producto registrado", "success");
        }
        console.log("Respuesta:", response);
        productoEditar.value = null; 
    } catch (error) {
        Swal.fire("Error", "No se pudo procesar la solicitud", "error");
    }
};

const cargarProducto = (producto) => {
    productoEditar.value = { ...producto };
};
</script>



<style scoped>

.box {
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
    background:radial-gradient(circle,rgb(236, 230, 230),transparent);
    background-size:400%;
    animation:colorSpin 30s linear infinite;
  }
  
.gradDynamic:before{
    background-color:rgb(192, 191, 190);
  }
  
@keyframes colorSpin{
    25%{background-position:0 100%}
    50%{background-position:100% 100%}
    75%{background-position:100% 0}
    100%{filter:hue-rotate(360deg)}
}

h1{
    text-align: center;
}

.cont-ingresar{
    padding-top: 100px;
}
.titprod{
    text-align: center;
}
.tit-tabla{
    margin: 50px 0px
}


</style>