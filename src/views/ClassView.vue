<template>
  <section class="informacionClass">
    <article class="welcome-section">
      <h1 class="welcome-title">BIENVENIDO <span>AL MUNDO DE LAS ARTES MANUALES</span></h1>
      <div class="card">
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
        Aprender a tejer no solo te relaja, sino que también mejora la creatividad, la concentración y te permite crear piezas únicas con tus propias manos. ¡Descubre los beneficios del arte manual hoy!
      </p>
    </article>
</section>
<section class="clases">
        <div class="cuadro">
            <div class="video">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/7A6I8wk3srI?si=u9HbD9JnNpGsnU9O" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>            
            </div>
            <div class="textoc">
                <h2 class="nuestroscursos">Nuestros Cursos</h2>
                <p class="pcursos">
                  Nosotros les proporcionamos a las personas interesadas en iniciar este gran mundo del tegido con clases de 1 hora de duracion donde podran expandir su creatividad y aprender como hacer los diseños que deseen implementando patrones de tegido, con el segumiento de nuestros amables profesores quienes siempre estaran dispuestos a darte una mano en tu tegido y enseñarte o dirigirte en tus proyectos 
                </p>
            </div>
        </div>
        <button class="btn-curso">Reserva tu curso</button>
</section>
 <section class="infoClases">
   <h1 class="nuestrasclas">NUESTRAS CLASES DISPONIBLES</h1>
    <ClassCard></ClassCard>
    <BotonAgregarClase></BotonAgregarClase>
 </section>
 <section>
    <label class="dropdown">
      <input type="checkbox" class="toggle"/>
      <span class="button">Mostrar Clases Reservadas</span>
      <div class="content">
        <PayClass></PayClass>
      </div>
    </label>
  </section>
</template>
<script setup>
import ClassCard from '@/components/ClassCard.vue';
import BotonAgregarClase from '@/components/Botones/BotonAgregarClase.vue';
import PayClass from '@/components/PayClass.vue';
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
    background: linear-gradient(to right, #845EC2, #D65DB1, #FF6F91, #FFC75F);
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
}
/* From Uiverse.io by kennyotsu */ 
.card {
  /* color used to softly clip top and bottom of the .words container */
  background: repeating-linear-gradient(45deg, #effaf5, #92c9b1 20px, #b3e0d2 20px, #b3e0d2 40px);  padding: 1rem 2rem;
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
    background: linear-gradient(to right, #845EC2, #D65DB1, #FF6F91, #FFC75F);
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
   }
    .infoClases{
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      padding: 20px;
      margin-bottom: 30px;
      background-image: url('https://png.pngtree.com/thumb_back/fw800/background/20231103/pngtree-texture-of-black-knitted-fabric-pattern-image_13740463.png');
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
.toggle:checked + .button + .content {
  max-height: 500px; /* Ajusta según el contenido */
  opacity:1;
}

</style>