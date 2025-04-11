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
    <article class="publicidad_class">
      <div class="parallax" >
        <h3>Trabajemos juntos</h3>
        <h1>¿Buscas Productos de Tejido Únicos?</h1>
        <p>No hay una fórmula mágica para crear artesanías perfectas...</p>
        <button><router-link class="link" to="/">¡Ingresa a clases!</router-link></button>
      </div>
    </article>
    
    <!-- MOSTRAR PRODUCTOS VERSION 1 -->
    <div class="contenedor_text">
        <h1 class="cont_part1_text">Tejidos únicos, diseñados con amor y atención al detalle</h1>
    </div> 
    <div ref="animatable" :class="{'animate': isVisible0}" class="contenedor_animacion_version1">
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

    <!-- MOSTRAR PRODUCTOS VERSION 2 -->
  <section>
    <div class="TituloProducto">
      <h1>Nuestros Productos</h1>
      <p>Productos realizados por la pagina divido en categorias, puedes buscar mas variadad en nuestro Productos</p>
    </div>
    <h2 class="titulos">Lanas</h2>
    <div  class="cont_product">
      <div class="product">
        <ProductCardVersion2 
          v-for="(producto, index) in productosCategoria.lana" 
          :key="index"
          :producto="producto" 
        />
      </div>
    </div>
    <h2 class="titulos">Agujas</h2>
    <div >
      <div class="product">
        <ProductCardVersion2  
          v-for="(producto, index) in productosCategoria.agujas" 
          :key="index"
          :producto="producto" 
          class="prductos"
        />
      </div>
    </div>
    <h2 class="titulos">Piedras</h2>
    <div >
      <div class="product">
        <ProductCardVersion2  
          v-for="(producto, index) in productosCategoria.peluche" 
          :key="index"
          :producto="producto" 
        />
      </div>
    </div>
  </section>


  <section class="mostrarPublicidad"><MostrarPublicidadComp/></section>

  <!-- PARALLAX VERSION 2 -->

  <div class="Anuncio">
        <div class="parallax_version2">
            <h1>Explora el Mundo del Tejido</h1>
            <p>Tejer no es solo una técnica, es una expresión creativa. En nuestra tienda encontrarás todo lo que necesitas para hacer realidad tus proyectos, desde hilos y agujas hasta piezas únicas como ropa, peluches, y accesorios hechos a mano. También ofrecemos clases para que aprendas a tejer como un experto y lleves tus creaciones al siguiente nivel.</p>
            <button> <router-link class="link" to="/mural">¡Unete a Nosotros!</router-link>
            </button>
        </div>
  </div>


</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import CarruselComp from '@/components/CarruselComp.vue';
import ProductCardVersion1 from '@/components/ProductCard(Version-1).vue';
import BotonProductos from '@/components/Botones/BotonProductos.vue';
import MostrarPublicidadComp from '@/components/MostrarPublicidadComp.vue';
import ProductCardVersion2 from '@/components/ProductCard(Version-2).vue';
import { mostrarProductosIniciales } from '@/services/authService';
import { obtenerProductosCategoria } from '@/services/authService';
import { aparicionAbajo } from '@/composables/animation';

// Usar el composable correctamente
const { isVisible0, animatable } = aparicionAbajo();

const productos = ref([]);
const categorias = ['lana', 'agujas', 'piedras', 'peluche'];
const productosCategoria = ref({
  lana: [],
  piedras: [],
  agujas: [],
  peluche: []
});

const obtenerProductos = async () => {
  try {
    const respuesta = await Promise.all(
      categorias.map(categoria => obtenerProductosCategoria(categoria,))
    );

    categorias.forEach((categoria, index) => {
      productosCategoria.value[categoria] = respuesta[index].slice(0, 4);
    });
  } catch (error) {
    console.error("Error obteniendo productos:", error);
  }
};

onMounted(async () => {
  productos.value = await mostrarProductosIniciales();
  obtenerProductos();
});

onUnmounted(() => {});
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
    text-align: center;
  }
  .cont_nosotros h2{
    text-align: center;
    padding: 20px;
  }


  /* PARALLAX VERSION 1 */
  .publicidad_class {
    height: 350px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    color: #000000;
    background-color: #e2dfdf56;
    opacity: 1;
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  
  .parallax {
    background-image: url('@/assets/vecteezy_ai-generated-knitting-advertisment-background-with-copy-space_37246648.jpg');
    background-position: bottom center;
    background-size: cover;
    background-attachment: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #ffffff;
    box-shadow: 2px 4px 18px rgba(0, 0, 0, 0.1);
    font-weight: bold;
    width: 100%;
    height: 80%;
    color: #000000;
  }
  
  .publicidad_class .parallax h1 {
    font-family: 'Playfair Display', serif;
    font-size: 50px;
    color: #ebebeb;
  }
  
  .publicidad_class .parallax h3 {
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #ebebeb;

  }
  
  .publicidad_class .parallax p {
    font-size: 25px;
    margin-bottom: 10px;
    color: #ebebeb;

  }
  
  .publicidad_class .parallax button {
    background-color: #ffffffbe;
    padding: 13px;
    border-radius: 5px;
    font-size: 28px;
    font-family: 'Montserrat', sans-serif;
    border: none;
    transition: all 0.5s ease;
  }
  
  .link {
    text-decoration: none;
    color: #000000;
  }
  .link:hover{
    color: white;
  }
  
  .publicidad_class div button:hover {
    background-color: rgb(236, 151, 24);
    color: white;
  }





/* MOSTRAR PRODUCTOS VERSION 1 */


.contenedor_animacion_version1 {
    opacity: 1;
    transform: translateY(50px);
    transition: opacity 1s ease, transform 1s ease;
    transform: scale(0.7);
}

.contenedor_animacion_version1.animate {
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

.cont_part1_button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.cont_part1_button .link {
    text-decoration: none;
    border: none;
    background-color: transparent;
    font-size: 20px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-transform: uppercase;
    letter-spacing: 3px;
    border-bottom: 1px solid rgb(95, 94, 94);
    transition: text-shadow 0.3s ease;
    color: black;
}

.cont_part1_button .link:hover {
    border-bottom: 2px solid black;
    text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.74);
}



.mostrarPublicidad{
  margin: 50px 0px;
}

/* MOSTRAR PRODUCTOS VERSION 2 */


.contenedor_animacion_version2 {
  opacity: 1;
  transform: translateY(50px);
  transition: opacity 1s ease, transform 1s ease;
}

.contenedor_animacion_version2.animate {
  opacity: 1;
  transform: translateY(0);
}

.TituloProducto {
  text-align: center;
  padding: 30px;
  font-size: 30px;
  color: rgb(66, 65, 65);
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: column;
  gap: 10px;
  height: 150px;
}

.TituloProducto h1 {
  color: rgb(0, 0, 0);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: none;
}

.TituloProducto p {
  width: 60%;
  font-size: 25px;
  font-family: 'Playfair Display', serif;
}

.cont_product{
  height: auto;
  margin-bottom: 20px;
}
.product {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
}



.card {
  width: auto;
  height: auto;
  border: 2px solid black;
}

.titulos {
  font-size: 40px;
  font-family: serif;
  font-weight: bold;
  color: #e9e9e9;
  text-shadow: 0 1px 0 #a5a0a0, 0 2px 0 #aaa2a2, 0 3px 0 #928f8f, 0 4px 0 #aaa, 0 5px 0 #acacac, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.15);
  margin-left: 55px;
}

@media (max-width: 1440px) {
  .TituloProducto p {
    width: 80%;
    font-size: 25px;
    font-family: 'Playfair Display', serif;
  }
}

@media (min-width: 1441px) and (max-width: 1600px) {
  .TituloProducto h1 {
    color: rgb(0, 0, 0);
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 40px;
  }
  .TituloProducto p {
    width: 90%;
    font-size: 25px;
    font-family: 'Playfair Display', serif;
  }
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


  </style>
  