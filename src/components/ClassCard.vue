<template>
  <article class="cards">
    <div>
      <!-- Agendar Button -->
      <button id="butn" class="button">Agendar</button>
        <!-- Imagen de fondo -->
        <div :style="{ backgroundImage: `url(https://pearlknitter.com/wp-content/uploads/2015/10/0082-800x458.jpg)` }"
          class="prueba1">

          <!-- Overlay for Disabled Cards -->
          <div class="overlayclase"></div>

          <!--Menu de botones-->
          <div class="menuButton">
            <BotonClases></BotonClases>
          </div>

          <!-- Card Content -->
          <div class="prueba2">
            <div class="prueba3">
              <h2 class="title">Titulo</h2>
              <h3 class="prex"><span>precio:</span> Precio</h3>
            </div>
  
            <!-- Eliminamos <p> que no era necesario -->
            <h3 class="dexcrip">Descripcion</h3>
            <h3 class="infor"><span>profesor:</span> Profesor</h3>
            <h3 class="infor"><span>horarios:</span> 15-03-2025 12:19 - 1:30</h3>
          </div>
        </div>
      </div>
    </article>
  </template>
  
  <script setup>
  import BotonClases from './Botones/BotonClases.vue';
  </script>
  
<style scoped>
.prueba1 {
  width: 420px;
  height: 26rem;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column-reverse;
  background-size: cover;
  background-position: center;
  border-radius: 2rem;
  -webkit-box-shadow: 1px 1px 12px #000;
  box-shadow: 1px 1px 12px #000;
  position: relative; /* 🔹 Para que los elementos absolutos se posicionen dentro */
}

.menuButton {
  position: absolute; /* 🔹 Se posiciona sobre .prueba1 */
  top: 15px; /* 🔹 Lo sube al borde superior */
  right: 5px; /* 🔹 Lo alinea a la derecha */
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
  
  </style>
  