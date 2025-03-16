<template>
    <button type="submit" class="Enviar_btn">
        {{ props.buttonText  }}
    </button>
</template>
  
<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({ buttonText: String });

</script>
  
<style scoped>



.Enviar_btn {
  width: 100%;
  position: relative;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #ffd700; 
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 5px;
  transition: 0.3s;
}
.Enviar_btn:hover{
  background-color: #f4a300;

}
.Enviar_btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Estilo del spinner */
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Animación del spinner */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


</style>
  