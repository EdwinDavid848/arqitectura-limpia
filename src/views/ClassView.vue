<template>

  <section class="informacionClass">
    <article class="welcome-section">
      <h1 class="welcome-title">BIENVENIDO <span>AL MUNDO DE LAS ARTES MANUALES</span></h1>
      <div class="cardAnuncio">
        <div class="loader">
          <p>Aprenderas</p>
          <div class="words">
            <span class="word">Crochet</span>
            <span class="word">Doble aguja</span>
            <span class="word">Amiguramis</span>
            <span class="word">Bolsos wayu</span>
            <span class="word">Y mas</span>
          </div>
        </div>
      </div>
      <p class="welcome-description">
        Si aun no te has registrado, que esperas!
        <router-link v-if="!isAuthenticated" class="cssbuttons-io" to="/register" @click="cambioPagina">
          <span>Registrate ahora mismo!!</span>
        </router-link>
        <router-link v-else class="cssbuttons-io" to="/dashboard" @click="cambioPagina">
          <span>Registrate ahora mismo!!</span>
        </router-link>
      </p>
      <!-- From Uiverse.io by adamgiebl --> 
      
    </article>
</section>


 <section class="infoClases">
  <h1 class="nuestrasclas">INFORMACION DE NUESTRAS CLASES</h1>
<div class="cardspublicitarias">
<!-- From Uiverse.io by xantha01 --> 
<div class="cardinfo" style="background-image: url('https://i.pinimg.com/736x/18/75/15/187515f5544057f531fc934f71ae15cc.jpg'); background-repeat: no-repeat; background-size: cover; ">
  <div class="details">
    <div class="cardHeader">Beneficios de tejer</div>
    <div class="cardText">
      Aprender a tejer ofrece múltiples beneficios tanto mentales como emocionales. Es una actividad relajante que ayuda a reducir el estrés y la ansiedad, mejora la concentración y la coordinación motriz fina
    </div>
  </div>
</div>

<!-- From Uiverse.io by xantha01 --> 
<div class="cardinfo" style="background-image: url('https://i.pinimg.com/736x/06/80/65/068065ec9d0405de1bb70e180efe6b30.jpg'); background-repeat: no-repeat; background-size: cover; ">
  <div class="details">
    <div class="cardHeader">Conoce nuestros cursos</div>
    <div class="cardText">
      Mustras clases son 100% presenciales y te ofrecemos clases de amiguramis, doble tejido y otras tecnicas de tejido que puedes aprender para hacer hermosas creaciones, 
      <span>Expande tu creatividad</span>
    </div>
  </div>
</div>
<div class="cardinfo" style="background-image: url('https://i.pinimg.com/736x/e2/56/8e/e2568e7b0a35994be5fd9ec3dd535ce6.jpg'); background-repeat: no-repeat; background-size: cover; ">
  <div class="details">
    <div class="cardHeader">Como optener un curso</div>
    <div class="cardText">
    En las siguientes tablas de informacion encontraras toda la informacion referente a la clase que desee, arriba de la tabla contara con un boton de agendamiento donde se le abrira un calendario del cual podra elegir el dia de acuerdo al horario que tiene la clase. Para ver sus clases agendadas tendra la opcion de verlas en su perfil o al final de las tablas de informacion
    </div>
  </div>
</div>
</div >
<p class="welcome-description" v-if="!permisos.user" style="color:black; margin:10px">
        Si aun no te has registrado, que esperas!
        <button class="cssbuttons-io" >
          <router-link class="link" to="/">¡Unete a Nosotros!</router-link>
        </button>
        y asi haras parte de una bonita comunidad al igual de disfrutar de las funciones de nuestra pagina
      </p>
<h1 class="nuestrasclas">NUESTRAS CLASES DISPONIBLES</h1>

    <ClassCard></ClassCard>
    <BotonAgregarClase 
    text="Agregar nueva clase" @click="cambio()"
    v-if="permisos.user && (permisos.user.rol === 'administrador' || permisos.user.rol === 'profesor')"
    ></BotonAgregarClase>
    <ClassForm v-if="change" @closeForm="change = false"></ClassForm>
 </section>
 <section  v-if="permisos.user " >
    <label class="dropdown">
      <input type="checkbox" class="toggle"/>
      <span class="buttonReserva">Mostrar Clases Reservadas</span>
      <div class="content">
        <PayClass></PayClass>
      </div>
    </label>
  </section>
  <div class="Anuncio">
        <div class="parallax_version2">
            <h1>Explora el Mundo del Tejido</h1>
            <p>Tejer no es solo una técnica, es una expresión creativa. Unete a nuestra comunidad y descubre diseños creativos diseñados por amantes del tejido como tu!!</p>
            <button> <router-link class="link" to="/mural">¡Unete a Nosotros!</router-link>
            </button>
        </div>
  </div>
</template>
<script setup>
import { ref, onMounted,computed, watch } from 'vue';
import ClassCard from '@/components/ClassCard.vue';
import BotonAgregarClase from '@/components/Botones/BotonAgregarClase.vue';
import PayClass from '@/components/PayClass.vue';
import ClassForm from '@/components/ClassForm.vue';
import { useAuthStore } from '@/store/authStore';


const permisos=useAuthStore();


const isAuthenticated = computed(() => permisos.isAuthenticated);

    watch(isAuthenticated, (newVal) => {
        if (!newVal) {
            console.log("Token expirado, redirigiendo al login...");
        }
    });

const change=ref(false);
const cambio= async()=>{
  change.value=true
}


onMounted(async () => {
  if (!permisos.isAuthenticated) {
        console.log("Acceso denegado, redirigiendo al login...");
      }else{
        permisos.fetchUserInfo();
      }
});
</script>
<style scope>
/* Estilo de la seccion informacion de clase */
.informacionClass {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0%;
  background-size: cover;
  background-repeat: no-repeat;
}

.informacionClass::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/78950467_l_normal_none.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  filter: brightness(50%); /* Ajusta el valor según lo oscuro que necesites */
  z-index: 0;
}

.informacionClass > * {
  position: relative;
  z-index: 1;
}

.welcome-section {
    max-width: 800px;
    margin: auto;
    padding: 20px;
}

.welcome-title {
    font-size: 3rem;
    font-weight: bold;
    background: linear-gradient(to left, #845EC2, #D65DB1, #FF6F91, #FFC75F);
    -webkit-background-clip: text;
    color: transparent;
    margin-bottom: 10px;
}

.welcome-title span {
    color: white;
    font-weight: normal;
}

.welcome-description {
    margin-top: 20px;
    font-size: 1.2rem;
    color: #ffffff;
    line-height: 1.6;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
/* From Uiverse.io by kennyotsu */ 
.cardAnuncio {
  /* color used to softly clip top and bottom of the .words container */
  background: repeating-linear-gradient(45deg, #effaf5, #c9ba92 20px, #e0d8b3 20px, #e0d8b3 40px);  padding: 1rem 2rem;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loader {
  color: rgb(5, 5, 5);
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 25px;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  height: 40px;
  padding: 10px 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-radius: 8px;
}

.words {
  overflow: hidden;
  position: relative;
}
.words::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    var(--bg-color) 10%,
    transparent 30%,
    transparent 70%,
    var(--bg-color) 90%
  );
  z-index: 20;
}

.word {
  display: block;
  height: 100%;
  padding-left: 6px;
  font-weight: bold;
    background: linear-gradient(to left, #845EC2, #D65DB1, #FF6F91, #FFC75F);
    -webkit-background-clip: text;
    color: transparent;
  animation: spin_4991 4s infinite;
}

@keyframes spin_4991 {
  10% {
    -webkit-transform: translateY(-102%);
    transform: translateY(-102%);
  }

  25% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  35% {
    -webkit-transform: translateY(-202%);
    transform: translateY(-202%);
  }

  50% {
    -webkit-transform: translateY(-200%);
    transform: translateY(-200%);
  }

  60% {
    -webkit-transform: translateY(-302%);
    transform: translateY(-302%);
  }

  75% {
    -webkit-transform: translateY(-300%);
    transform: translateY(-300%);
  }

  85% {
    -webkit-transform: translateY(-402%);
    transform: translateY(-402%);
  }

  100% {
    -webkit-transform: translateY(-400%);
    transform: translateY(-400%);
  }
}

/* Diseño del video */
.clases {
    position: relative;
    padding: 5rem 2rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 2rem;
    justify-items: center;
    transition: 0.5s all ease-in-out;
    border: 10px solid rgba(0, 0, 0, 0.842);
    height: 100vh;
}

.clases .cuadro {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    width: 100%;
    max-width: 1200px;
    text-align: left;
}

.video {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.textoc {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.textoc h2 {
    font-size: 36px;
    color: #ec9513;
    margin-bottom: 1.5rem;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.textoc p {
    font-size: 20px;
    line-height: 1.6;
    background-color: #1d1c1c7c;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    color:#effaf5 ;
}

.btn-curso {
    margin-top: 10px;
    padding: 12px 25px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 30px;
    background: linear-gradient(90deg, #f7c200, #ec9513);
    color: white;
    cursor: pointer;
    border: none;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.btn-curso:hover {
    background: linear-gradient(90deg, #ec9513, #f7c200);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}
/* Responsivo para pantallas pequeñas */
@media (max-width: 768px) {
    .clases .cuadro {
        grid-template-columns: 1fr; /* Una sola columna */
        text-align: center; /* Centra el texto */
    }

    .textoc h2 {
        font-size: 28px; /* Ajustar tamaño del texto */
    }

    .textoc p {
        font-size: 16px; /* Reducir tamaño del texto */
        padding: 15px;
    }

    .btn-curso {
        font-size: 16px; /* Reducir tamaño del botón */
        padding: 10px 20px;
    }
}

/* Responsivo para pantallas muy pequeñas */
@media (max-width: 480px) {
    .clases {
        padding: 3rem 1rem; /* Reducir el padding */
    }

    .textoc h2 {
        font-size: 24px; /* Reducir aún más el tamaño del texto */
    }

    .textoc p {
        font-size: 14px; /* Reducir tamaño del texto */
        padding: 10px;
    }

    .btn-curso {
        font-size: 14px; /* Ajustar tamaño del botón */
        padding: 8px 15px;
    }
}

/*Diseño de clases */
.nuestrasclas{
    font-size: 3rem;
    font-weight: bold;
    background: linear-gradient(to right, #f0974f, #f8af4e, #FF6F91, #faa404);
    -webkit-background-clip: text;
    color: transparent;
    text-align: center;
    margin-bottom: 20px;
    margin-top: 20px;
   }
    .infoClases{
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      padding: 20px;
      margin-bottom: 30px;
      background-size: cover;
    }

/**seccion del historial */
.toggle {
  display: none;
}

/* Estilos del botón */


/* Contenedor del contenido desplegable */
.content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-out, opacity 0.5s;
  opacity: 0;
}

/* Cuando el checkbox está marcado, muestra el contenido */
.toggle:checked + .buttonReserva + .content {
  max-height: 500px; /* Ajusta según el contenido */
  opacity:1;
}

/* PARALLAX VERSION 2 */
.Anuncio {
  margin-top: 50px;
  height: 100vh; 
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;  
  color: #000000;
}

.parallax_version2 {
  background-image: url('@/assets/vecteezy_ai-generated-crafts-advertisment-background-with-copy-space_372450692.jpg'); /* Usa ruta relativa para la imagen */
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;  
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #ffffff;
  font-weight: bold;
  background-position: center;
}

.Anuncio h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: 50px;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: white;
}

.Anuncio p {
  font-size: 20px;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  width: 70%;
  margin-bottom: 10px;
  color: rgb(231, 231, 231);
}

.Anuncio button  {
  padding: 15px 20px;
  font-size: 28px;
  font-family: 'Montserrat', sans-serif;
  border: none;
  transition: all 0.5s ease;
}
.link{
  text-decoration: none;
  width: 100%;
  color: #000000;
  transition: all 0.5s ease;
}
    
.Anuncio button:hover {
  background-color: rgb(206, 127, 9);
  color: white;
}
.Anuncio button .link:hover {
  color: white;
}

@media (max-width: 1440px) {
  .Anuncio button {
    width: 30%;
      }
    }
@media (min-width: 1280px) and (max-width: 1440px) {
  .Anuncio button {
    padding: 20px 10px;
      }
    }

/** boton de mostrar reservaciones */
.buttonReserva {
  width: 100%;
  margin-bottom: -3rem;
  margin-top: 5px;
  font-size: 18px;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: inline-block;
  text-align: center;
  font-weight: bold;
  padding: 0.7em 2em;
  border: 3px solid #2B3044;
  border-radius: 2px;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.1);
  color: #2B3044;
  text-decoration: none;
  transition: 0.3s ease all;
  z-index: 1;
  background-color: #f0974f;
}
.buttonReserva:before {
  transition: 0.5s all ease;
  position: absolute;
  top: 0;
  left: 50%;
  right: 50%;
  bottom: 0;
  opacity: 0;
  content: '';
  background-color: #2B3044;
  z-index: -1;
}

.buttonReserva:hover, button:focus {
  color: white;
}

.buttonReserva:hover:before, button:focus:before {
  transition: 0.5s all ease;
  left: 0;
  right: 0;
  opacity: 1;
}
.buttonReserva:active {
  transform: scale(0.9);
}
/* From Uiverse.io by adamgiebl */ 
.cssbuttons-io { 
  position: relative;
  font-family: inherit;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.05em;
  border-radius: 0.8em;
  cursor: pointer;
  border: none;
  background: linear-gradient(to right, #e2c12d, #e08600);
  color: ghostwhite;
  overflow: hidden;
  margin-top: 5px;
}

.cssbuttons-io svg {
  width: 1.2em;
  height: 1.2em;
  margin-right: 0.5em;
}

.cssbuttons-io span {
  position: relative;
  z-index: 10;
  transition: color 0.4s;
  display: inline-flex;
  align-items: center;
  padding: 0.8em 1.2em 0.8em 1.05em;
}

.cssbuttons-io::before,
.cssbuttons-io::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.cssbuttons-io::before {
  content: "";
  background: #4d6569;
  width: 120%;
  left: -10%;
  transform: skew(30deg);
  transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
}

.cssbuttons-io:hover::before {
  transform: translate3d(100%, 0, 0);
}

.cssbuttons-io:active {
  transform: scale(0.95);
}

.cardspublicitarias{
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  margin-bottom: 20px;
  margin-top: 20px;
}


/* From Uiverse.io by xantha01 */ 
.cardinfo {
  background: #c79013;
  position: relative;
  max-width: 270px;
  height: 350px;
  border-radius: 5px;
  padding: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 7.5px;
  transition: 0.5s ease;
  color: white;
}

.cardinfo::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.5;
  transition: 0.3s ease;
}

.cardinfo:hover::after {
  opacity: 0.25;
}

.cardHeader {
  text-transform: uppercase;
  position: relative;
  width: max-content;
  font-weight: bold;
  transition: all 0.5s ease;
}
.cardHeader::after {
  content: "";
  width: calc(100% + 1rem);
  height: 2.5px;
  transform: translateX(calc(-100% - 1rem));
  background: aqua;
  bottom: -2px;
  left: 0;
  position: absolute;
  opacity: 0;
}

.details {
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 5px;
  transform: translateY(95%);
  transition: all 0.5s ease;
  background-color: #2b30447e;
  padding: 3px;
}


.cardinfo:hover .details {
  transform: translateY(0%);
  transition-delay: 0.5s;

}
.cardinfo:hover .cardHeader::after {
  transform: translateX(-1rem);
  transition: 0.5s ease;
  opacity: 1;
  
}
.cardinfo:hover {
  transform: scale(1.1);
  border-radius: 15px;
}

</style>