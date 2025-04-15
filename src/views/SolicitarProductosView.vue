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
         <div>
             <img src="@/assets/Producto 1 part1.jpeg" alt="">
         </div>
         <div>
             <img src="@/assets/Producto 1 part1.jpeg" alt="">
         </div>
         <div>
             <img src="@/assets/Producto 1 part1.jpeg" alt="">
         </div>
         <div>
             <img src="@/assets/Producto 1 part1.jpeg" alt="">
         </div>
         <div>
             <img src="@/assets/Producto 1 part1.jpeg" alt="">
         </div>
         <div>
             <img src="@/assets/Producto 1 part1.jpeg" alt="">
         </div>
     </div>
 </div>
 <div class="similar-section">
     <h1>Productos Similares</h1>
 </div>
 <div class="cont_P_relacionados">
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


.product-section {
 margin-top: 50px;
 height: 300px;
 display: flex;
 align-items: flex-start;
 justify-content: center;
 font-family: 'Helvetica Neue', Arial, sans-serif;

}
.product-section div{
 width:80%;
}

.product-section h2 {
 font-size: 32px;
 font-weight: bold;
 margin-bottom: 15px;
 color: #333;
}

.product-section p {
 font-size: 20px;
 color: #555;
 line-height: 1.6;
 margin-bottom: 20px;
}

.product-section ul {
 list-style-type: disc;
 margin-left: 20px;
 margin-bottom: 20px;
}

.product-section ul li {
 font-size: 20px;
 color: #333;
 margin-bottom: 10px;
}

.care-instructions {
 height: 200px;
 margin-top: 30px;
 display: flex;
 align-items: center;
 justify-content: center;
 font-family: 'Helvetica Neue', Arial, sans-serif;

}
.care-instructions div{
 width:80%;
}

.care-instructions h2 {
 font-size: 29px;
 font-weight: bold;
 margin-bottom: 10px;
 color: #333;
}

.care-instructions p {
 font-size: 20px;
 color: #555;
 line-height: 1.6;
}
.socialMural-section{
 background-color: #f9f9f9;

 display: flex;
 align-items: center;
 justify-content: flex-end;
 flex-direction: column;
 height: 150px;
}
.socialMural-section h2{
 font-family: 'Helvetica Neue', Arial, sans-serif;
 margin-bottom: 20px;
 font-size: 25px;
 color: #555;

}
.socialMural-section p{
 font-size: 20px;
 font-family: 'Helvetica Neue', Arial, sans-serif;
 width: 50%;
 text-align: center;
 color: #555;

}

.social-section{
 display: flex;
 align-items: flex-start;
 justify-content: center;
 margin-bottom: 30px;
 background-color: #f9f9f9;
 height: auto;
 height: 400px;

}
.socialIMG-mural{
 display: grid;
 grid-template-columns: repeat(6, 1fr);
 align-items: center;
 justify-content: center;
 gap: 15px;
 width: 80%;
 height: 300px;
}
.socialIMG-mural div img{
 width: 100%;
 height: 240px;
}
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

.cont_P_relacionados{
     display: flex;
     flex-wrap: wrap;
     align-items: center;
     justify-content: center;
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

</style>
