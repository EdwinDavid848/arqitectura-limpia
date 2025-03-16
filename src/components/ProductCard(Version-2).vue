<template>
	<div class="mi_card_producto" 
		:style="{
			backgroundImage: `url(${encodeURI(producto.imagen_url)})`,
			backgroundPosition: 'bottom center'
		}"
		>
		<div class="card_content">
			<div class="card_header">
				<h2 class="card_title">{{ producto.nombre }}</h2>
				<h2 class="card_subtitle">{{ producto.precio }} €</h2>
			</div>
			<p class="card_descripcion">{{ producto.descripcion }}</p>
			<button class="botoncard" @click="productoDetalles">Agregar al carrito</button>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    producto: Object
});

</script>

<style scoped>

.mi_card_producto {
	width: 350px;
	height: 350px; 
	border-radius: 20px;
	overflow: hidden;
	display: flex;
	align-items: flex-end;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: box-shadow 0.3s ease;
	color: white; 
	background-size: cover; 
	background-position: center; 
}
.card_content {
	padding: 15px;
	padding-bottom: 50px;
	position: relative;
	height: 180px;
	background-color: rgba(255, 255, 255, 0.7);
	color: #333;
	border-top-left-radius: 20px;
	cursor: pointer;
	transform: translateY(70%);
	transition: transform 0.3s ease;
	width: 100%;
	border: 1px solid rgba(0, 0, 0, 0.1);
	overflow: visible;


}
.card_content:hover {
	transform: translateY(0);
}
.card_header {
	display: flex;
	justify-content: space-around;
	align-items: flex-start;
	justify-content: flex-start;
	gap: 30px;
	margin-bottom: 25px;
}
.card_title {
	text-transform: uppercase;
	font-size: 18px; 
	font-weight: bold;
	color: #333;
	margin: 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 60%;
}
.card_subtitle {
	font-weight: bold;
	font-size: 18px;
	color: #c56103;
}
.card_descripcion {
	color: #666;
	margin-bottom: 1cm;
	line-height: 1.5em;
	min-height: 20px;
	white-space: nowrap;     
	overflow: hidden;
	text-overflow: ellipsis;
}
.botoncard {
	border-radius: 12px;
	padding: 10px 15px;
	background-color: #2bbd18;
	color: white;
	border: none;
	cursor: pointer;
	font-size: 14px;
	transition: background-color 0.3s ease;
}
.botoncard:hover {
	background-color: #d62828;
	box-shadow: 0 2px 10px rgba(230, 57, 70, 0.3);
}

@media (min-width: 1280px) and (max-width: 1440px) {
	.mi_card_producto{
		height: 240px; 
		width: 23%;
	}
}

@media (min-width: 1441px) and (max-width: 1600px) {
		.mi_card_producto {
		width: 22%;
		height: 200px; 
		border-radius: 20px;
		overflow: hidden;
		display: flex;
		align-items: flex-end;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		transition: box-shadow 0.3s ease;
		color: white; 
		background-size: cover; 
		background-position: center; 
	}
}

</style>