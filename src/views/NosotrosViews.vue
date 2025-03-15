<template>
    <div class="cont_nosotros">
      <h1>NOSOTROS</h1>
      <h2>
        Nuestra tienda se encuentra en el centro de la localidad de Fontibón, tenemos hermosos productos hechos a la mano por expertos en el hermoso arte del tejido. Te podemos proporcionar productos para que tú puedas realizar tus creaciones además de enseñarte cómo hacerlo.
      </h2>
    </div>
    <!-- CARRUSEL -->
    <CarruselComp />
    
    <!-- PARALLAX VERSION 1 -->
    <article ref="animatable" class="publicidad_class" :class="{ 'visible': isVisible }">
      <div 
        class="parallax" 
        :style="{ backgroundPositionY: parallaxOffset + 'px' }"
      >
        <h3>Trabajemos juntos</h3>
        <h1>¿Buscas Productos de Tejido Únicos?</h1>
        <p>No hay una fórmula mágica para crear artesanías perfectas...</p>
        <button><router-link class="link" to="/Clases">¡Ingresa a clases!</router-link></button>
      </div>
    </article>
    
    <!-- MOSTRAR PRODUCTOS VERSION 1 -->
    <div class="contenedor_text">
        <h1 class="cont_part1_text">Tejidos únicos, diseñados con amor y atención al detalle</h1>
    </div> 
    <div ref="animatable" :class="{'animate': isVisible2}" class="contenedor_animacion">
        <div class="conten">
            <article class="cont_part1">
                <ProductCardVersion1 
                    v-for="(producto, index) in productos" 
                    :key="index" 
                    :producto="producto"
                />
            </article>
        </div>
        <BotonProductos/>
    </div>

</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import CarruselComp from '@/components/CarruselComp.vue';
import ProductCardVersion1 from '@/components/ProductCard(Version-1).vue';
import BotonProductos from '@/components/Botones/BotonProductos.vue';
import { mostrarProductos } from '@/services/authService';

const isVisible = ref([]);
const isVisible2 = ref(false);
const animatable = ref(null);

const animatables = ref([]);
const parallaxOffsets = ref([]);
const productos = ref([]);


const handleScroll2 = () => {
    if (!animatable.value) return;

    const rect = animatable.value.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 1000) {
        isVisible2.value = true;
    }
};


const handleScroll = () => {
  animatables.value.forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      isVisible.value[index] = true;
    }

    parallaxOffsets.value[index] = window.scrollY * 0.3;
  });
};

onMounted(async() => {
  productos.value = await mostrarProductos();

  animatables.value = Array.from(document.querySelectorAll('.publicidad_class'));
  isVisible.value = new Array(animatables.value.length).fill(false);
  parallaxOffsets.value = new Array(animatables.value.length).fill(0);

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('scroll', handleScroll2);

  handleScroll();
  handleScroll2();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('scroll', handleScroll2);
});

</script>
  
  <style scoped>
  .cont_nosotros {
    background-image: url("@/assets/78950467_l_normal_none.jpg");
    height: 100vh;
    margin-top: 0%;
    color: rgb(239, 240, 241);
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    margin: 0px 5px;
  }
  
  .publicidad_class {
    height: 350px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    color: #000000;
    background-color: #e2dfdf56;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  .publicidad_class.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .parallax {
    background-image: url('@/assets/vecteezy_ai-generated-knitting-advertisment-background-with-copy-space_37246648.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center; 
    transform: translateZ(0); 
    background-attachment: scroll; 
    height: 80%;
    width: 98%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #ffffff;
    box-shadow: 2px 4px 18px rgba(0, 0, 0, 0.1);
    font-weight: bold;
  }
  
  .publicidad_class .parallax h1 {
    font-family: 'Playfair Display', serif;
    font-size: 50px;
    color: #ebebeb;
  }
  
  .publicidad_class div h3 {
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  .publicidad_class div p {
    font-size: 25px;
    margin-bottom: 10px;
  }
  
  .publicidad_class .parallax button {
    background-color: #ffffffbe;
    padding: 10px;
    font-size: 28px;
    font-family: 'Montserrat', sans-serif;
    border: none;
    transition: all 0.5s ease;
  }
  
  .link {
    text-decoration: none;
    color: #000000;
  }
  
  .publicidad_class div button:hover {
    background-color: rgb(236, 151, 24);
    color: white;
  }





  .contenedor_animacion {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1s ease, transform 1s ease;
    transform: scale(0.7);
}

.contenedor_animacion.animate {
    opacity: 1;
    transform: translateY(0);
    transform: scale(1) ;

}

.contenedor_text {
    margin-bottom: 10px;
    height: 190px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.conten {
    display: flex;
    justify-content: center;
}

.cont_part1 {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    padding: 28px;
    gap: 20px;
    width: 90%;
}

.cont_part1_text {
    text-align: center;
    font-family: 'Playfair Display', serif;
    font-size: 35px;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: rgb(32, 32, 32);
    width: 70%;
}


  </style>
  