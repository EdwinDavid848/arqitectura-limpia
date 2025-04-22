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
				<h2 class="card_subtitle">{{ formatoPesosColombianos(producto.precio) }} </h2>
			</div>
			<p class="card_descripcion">{{ producto.descripcion }}</p>
			<button class="botoncard" @click="productoDetalles">Agregar al carrito</button>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    producto: Object
});

const formatoPesosColombianos = (valor) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(valor);
};

const productoDetalles = () =>{
    router.push({ name: 'solicitarProducto', params: {id: props.producto.id}})
}


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
	max-width: 40%;
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
		height: 240px; 
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
/* ... tu código existente arriba permanece igual ... */

@media (max-width: 1024px) {
	.mi_card_producto {
		width: 260px;
		height: 320px;
		margin: 10px;
	}
	.card_content {
		height: 160px;
		transform: translateY(60%);
		padding: 10px;
	}
	.card_content:hover {
		transform: translateY(0);
	}
	.card_header {
		flex-direction: column;
		align-items: flex-start;
		gap: 5px;
	}
	.card_title, .card_subtitle {
		font-size: 14px;
		max-width: 100%;
	}
	.card_descripcion {
		font-size: 13px;
		white-space: normal;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.botoncard {
		width: 100%;
		padding: 8px;
		font-size: 13px;
	}
}
@media (max-width: 600px) {
	.mi_card_producto {
		width: 230px;
		height: 300px;
		margin: 0px;
		padding: 15px;
	}

	.card_content {
		height: auto; /* Permite que se ajuste al contenido */
		transform: translateY(50%);
		padding: 10px;
		padding-bottom: 10px; /* Reduce el padding inferior */
	}

	.card_title, .card_subtitle {
		font-size: 13px;
	}

	.card_descripcion {
		font-size: 12px;
		white-space: normal;
	}

	.botoncard {
		font-size: 12px;
		padding: 7px;
		width: 100%;
		margin-top: 10px; /* Asegura que haya espacio superior */
	}
}

</style>
