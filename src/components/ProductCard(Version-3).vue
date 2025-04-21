<template>
	<div class="card-container" >
		<div class="image-container">
			<img :src="producto.imagen_url" alt="Producto">
		</div>
		<div class="card-content">
			<div class="card-header">
				<h2 class="card-title">{{ producto.nombre }}</h2>
				<h2 class="card-price">{{ formatoPesosColombianos(producto.precio) }} $</h2>
			</div>
			<p class="card-description">{{ producto.descripcion }}</p>
			<button class="add-to-cart-button" @click="productoDetalles">Agregar al carrito</button>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
	producto: {
		type: Object,
		required: true
	},
	estilo: {
		type: String,
		required: true
	}
});

const router = useRouter();

const productoDetalles = () =>{
    router.push({ name: 'solicitarProducto', params: {id: props.producto.id}})
}

const formatoPesosColombianos = (valor) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(valor);
};


</script>

<style scoped>
.card-container {
	display: flex;
	align-items: center;
	padding: 20px;
	background-color: #f9f9f9;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	width: 90%;
	margin: 20px auto;
}

.image-container {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	height: auto;
}

.image-container img {
	width: 100%;
	height: auto;
	max-width: 400px;
	border-radius: 8px;
	object-fit: cover;
	min-height: 200px;
	max-height: 300px;
}


.card-content {
	flex: 2;
	padding-left: 20px;
}


.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}

.card-title {
	font-size: 24px;
	font-weight: bold;
	color: #333;
	margin: 0;
}

.card-price {
	font-size: 22px;
	color: #c56103;
	margin: 0;
}

.card-description {
	font-size: 16px;
	color: #666;
	margin-bottom: 20px;
}

.add-to-cart-button {
	padding: 10px 20px;
	background-color: #4caf50;
	color: white;
	border: none;
	border-radius: 5px;
	font-size: 16px;
	cursor: pointer;
	transition: background-color 0.3s;
}

.add-to-cart-button:hover {
	background-color: #45a049;
}
</style>
