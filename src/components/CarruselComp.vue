<template>
    <div class="contendorPrincipal">
      <div class="carrusel_Principal">
        <div class="carousel">
          <div class="carousel-inner" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div class="carousel-item" v-for="(image, index) in images" :key="index">
              <img :src="image" alt="Imagen de producto" />
            </div>
          </div>
          <button class="carousel-control-prev" @click="prevSlide">⟨</button>
          <button class="carousel-control-next" @click="nextSlide">⟩</button>
        </div>
        <div class="carrusel_texto">
          <h2>PRODUCTOS</h2>
          <p>
            Los productos de tejidos hechos a mano son piezas creadas artesanalmente mediante técnicas de tejido que requieren destreza y paciencia, donde se utilizan hilos, lanas, cuerdas u otros materiales para entrelazarlos de forma meticulosa. Estos productos no solo reflejan la creatividad y el talento de quienes los confeccionan, sino que también conservan el valor de la tradición y la cultura de diversas regiones del mundo. Entre las técnicas más populares para crear tejidos a mano se encuentran el crochet (o ganchillo), que se realiza con una aguja de gancho, y el tejido a dos agujas (o tricot), en el que se usan dos agujas rectas o circulares para formar los puntos.         </p>
        </div>
    </div>
    </div>
</template>
  
  <script>
  import img1 from '@/assets/Producto 1 part1.jpeg';
  import img2 from '@/assets/Producto 1 part2.jpeg';
  import img3 from '@/assets/Producto 2 part1.jpeg';
  import img4 from '@/assets/Producto 2 part2.jpeg';
  import img5 from '@/assets/Producto 3 part1.jpeg';
  import img6 from '@/assets/Producto 3 part2.jpeg';
  
  export default {
    name: 'Carrusel_Componente',
    data() {
      return {
        images: [img3, img4,img1, img2, img5, img6],
        currentIndex: 0,
      };
    },
    methods: {
      nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      },
      prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      },
    },
  };
  </script>

<style scoped>
.contendorPrincipal {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e2dfdf56;
  padding: 20px;
}

.carrusel_Principal {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

.carousel {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 250px;
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
  height: 100%;
}

.carousel-item {
  flex: 0 0 100%;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-control-prev,
.carousel-control-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  font-size: 2rem;
  cursor: pointer;
  padding: 0 10px;
  border-radius: 50%;
  z-index: 10;
}

.carousel-control-prev {
  left: 10px;
}
.carousel-control-next {
  right: 10px;
}

.carrusel_texto {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.carrusel_texto h2 {
  font-size: 6vw;
  font-family: 'Playfair Display', serif;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 10px;
}

.carrusel_texto p {
  font-size: 4vw;
  line-height: 1.6;
  text-align: justify;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: #5c5a5a;
}

/* Tablet: layout en columnas */
@media (min-width: 768px) {
  .carrusel_Principal {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .carousel {
    height: 400px;
    width: 60%;
  }

  .carrusel_texto {
    width: 40%;
    height: 400px;
    text-align: left;
  }

  .carrusel_texto h2 {
    font-size: 2rem;
  }

  .carrusel_texto p {
    font-size: 1rem;
  }
}

/* Desktop grande */
@media (min-width: 1200px) {
  .carrusel_texto h2 {
    font-size: 2.5rem;
  }

  .carrusel_texto p {
    font-size: 1.2rem;
  }

  .carousel {
    height: 450px;
  }

  .carrusel_texto {
    height: 450px;
  }
}
</style>
