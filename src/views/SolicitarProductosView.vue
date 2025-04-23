<template>
<div class="contedor_detalleProducto">
     <div class="contenedor_img">
         <img :src="producto.imagen_url " alt="">
     </div>
     <div class="producto_detalles">
         <div>
             <h1>{{ producto.nombre }}</h1>
             <h2> {{ formatoPesosColombianos(producto.precio)  }}</h2>
             <p><strong>Categoría:</strong> {{ producto.category }}</p>
             <p><strong>Precio:</strong> {{ formatoPesosColombianos(producto.precio) }} $</p>
             <p><strong>Color:</strong> {{ producto.color }}</p>
             <p><strong>Tipo de cantidad:</strong> {{ producto.tipo_unidad }}</p>
             <p><strong>Descripción:</strong> {{ producto.descripcion }}</p>
         </div>
         <div class="botones_comprar">
             <button @click="agregarAlCarrito">Agregar al carrito</button>
             <input v-model="amount" type="number" min="1" value="1">
         </div>

     </div>
 </div>
 <div class="product-section">
     <div>
         <h2>Descripción del Producto</h2>
         <p>
             Eleva tus creaciones con nuestra selección de lana premium. Proveniente de las mejores granjas, nuestra lana es suave, duradera y perfecta para todo tipo de proyectos de tejido y manualidades. Con un enfoque en la sostenibilidad y calidad, nuestra lana garantiza que tus creaciones perduren en el tiempo.
         </p>
         <ul>
             <li>Material natural y transpirable, ideal para prendas de invierno.</li>
             <li>Rica en textura y color para un acabado lujoso.</li>
             <li>Fuente sostenible para creadores conscientes del medio ambiente.</li>
             <li>Disponible en una amplia gama de colores para cada proyecto.</li>
         </ul>
     </div>
 </div>
 <div class="care-instructions">
     <div>
         <h2>Instrucciones de Cuidado</h2>
         <p>
             El cuidado adecuado es esencial para preservar la suavidad y durabilidad de tus creaciones de lana. Lava a mano con agua fría y detergente suave, y déjala secar en posición horizontal. Evita la luz solar directa para mantener la vitalidad de los colores. Almacena en un lugar fresco y seco para evitar daños por polillas.
         </p>
     </div>
 </div>
 <div class="socialMural-section">
     <h2>¡Comparte tus momentos con estilo usando nuestro Mural!</h2>
     <p>
       Captura tus creaciones de lana y sé parte de nuestra comunidad de tejedores. Comparte tus momentos más estilosos usando nuestro <strong>Mural</strong>.
     </p>
 </div>
 <div class="social-section">
     <div class="socialIMG-mural">
          <div v-for="(dato, index) in datos.slice(0, 6)" :key="dato.id || index">
          <img :src="dato.foto" alt=""> 
        </div>
     </div>
 </div>
 <div class="similar-section ocultar-en-movil">
     <h1>Productos Similares</h1>
 </div>
 <div class="cont_P_relacionados ">
  <ProductCardVersion2 
    v-for="(producto, index) in producto_similares.slice(0, 10)" 
    :key="index" 
    :producto="producto" 
    :estilo="estilo" 
  />
</div>

</template>
<script setup>
import { ref, onMounted, watch } from 'vue'; // ⬅️ aquí agregas watch
import { SolicitarProductos, obtenerProductosCategoria } from '@/services/authService';
import { useRoute } from 'vue-router';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import ProductCardVersion2 from '@/components/ProductCard(Version-2).vue';
import Swal from 'sweetalert2';
import { fetchPublications } from '@/services/MuralServices';
const datos=ref([]);
const recibirdatos = async () =>{
    try {
       console.log("Cargando todas las publicaciones");
        datos.value= await fetchPublications(); 
    } catch (error) {
        console.log(error)
    }
    
}

const cartStore = useCartStore();
const authStore = useAuthStore();

const route = useRoute();
const producto = ref({});
const producto_similares = ref([]);
const amount = ref(1);

const obtenerProductosSimilares = async (category) => {
    try {
        const respuesta = await obtenerProductosCategoria(category);
        if (respuesta && Array.isArray(respuesta)) {
            producto_similares.value = respuesta.slice(0, 4);
        }
    } catch (error) {
        console.error("Error obteniendo productos:", error);
    }
};

const agregarAlCarrito = async () => {
    const email_User = authStore.email;
    if (!email_User) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Inicie sesión para continuar'
        });
        return;
    } else {
        await cartStore.addToCart(producto.value.id, amount.value, email_User);
        Swal.fire({
            icon: 'success',
            title: 'Producto agregado',
            text: 'El producto se ha agregado correctamente al carrito'
        });
    }
};

const formatoPesosColombianos = (valor) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(valor);
};

// ✅ Carga inicial
onMounted(async () => {
    producto.value = await SolicitarProductos(route.params.id);
    if (producto.value && producto.value.category) {
        await obtenerProductosSimilares(producto.value.category);
    }
    recibirdatos();
});

// ✅ Reaccionar a cambios en el ID del producto (cuando el usuario da clic en producto similar)
watch(
  () => route.params.id,
  async (nuevoId) => {
    producto.value = await SolicitarProductos(nuevoId);
    if (producto.value && producto.value.category) {
      await obtenerProductosSimilares(producto.value.category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' }); // opcional
  }
);
</script>



<style scoped>

.contedor_detalleProducto {
 background-color: #f1f0f0;
 display: grid;
 grid-template-columns: 2fr 1fr;
 gap: 50px;
 padding: 50px;
 align-items: center;
 padding-top: 120px;
 padding-bottom: 50px;
 height: 100vh;
}

.contenedor_img {
 background-color: #c5610300;
 padding: 20px;
 width: 100%;
 height: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
}

.contenedor_img img {
 min-width:auto; 
 max-width: 100%;
 height: auto;
 max-height: 450px;
 border-radius: 10px;
}

.producto_detalles{
     height: 90%;
     padding: 20px;
     background-color: #ffffff;
     border: 1px solid #ddd;
     border-radius: 5px;
     display: grid;
     grid-template-rows: 2fr 0.5fr;
 }

.producto_detalles h1 {
 font-size: 55px;
 letter-spacing: 2px;
 font-weight: bold;
 margin-bottom: 10px;
 color: #2e2d2d;
 text-transform: uppercase;
}

.producto_detalles h2 {
 font-size: 30px;
 font-family: Arial, Helvetica, sans-serif;
 color: #c56103;
 font-weight: bold;
 margin-bottom: 20px;
}

.producto_detalles p {
 font-size: 20px;
 color: #555;
 margin-bottom: 10px;
}

@media (max-width: 1024px) {
  .contedor_detalleProducto {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 40px 20px;
    height: auto;
  }

  .producto_detalles {
    height: auto;
    grid-template-rows: auto auto;
  }

  .producto_detalles h1 {
    font-size: 36px;
  }

  .producto_detalles h2 {
    font-size: 24px;
  }

  .producto_detalles p {
    font-size: 18px;
  }

  .botones_comprar {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .botones_comprar input {
    width: 100%;
  }
}


@media (max-width: 768px) {
    .contedor_detalleProducto {
    margin-top: 100px;
  }
  .contedor_detalleProducto {
    padding: 30px 15px;
  }

  .contenedor_img img {
    max-height: 300px;
  }

  .producto_detalles h1 {
    font-size: 28px;
  }

  .producto_detalles h2 {
    font-size: 20px;
  }

  .producto_detalles p {
    font-size: 16px;
  }

  .botones_comprar {
    flex-direction: column;
    gap: 8px;
  }

  .botones_comprar button {
    font-size: 16px;
    padding: 10px;
  }

  .botones_comprar input {
    font-size: 16px;
    padding: 8px;
  }
}
@media (max-width: 480px) {
  .producto_detalles h1 {
    font-size: 22px;
  }

  .producto_detalles h2 {
    font-size: 18px;
  }

  .producto_detalles p {
    font-size: 14px;
  }

  .botones_comprar button,
  .botones_comprar input {
    width: 100%;
    font-size: 14px;
  }
}




/* PRODUCTO SECTION */

.product-section,
.care-instructions {
  margin-top: 50px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  padding: 20px 0;
  flex-wrap: wrap; /* Permite ajustar en móviles */
}

.product-section div,
.care-instructions div {
  width: 80%;
  max-width: 900px;
}

.product-section h2,
.care-instructions h2 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.product-section p,
.care-instructions p,
.product-section ul li {
  font-size: 18px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
}

.product-section ul {
  list-style-type: disc;
  margin-left: 20px;
}

.socialMural-section {
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  padding: 40px 0;
  text-align: center;
}

.socialMural-section h2 {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  margin-bottom: 15px;
  font-size: 25px;
  color: #555;
}

.socialMural-section p {
  font-size: 18px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  width: 50%;
  max-width: 700px;
  color: #555;
}

@media (max-width: 768px) {

    .product-section,
    .care-instructions {
    margin-top: 0px;
    }

  .product-section div,
  .care-instructions div,
  .socialMural-section p {
    width: 90%;
  }

  .product-section h2,
  .care-instructions h2 {
    font-size: 24px;
  }

  .product-section p,
  .care-instructions p,
  .product-section ul li,
  .socialMural-section p {
    font-size: 16px;
  }

  .socialMural-section {
    padding: 30px 10px;
  }
}


/* SOCIAL SECTION */


/* SOCIAL SECTION */
.social-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-color: #f9f9f9;
  height: auto;
}

.socialIMG-mural {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 15px;
  width: 100%;
  max-width: 1400px;
}

.socialIMG-mural div img {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1; /* 👈 mantiene proporción cuadrada */
  object-fit: cover;
  border-radius: 8px;
}

/* Tablet (pantallas medianas) */
@media screen and (max-width: 1024px) {
  .socialIMG-mural {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
}

/* Móvil (pantallas pequeñas) */
@media screen and (max-width: 768px) {
  .socialIMG-mural {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .social-section {
    padding: 20px 10px;
  }
}

/* similar-section */


.similar-section{
 height: 100px;
 display: flex;
 justify-content: center;
 align-items: center;
 text-align: center;
 font-family: 'Helvetica Neue', Arial, sans-serif;

}
.similar-section h1{
 color: #2e2d2d;
 width: 92%;
 font-size: 30px;
}

.cont_P_relacionados {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* justify-content: center; 👈 esto hace que todo esté centrado incluso en horizontal scroll */
  margin-bottom: 40px;
  padding: 10px;
  gap: 25px;
}



 .botones_comprar {
 display: flex;
 gap: 20px;
 align-items: center;
}

.botones_comprar button {
 background-color: #000;
 color: #fff;
 padding: 15px 30px;
 font-size: 18px;
 border: none;
 cursor: pointer;
 transition: background-color 0.2s ease;
 border: 1px solid black;
}

.botones_comprar {
    display: flex;
    gap: 20px;
    align-items: center;
}

.botones_comprar button {
    background-color: #000;
    color: #fff;
    padding: 15px 30px;
    font-size: 18px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;
    border: 1px solid black;

}

.botones_comprar button:hover {
 background-color: #fcf4f4;
 color: black;
}

.botones_comprar input {
 width: 60px;
 height: 40px;
 font-size: 16px;
 text-align: center;
 border: 1px solid #ddd;
 border-radius: 5px;
}
.similar-section {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.similar-section h1 {
  color: #2e2d2d;
  width: 92%;
  font-size: 30px;
}

.cont_P_relacionados {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  padding: 10px;
  gap: 25px;
}

/* Responsive scroll en móviles */
@media screen and (max-width: 768px) {
  .cont_P_relacionados {
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    gap: 10px;
    padding: 10px 0 10px 20px; /* 👈 importante: padding-left */
  }

  .cont_P_relacionados::-webkit-scrollbar {
    display: none;
  }

  .cont_P_relacionados > * {
    flex: 0 0 auto;
    scroll-snap-align: start; /* 👈 mejor "start" en lugar de "center" */
    width: 80%;
    min-width: 250px; /* 👈 ajusta al tamaño de tus tarjetas */
  }

  .similar-section h1 {
    font-size: 24px;
  }
}

/* Adaptaciones para pantallas medianas y grandes */
@media (min-width: 769px) and (max-width: 1440px) {
  .similar-section h1 {
    font-size: 28px;
  }

  .cont_P_relacionados {
    padding: 20px;
  }
}

.ocultar-en-movil {
  display: block;
}

@media (max-width: 767px) {
  .ocultar-en-movil {
    display: none;
  }
}

</style>
