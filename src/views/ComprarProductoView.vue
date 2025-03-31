<template>
    <div class="box gradDynamic">
      <div>
        <div class="tit-opcionPago">
          <h2>Opciones de Pago</h2>
        </div>
        <div class="opcion">
          <div>
            <button @click="mostrarDiv('PRESENCIAL')">PRESENCIAL</button>
            <button @click="mostrarDiv('NEQUI')">NEQUI</button>
            <button @click="mostrarDiv('DAVIPLATA')">DAVIPLATA</button>
          </div>
        </div>
        <div v-if="divActual === 'NEQUI'" class="div-contenido" id="cont-nequi">
          <div class="container">
            <img
              src="https://i.pinimg.com/564x/c6/a0/46/c6a04605a0cd2729fa647d1958b24110.jpg"
              alt="Logo Nequi"
              class="logo"
            />
            <h1 class="title">Compra aquí</h1>
            <div class="payment-informacion">
              <p class="nequi-numero">Número de Nequi: {{ nequiNumber }}</p>
              <img :src="QrCodigo" alt="Código QR" class="qr-code" />
            </div>
            <p class="instructions">
              Escanea el código QR o utiliza el número de Nequi para comprar
            </p>
          </div>
        </div>
        <div v-if="divActual === 'PRESENCIAL'" class="div-contenido" id="cont-pren">
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
        <div v-if="divActual === 'div3'" class="div-contenido">
          <p>Este es el contenido del Div 3</p>
        </div>
      </div>
      <div class="result-section">
        <div class="tab-result">
          <h2 class="tit-resul">Artículos en orden</h2>
          <div v-for="(item, index) in cartStore.items" :key="index">
            <img :src="item.imagen_url" />
            <h2>{{ item.product_name }} <br> <h3 class="amounts">Cantidad: {{ item.cantidad }}</h3></h2>
            <p>Precio: {{ item.precio }}</p>
          </div>
        </div>
        <div class="tab-precio">
          <h2>Precio Total</h2>
          <h2>{{ calcularTotal }} $</h2>
        </div>
        <button @click="comprarProductos">Confirmar Compra</button>
      </div>
    </div>
</template>


<script setup>
import {ref,onMounted, nextTick} from 'vue';
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const cartStore = useCartStore();
const authStore = useAuthStore();


const divActual = ref('PRESENCIAL')



const mostrarDiv = (div) => {
  divActual.value = div;
};




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
    padding-top: 100px;
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
    background: linear-gradient(to right, rgb(235, 218, 125), rgb(255, 255, 255));
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
}

.opcion button:hover{
    background-color: #ffffff; 
    color: black; 
    transform: scale(1.05); 
    border: 1px solid black;
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
    background-color: #ffffff;
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
  .tab-result{
    display: grid;
    width: 90%;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
    max-height: 700px;
    overflow: auto;  
  }
  .tit-resul{
    border-bottom: 1px solid #bbbaba;
    margin-bottom: 10px;
  }
  .tab-result div{
    display: grid;
    justify-content: center;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 10px;
    padding: 10px;
    border-bottom: 1px solid #bbbaba;
  }
  .tab-result div h2{
    font-size: 25px;
  }
  .tab-result div h3{
    color: #333;
  }
  .tab-result div p{
    font-size: 20px;
    text-align: end;
    color: #f38201;
    font-weight: bold;
  }
  .amounts{
    font-size: 20px;
  }
  .tab-result div img{
    max-width: 100%;
    max-height: 300px;
    display: flex;
    justify-content: center;

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


</style>