<template>
<div class="box gradDynamic">
    <div class="botonagregar">
        <BotonAgregarClase text="Agregar nueva clase" @click="cambio()"></BotonAgregarClase>
        <ClassForm v-if="change" @closeForm="change = false"></ClassForm>
    </div>
    
  <section class="cards" v-if="Clases.length">
    <article v-for="clase in Clases" :key="clase.id" class="card">
      <div>
        <div class="prueba1" :style="{ backgroundImage: `url(${encodeURI(clase.imagen)})` }">
          <div
            class="menuButton"
          >
            <BotonClases :clase="clase" />
          </div>


          <div class="prueba2">
            <div class="prueba3">
              <h2 class="title">{{ clase.titulo }}</h2>
              <h3 class="prex"><span>Precio:</span> {{ clase.precio }}</h3>
            </div>

            <h3 class="dexcrip">{{ clase.descripcion }}</h3>
            <h3 class="infor"><span>Profesor:</span> {{ clase.profesor }}</h3>
            <h3 class="infor"><span>Horarios:</span> {{ clase.fecha }} de {{ clase.comienzo }} - {{ clase.final }}</h3>
            <h3 class="infor"><span>estado:</span> {{ clase.habilitado }}</h3>  
        </div>
        </div>
      </div>
    </article>
  </section>
</div>
</template>
<script setup >
import { ref, onMounted } from 'vue';
import { VerClases } from '@/services/ClassServices';
import BotonClases from './Botones/BotonClases.vue';
import BotonAgregarClase from './Botones/BotonAgregarClase.vue';
import ClassForm from './ClassForm.vue';
const Clases = ref([]);

const change=ref(false);
const cambio= async()=>{
  change.value=true
}
onMounted(async () => {
  try {
    const data = await VerClases();
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
.botonagregar{
    margin-bottom: 30px;
}
.prueba1 {
  overflow: hidden;
  width: 420px;
  height: 29rem;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column-reverse;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 2rem;
  -webkit-box-shadow: 1px 1px 12px #000;
  box-shadow: 1px 1px 12px #000;
  position: relative; /* 🔹 Para que los elementos absolutos se posicionen dentro */
}

.menuButton {
  position: absolute; /* 🔹 Se posiciona sobre .prueba1 */
  top: 15px; /* 🔹 Lo sube al borde superior */
  left: 5px; /* 🔹 Lo alinea a la derecha */
  z-index: 5; /* 🔹 Asegura que esté por encima de otros elementos */
  
}

  
  .prueba2 {
    background-color: rgba(124, 124, 124, 0.863);
    padding: 0.5rem;
    width: 96%;
    height: 40%;
    border-radius: 0 3rem 2rem 2rem;
    font-family: 'Roboto Condensed', sans-serif;
    box-shadow: 1px 1px 12px #000;
  }
  
  .title {
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
    background: linear-gradient(to right,  #FF6F91, #FFC75F);
    -webkit-background-clip: text;
    color: transparent;
  }
  
  .dexcrip {
    text-align: center;
    font-weight: normal;
    margin-bottom: 2px;
    color: #fdfdfd;
  }
  
  .infor {
    font-weight: normal;
    color: #fdfdfd;
  }
  
  .infor span {
    font-weight: bold;
    color: #FFC75F;
  }
  
  .prex {
    color: #ec6313;
    width: 40%;
    background-color: #fdfdfd;
    padding: 5px;
    border-radius: 2rem;
    text-align: center;
    margin-top: -1rem;
    margin-bottom: 1rem;
    text-align: center;
    display: flex;
    align-items: center;
  }
  
  .prex span {
    color: #000000;
  }
  
  .prueba3 {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  
  .cards {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }



@media (max-width: 768px) {
  .prueba1 {
    width: 100%; /* una columna */
    height: 20rem;
  }

  .prueba2 {
    height: auto;
    padding: 1rem;
  }

  .prex {
    font-size: 14px;
    width: auto;
    padding: 4px 10px;
  }

  .title {
    font-size: 18px;
  }

  .dexcrip,
  .infor {
    font-size: 14px;
  }

  .cards {
    flex-direction: column;
    align-items: center;
  }

  .menuButton {
    top: 10px;
    left: 10px;
  }
}


</style>

