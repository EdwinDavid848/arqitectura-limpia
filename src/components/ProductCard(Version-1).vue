<template>
    <div v-if="producto" @click="productoDetalles" class="card_part1">
        <img :src="producto.imagen_url" alt="Producto">
        <div class="card_text1">
            <h2>{{ producto.nombre }}</h2>
            <h3>$ {{ producto.precio }}</h3>
        </div>
    </div>
</template>


<style scoped> 
    .card_part1{
        height: 550px;
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 20px;
        padding: 10px;
        transition: background-color 0.5s ease; 
        background-color: rgba(212, 212, 212, 0.37);

    }
    .card_part1:hover{
        background-color: rgba(219, 215, 215, 0);
    }
    .card_text1{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        letter-spacing: 3px;
        font-family: 'Playfair Display', serif; 
    }
    .card_text1 h2{
        font-family: sans-serif;        
        letter-spacing: 3px;
        font-size: 20px;
        color: black;
    }
    .card_text1 h3{
        color: rgb(90, 89, 88);
    }
    .cont_part1 img{
        height: 80%;
    }


    @media (min-width: 1280px) and (max-width: 1440px) {
        .card_part1{
            height: 400px;
            width: 30%;
        }
}

@media (min-width: 1441px) and (max-width: 1600px) {
    .card_part1{
        height: 450px;
        width: 30%;

    }
}

 
</style>


<script setup>
import { defineProps } from 'vue';

defineProps({
    producto: Object
});
/*
import { defineProps } from 'vue';

const router = useRouter();

const props = defineProps({
    productos: {
        type: Object,
        required: true
    }
});

// ✅ Ahora utilizamos 'router' y 'props' en la función para que no haya error
const productoDetalles = () => {
    router.push({ name: 'Reservar_Producto', params: { id: props.productos.id } });
};
*/
</script>