<template>
    <div class="box gradDynamic">
      <div class="cont-tab-section">
        <div class="div-contenido" id="cont-pren">
          <div class="tab-section">
            <div class="tab-inf">
              <h2>INFORMACION PERSONAL</h2>
            </div>
            <div  v-if="authStore.user" class="infoCompraUsuario">
                <strong>Nombre</strong>
                <p>{{ authStore.user.nombre }}</p>
                <strong>Email</strong>
                <p>{{ authStore.user.email }}</p>
                <strong>Teléfono</strong>
                <p>{{ authStore.user.telefono }}</p>
            </div>
            <div> 
            </div>
          </div>
        </div>
      </div>
      <div class="result-section">
        <div class="tab-result">
          <h2 class="tit-resul">Artículos en orden</h2>
          <div v-for="(item, index) in cartStore.items" :key="index ">
            <div class="item-compra">
              <img :src="item.imagen_url" />
              <div class="info-item">
                <div class="nombre-precio">
                  <h2 class="nombre">{{ item.product_name }}</h2>
                  <p class="precio">Precio: {{ item.precio }}</p>
                </div>
                <h3 class="amounts">Cantidad: {{ item.cantidad }}</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-precio">
          <h2>Precio Total</h2>
          <h2>{{ calcularTotal }} $</h2>
        </div>
        <button @click="comprarProducto">Confirmar Compra</button>
      </div>
    </div>
</template>


<script setup>
import {onMounted, nextTick, computed} from 'vue';
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'vue-router';
import { comprarProductos } from '@/services/productService';
import Swal from 'sweetalert2';

const router = useRouter();

const cartStore = useCartStore();
const authStore = useAuthStore();

const metodo_pago = ("PRESENCIAL")


const comprarProducto = async () => {
  const confirmacion = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, Comprar",
    cancelButtonText: "Cancelar",
  });

  if (confirmacion.isConfirmed) {
    const compra = await comprarProductos(authStore.user.email, metodo_pago);
    if (compra) {
      Swal.fire("Comprado", "El producto ha sido comprado", "success");
    } else {
      Swal.fire("Error", "No se pudo comprar el producto", "error");
    }
  }
};

const calcularTotal = computed(() => {
  return cartStore.items.reduce((total, item) => {
    return total + (item.precio * item.cantidad);
  }, 0);
});








onMounted(async () => {
  await nextTick();
  if (!authStore.isAuthenticated) {
        console.log("Acceso denegado, redirigiendo al login...");
        router.push("/");
      }else{
        authStore.fetchUserInfo();
      }
});


</script>


<style scoped>
  .box {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    min-height: 100vh;
    padding-bottom: 20px;
    padding-top: 80px;
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
    background: linear-gradient(to right, rgb(255, 255, 255), rgb(224, 223, 223));
    background-size: 200% 100%;
    animation: colorSlide 5s infinite alternate ease-in-out;
}
  .gradDynamic:before {
    background-color: rgb(192, 191, 190);
  }
 
  @keyframes colorSlide {
    0% {
        background-position: 100% 0;
    }
    100% {
        background-position: 0 0;
    }
}

.tit-opcionPago{
    height: 20vh;
    display: flex;
    align-items: center;
    justify-content: center ;
}

.tit-opcionPago h2{
    font-size: 40px;
    text-transform: uppercase;
}

.opcion {
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
  }
.opcion div{
    width: 70%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between
    ;
}
  
.opcion div button {
    padding: 10px 0px;
    width: 150px;
    border: none;
    border-radius: 5px;
    background-color: #000000; 
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 1s;
    border: 1px solid black;

}

.opcion button:hover{
    background-color: #ffffff; 
    color: black; 
}

.opcion button.active{
    background-color: #ffffff; 
    color: black;
    transform: scale(1.05); 
}


.div-contenido {
    min-height: 70vh;
    height: auto;
    padding: 20px;
  }
  #cont-nequi{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  



  .container {
    background-color: #ff0077; 
    height: 90%;
    width: 80%;
    padding: 20px;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .logo {
    width: 100px;
    margin-bottom: 10px;
    border-radius: 25px;
  }
  
  .title {
    color: rgb(0, 0, 0);
    font-size: 40px;
    margin: 10px 0;
  }
  
  .payment-informacion {
    margin: 20px 0;
  }
  
  .nequi-numero {
    color: white;
    font-size: 25px;
    margin: 5px 0;
  }
  
  .qr-code {
    width: 200px;
    margin-top: 10px;
  }
  
  .instructions {
    color: white;
    font-size: 23px;
  }
  #cont-pren{
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }
  .tab-section{
    background-color: #f9f9f9;
    border: 1px solid rgb(121, 117, 117);
  }
  #cont-pren .tab-inf{
    border: 1px solid rgb(121, 117, 117);
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    
  }
  #cont-pren div{
    font-size: 20px;
    width: 70%;
    padding: 10px 20px;
  }
  .result-section{
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

  }

 

  .tab-result div h2{
    font-size: 20px;


  }
  .tab-result div h3{
    color: #333;
  }
  .tab-result div p{
    font-size: 20px;
    text-align: end;
    color: #000000;
    font-weight: bold;
  }
  .amounts{
    font-size: 17px;
    font-weight: 600;
  }
  .tab-result div img{
    width: auto;
    max-width: 200px;
    max-height: 200px;

  }
  .tab-precio{
    width: 90%;
    padding: 10px 20px;
    background-color: #f9f9f9;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  }
  .result-section button{
    background-color: green;
    width: 90%;
    height: 50px;
    border: none;
    border-radius: 5px;
    color: #ddd;
    font-size: 30px;
    transition: all 0.1s;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .result-section button:hover{
    color: white;
    background-color: rgb(6, 163, 6);
  }

  .infoCompraUsuario{
    display: grid;
    gap: 10px;
  }


  .tab-result {
  display: flex;
  flex-direction: column;
  width: 90%;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-height: 700px;
  overflow-y: auto;
  border-radius: 10px;
}

.tab-result > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f3f3f3;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.tab-result img {
  width: 100px;
  height: auto;
  border-radius: 10px;
  object-fit: contain;
  margin-right: 15px;
}

.tab-result h2 {
  font-size: 18px;
  margin: 0;
}

.tab-result h3.amounts {
  font-size: 16px;
  margin-top: 5px;
  color: #555;
}

.tab-result p {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  min-width: 100px;
  text-align: end;
}





.item-compra {
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: #f3f3f3;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.item-compra img {
  width: 100px;
  height: auto;
  border-radius: 10px;
  object-fit: contain;
}

.info-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


.nombre-precio {
  display: flex;
  flex-direction: column; 
  align-items: flex-start;
  gap: 5px;
  color: #ff0077;
}

.nombre-precio .nombre {
  font-size: 20px;
  margin: 0;
  color: #222;
  word-break: break-word;
  white-space: normal;
}

.nombre-precio .precio {
  font-size: 18px;
  color: #444;
  margin: 0;
  color: #222122;

}

.amounts {
  font-size: 16px;
  margin-top: 5px;
  color: #555;
}

@media (max-width: 1024px) {
  .box {
    grid-template-columns: 1fr;
    padding-top: 100px;
  }
  .div-contenido{
    height: 10xp;
  }
  .cont-tab-section{
    height: 350px;
  }

  .result-section {
    padding: 20px 10px;
  }

  .tab-result,
  .tab-precio,
  .result-section button {
    width: 100%;
  }

  .tab-result > div {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .item-compra {
    flex-direction: column;
    align-items: center;
  }

  .item-compra img {
    width: 100%;
    max-width: 200px;
  }

  .info-item {
    align-items: center;
    text-align: center;
  }

  .nombre-precio {
    align-items: center;
  }

  .nombre-precio .nombre,
  .nombre-precio .precio,
  .amounts {
    text-align: center;
  }
}

@media (max-width: 768px) {
  #cont-pren div {
    width: 90%;
    height: auto;
  }

  .tab-result p {
    text-align: center;
  }

  .result-section button {
    font-size: 20px;
    height: 45px;
  }

  .tab-result h2,
  .tab-result h3,
  .tab-result p {
    font-size: 16px;
  }

  .nombre-precio .nombre {
    font-size: 18px;
  }

  .nombre-precio .precio {
    font-size: 16px;
  }

  .amounts {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .tab-inf h2,
  .tab-precio h2,
  .tit-resul {
    font-size: 20px;
  }

  .result-section button {
    font-size: 18px;
    height: 40px;
  }

  .item-compra img {
    max-width: 100%;
  }

  .tab-result {
    padding: 15px;
  }

  .infoCompraUsuario {
    font-size: 16px;
  }
}

</style>
