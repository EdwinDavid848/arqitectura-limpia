<template>
    <!-- From Uiverse.io by Mike11jr --> 
<button class="btn" @click="confirmar"> Pagado
</button>
</template>
<script setup>
import { defineProps} from 'vue';
import { CambiarEstado,pago } from '@/services/ReservationClassServices';
import Swal from 'sweetalert2';
const props=defineProps({
  data: Object,
})
const confirmar=async()=>{
  try{
   await CambiarEstado(props.data.id, 'paid')
   const fechaISO = new Date(props.data.fecha).toISOString().split('T')[0];
    await pago(props.data.id,'presencial',props.data.monto,fechaISO)
    console.log(props.data)
    Swal.fire({
          icon: 'success',
          title: 'Reservacion pagada con exito',
          text: 'Recargue la página para verificar'
        }).then(() => {
          window.location.reload(); // 🔄 Recargar la página después de eliminar
        });
  }catch(error){
    Swal.fire({
      icon:'error',
      title: 'error al cancelar reservacion'
    })
    console.log('data',props.data)
    console.log(error)
  }
}
</script>
<style scoped>
/* From Uiverse.io by Mike11jr */ 
.btn {
 padding: 1.1em 2em;
 background: none;
 border: 2px solid #fff;
 font-size: 15px;
 color: #131313;
 cursor: pointer;
 position: relative;
 overflow: hidden;
 transition: all 0.3s;
 border-radius: 12px;
 background-color: #ecd448;
 font-weight: bolder;
 box-shadow: 0 2px 0 2px #000;
}

.btn:before {
 content: "";
 position: absolute;
 width: 100px;
 height: 120%;
 background-color: #ff6700;
 top: 50%;
 transform: skewX(30deg) translate(-150%, -50%);
 transition: all 0.5s;
}

.btn:hover {
 background-color: #4cc9f0;
 color: #fff;
 box-shadow: 0 2px 0 2px #0d3b66;
}

.btn:hover::before {
 transform: skewX(30deg) translate(150%, -50%);
 transition-delay: 0.1s;
}

.btn:active {
 transform: scale(0.9);
}
</style>