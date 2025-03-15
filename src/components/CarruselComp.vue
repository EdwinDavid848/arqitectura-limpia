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
  .contendorPrincipal{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e2dfdf56;
  }
  .carrusel_Principal {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: center;
    justify-content: center;
    height: auto;
    width: 90%;
    padding: 50px;
  }
  
  .carousel {
    position: relative;
    overflow: hidden;
    border-radius: 25px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 90%;
  }
  
  .carousel-inner {
    display: flex;
    transition: transform 0.5s ease;
    width: 100%;
  }
  
  .carousel-item {
    height: auto;
    min-width: 100%;
  }
  
  .carousel-item img {
    width: 100%;
    height: 450px;
      object-fit: cover;
  }
  
  .carousel-control-prev,
  .carousel-control-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0);
    border: none;
    font-size: 30px;
    cursor: pointer;
  }
  
  .carousel-control-prev {
    left: 10px;
  }
  
  .carousel-control-next {
    right: 10px;
  }
  
  .carrusel_texto {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    height: 450px;
    overflow: hidden;
  }
  
  .carrusel_texto h2 {
    font-size: 40px;
    font-family: 'Playfair Display', serif;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
  
  .carrusel_texto p {
    font-size: 20px;
    line-height: 1.6;
    text-align: justify;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-weight: none;
    color: #5c5a5a;
  }
  
  
  @media (min-width: 1280px) and (max-width: 1440px) {
      .carrusel_Principal {
        padding: 20px;
    }
    .carousel{
      height: 100px;
      border: 1px solid rgba(48, 46, 46, 0.555);
    }
      .carousel-item {
      min-width: 100%;
      height: 100%;
    }
    .carousel-item img {
      object-fit: cover;
    }
    .carrusel_texto p {
      font-size: 10px;
      line-height: 1.2;
    }
      .carrusel_texto {
        overflow: hidden;
        height: 300px;
  
    }
  
  }
  
  @media (max-width: 1440px) {
    .carrusel_Principal {
      padding: 20px;
    }
  
    .carrusel_texto h2 {
      font-size: 40px; 
    }
  
    .carrusel_texto p {
      font-size: 18px; 
    }
  
    .carousel {
      height: 85%;
    }
  
    .carousel-item {
      min-width: 100%;
      height: 300px;
    }
  
    .carousel-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  
    .carrusel_texto p {
      font-size: 19px;
    }
  
  
  }
  
  @media (min-width: 1441px) and (max-width: 1600px) {
    .carrusel_Principal {
      padding: 20px;
      height: 90vh;
    }
  
    .carrusel_texto h2 {
      font-size: 45px; 
      margin-bottom: 20px;
    }
  
    .carrusel_texto p {
      font-size: 22px; 
    }
    .carrusel_texto {
      height: 450px;
      background-color: rgba(255, 255, 255, 0.9);
  
  
    }
  
    .carousel {
      width: auto;
      height: 450px;
    }
  
    .carousel-item {
      min-width: 100%;
      
    }
  
  
    .carousel-item img {
      width: 100%;
      height: 450px;
      object-fit: cover;
    }
  
  
  
    .carrusel_texto {
      height: 450px;
      overflow: hidden;
    }
  
  }
  
  
  
  
  </style>
  