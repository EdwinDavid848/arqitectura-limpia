<template>
  <div id="app">
    <Header/>
    <router-view /> 
    <CarritoView/>
    <Footer/>
  </div>
</template>

<script setup>
import Header from './layouts/HeaderLayouts.vue';
import Footer from './layouts/FooterLayouts.vue';
import CarritoView from './views/CarritoView.vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #070707;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
