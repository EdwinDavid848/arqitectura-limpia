<script setup lang="ts">

</script>

<template>
    <div class="cont_part1_button">
        

        <!--
        <router-link class="link" :to="{ name: '/', params: { categoria: 'todos' } }">
            Ver todo
        </router-link> 
        -->
        <router-link  class="link" to="/tienda">Ver todo</router-link >
    </div>
</template>
<style scoped>
.cont_part1_button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* Estilos base del botón */
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
  width: auto;
  cursor: pointer;
}

/* Hover effect */
.cont_part1_button .link:hover {
  border-bottom: 2px solid black;
  text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.74);
}

@media (max-width: 768px) {
  .cont_part1_button {
    margin-bottom: 20px;
  }
  .cont_part1_button .link {
    font-size: 18px;

    }
}
</style>
