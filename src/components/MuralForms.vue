<template>
    <!-- From Uiverse.io by gharsh11032000 -->
    <section class="ingresar-overlay" >
      <div class="ingresar-modal">
        <form @submit.prevent="submitForm">
            <div class="inputsect">
              <input type="text"  required="" v-model="title" class="input" >
              <label for="email" class="label">Titulo</label>
            </div>
            <div class="inputsect">
              <textarea name="textarea" id="textarea" rows="10" cols="50" required="" class="input" v-model="description"></textarea>
              <label for="textarea" class="label">Descripcion</label>
            </div>
            <div class="inputsect">
              <input type="file" @change="onFileChange" required />
            </div>
            <button class="btn-curso" type="submit">Submit</button>
            <button class="btn-curso" @click="$emit('close')">Cancelar</button>
          </form>
      </div>
    </section>  

</template>


<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue';
import Swal from 'sweetalert2';
import { AddPublications, editPublication } from '@/services/MuralServices';
import { useAuthStore } from '@/store/authStore';

const permisos= useAuthStore();
const props = defineProps({
  publications: Object // Recibe la clase a editar
});
const emit = defineEmits(['close', 'PubActualizada']);

// Variables reactivas para cada campo
const title = ref('');
const description = ref('');
const file = ref(null);

watch(() => props.publications, (newPublication) => {
  if (newPublication) {
    title.value = newPublication.titulo || '';
    description.value = newPublication.descripcion || '';
  }
}, { immediate: true });

// Capturar archivo seleccionado
const onFileChange = (event) => {
  file.value = event.target.files[0];
};

// Función para enviar los datos
const submitForm = async () => {
  try {
    const formData = new FormData();
    formData.append('email', permisos.user.email);
    formData.append("titulo", title.value);
    formData.append("descripcion", description.value);
    if (file.value) {
      formData.append("foto", file.value);
    }
    

    if(props.publications?.id){
      
        const data = {
        email : permisos.user.email,
        titulo : title.value,
        descripcion : description.value,
        foto : file.value,
      };

       await editPublication(props.publications.id, data);
      Swal.fire("Exito!", "Publicacion editada con exito");
      
      
    }else{
      await AddPublications(formData);
      console.log(permisos.user.email,title.value,description.value,file.value)
    }
      
      Swal.fire({
        icon: 'success',
        title: props.publications?.id ? 'Publicacion actualizada' : 'Publicacion agregada',
        text: 'Recargue la página para verificar'
      }).then(() => {
        window.location.reload();
    });

      emit('PubActualizada'); // Notificar actualización
      emit('close'); // Cerrar formulario
    
  } catch (error) {
    console.error('Error en la petición:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Verifique los datos e intente nuevamente.'
    });
    emit('close');
  }
};
</script>

<style scoped>
.ingresar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding:50px;
  background-color: rgba(0, 0, 0, 0.6); /* Fondo oscuro semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Encima de todo */
}

/* Contenedor del modal */
.ingresar-modal {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 15px;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  color: #070707;
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
}

/* Reutiliza los estilos de input, botón, etc. del ejemplo anterior */
.inputsect {
  position: relative;
  margin-bottom: 20px;
}

.input {
  width: 100%;
  background: #f1f0f0;
  border: 1px solid #555;
  border-radius: 5px;
  padding: 10px;
  color: #080808;
  outline: none;
}

.input:focus {
  border-color: #5b5fc7;
}

.label {
  position: absolute;
  top: -10px;
  left: 10px;
  background: #fafafa;
  color: #ff9837;
  font-size: 1rem;
  padding: 0 5px;
}



/* Animación de entrada */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.file-label {
  display: inline-block;
  font-size: 1rem;
  background: #fffefe;
  color: #e9a526;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.insertpub {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #0c0c0c;
}
.btn-curso {
    padding: 12px 25px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 30px;
    background: linear-gradient(90deg, #f7c200, #ec9513);
    color: white;
    cursor: pointer;
    border: none;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    margin-top: 25px;
    margin-left: 5px;
}

.btn-curso:hover {
    background: linear-gradient(90deg, #ec9513, #f7c200);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

</style>
