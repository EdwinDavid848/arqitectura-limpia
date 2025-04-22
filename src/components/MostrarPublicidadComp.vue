<template>
    <section class="Mural">
      <div class="Mural_contenedor">
        <div class="mural">
          <div id="contenedor_img_principal" class="card">
            <img class="img_principal" src="@/assets/78950467_l_normal_none.jpg" alt="">
            <div id="inf_principal" class="inf">
              <h1>Mural</h1>
              <p>Descubre a más personas que como tú, son aficionados al tejido. Verás diseños creativos como estos en la sección del mural. Esta sección es para esta linda comunidad, ¡te invitamos a unirte a nosotros!</p>
              <router-link to="/mural">Saber más</router-link>
            </div>
          </div>
  
          <div class="contenedor_imagenes">
            <div class="card" v-for="(dato, index) in datos.slice(0, 6)" :key="dato.id || index">
              <img :src="dato.foto" alt="">
              <div class="inf">
                <h1>{{ dato.titulo }}</h1>
                <p>{{ dato.descripcion }}</p>
              </div>
            </div>
          </div>
  
        </div>
      </div>
    </section>
</template>
  
<script setup >
import { ref, onMounted } from "vue";
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
onMounted(() => {
    recibirdatos()
})
</script>
<style scoped>
    .Mural {
        display: flex;
        justify-content: center;
        align-items: center;
        height: auto;
        padding: 20px;
    }

    .Mural_contenedor {
        width: 90%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .mural {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 50px;
    }

    #contenedor_img_principal {
        height: auto;
        width: 100%;
    }

    .contenedor_imagenes {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        place-items: center;
        gap: 10px
    }

    .card {
        position: relative;
        display: flex;
        align-items: flex-end;
        height: 250px;
        width: min(100%, 250px);
        padding: 30px 25px;
        margin: 10px;
        border-radius: 20px;
        box-shadow: 0px 7px 10px rgb(0, 0, 0, 0.5);
        transition: all 1s;
    }

    .card:hover {
        transform: translateY(20px);
        transition: all 1s;
    }

    .card:after {
        content: "";
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 20px;
        background: linear-gradient(to bottom, rgba(88, 88, 87, 0.473), rgba(134, 134, 134, 0.445));
        opacity: 0;
        transition: all 0.5s;
    }

    .card:hover::after {
        opacity: 1;
    }

    .card > img {
        width: 100%;
        height: 100%;
        position: absolute;
        object-fit: cover;
        top: 0;
        left: 0;
        border-radius: 20px;
    }

    .card .inf {
        position: relative;
        z-index: 3;
        color: #ffffff;
        font-weight: 600;
        opacity: 0;
        transform: translateX(30px);
        transition: all 0.5s;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
    }

    .card:hover .inf {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.3s ease-in, transform 0.5s ease;
    }

    .card .inf h1 {
        font-size: 1.2rem;
        margin: 0;
        text-transform: uppercase;
    }

    .card .inf p {
        font-size: 15px;
    }

    .card .inf a {
        margin-top: 5px;
        text-decoration: none;
        color: #000000;
        font-size: 15px;
        transition: all 0.5s ease;
        padding: 5px;
        border-radius: 25px;
        box-shadow: 0px 7px 10px rgba(192, 118, 22, 0.5);
        background-color: #df7408f3;
        color: #fff;
    }

    .card .inf a:hover {
        box-shadow: 0px 7px 10px rgba(255, 255, 255, 0.5);
        background-color: #ffffff;
        color: #000000;
    }

    #inf_principal h1 {
        font-size: 30px;
    }

    #inf_principal p, #inf_principal a {
        font-size: 20px;
    }

    @media (min-width: 1441px) and (max-width: 1600px) {
        #contenedor_img_principal {
            height: auto;
            width: 90%;
        }
        .card {
        height: 250px;
        width: 250px;
    }
    }

    @media (max-width: 1440px) {
        .mural {
            grid-template-columns: 1fr; 
            gap: 20px;

        }

        #contenedor_img_principal {
            height: 250px;
            width: 95%;
            overflow: hidden; 
            position: relative;
            
        }

        .contenedor_imagenes {
            display: grid;
            gap: 10px;
            align-items: center;
            justify-content: center;
            grid-template-columns: repeat(3, 1fr);
            place-items: center;
            width: 100%;
        }

        .card {
            height: 250px;
            width: 80%;
            width: min(100%, 300px);
            padding: 30px 25px;
        }
        
        .card:hover {
            transform: translateY(10px);
            transition: all 1s;
        }

        .card > img {
        width: 100%;
        height: 100%;
        position: absolute;
        object-fit: cover;
        top: 0;
        left: 0;
        }
        

        .card .inf h1 {
            font-size: 1rem;
        }

        .card .inf p, .card .inf a {
            font-size: 14px;
        }

        #inf_principal h1 {
            font-size: 24px;
        }

        #inf_principal p, #inf_principal a {
            font-size: 18px;
            overflow: hidden;
        }
 
    }

    @media (max-width: 1024px) {
    .mural {
        grid-template-columns: 1fr;
        gap: 30px;
    }

    .contenedor_imagenes {
        grid-template-columns: repeat(2, 1fr);
    }

    #inf_principal h1 {
        font-size: 22px;
    }

    #inf_principal p, #inf_principal a {
        font-size: 16px;
    }

    .card .inf h1 {
        font-size: 0.9rem;
    }

    .card .inf p, .card .inf a {
        font-size: 13px;
    }
}

@media (max-width: 768px) {
    .contenedor_imagenes {
        grid-template-columns: 1fr;
    }

    .card {
        width: 90%;
        height: 220px;
    }

    .card .inf h1 {
        font-size: 0.85rem;
    }

    .card .inf p, .card .inf a {
        font-size: 12px;
    }

    #inf_principal h1 {
        font-size: 20px;
    }

    #inf_principal p, #inf_principal a {
        font-size: 15px;
    }
}

@media (max-width: 480px) {
    #contenedor_img_principal {
         margin: 0px;
    }
    .Mural_contenedor {
        width: 100%;
    }

    .card {
        height: 200px;
        padding: 20px;
    }

    .card .inf {
        align-items: center;
        text-align: center;
    }

    .card .inf h1 {
        font-size: 0.8rem;
    }

    .card .inf p, .card .inf a {
        font-size: 11px;
    }

    #inf_principal h1 {
        font-size: 18px;
        text-align: center;
    }

    #inf_principal p, #inf_principal a {
        font-size: 14px;
        text-align: center;
    }
}


@media (max-width: 768px) {
    .contenedor_imagenes {
        grid-template-columns: repeat(2, 1fr); /* Mostrar 2 en 2 */
        gap: 10px;
    }

    .card {
        width: min(100%, 160px); /* Ajusta el ancho de cada card */
        height: 200px;
        padding: 20px 15px;
    }

    .card .inf h1 {
        font-size: 0.9rem;
    }

    .card .inf p, .card .inf a {
        font-size: 12px;
    }

    #contenedor_img_principal {
        width: 100%;
        height: auto;
    }

    #inf_principal h1 {
        font-size: 20px;
    }

    #inf_principal p, #inf_principal a {
        font-size: 16px;
    }
}


</style>
