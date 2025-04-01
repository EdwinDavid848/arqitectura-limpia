<template>
    <!-- From Uiverse.io by gharsh11032000 -->
    <section class="ingresar-overlay" >
      <div class="form-container" >
          <form class="form" @submit.prevent="submitForm">
            <div class="form-group">
              <label for="email">Titulo</label>
              <input type="text" id="email" name="email" required="" v-model="title">
            </div>
            <div class="form-group">
              <label for="textarea">Descripcion</label>
              <textarea name="textarea" id="textarea" rows="10" cols="50" required="" v-model="description"></textarea>
            </div>
            <div class="form-group">
              <input type="file" @change="onFileChange" required />
            </div>
            <button class="form-submit-btn" type="submit">Submit</button>
          </form>
      </div>
    </section>  

</template>


<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue';
import Swal from 'sweetalert2';
import { AddPublications, editPublication } from '@/services/MuralServices';

const props = defineProps({
  publications: Object // Recibe la clase a editar
});
const emit = defineEmits(['close', 'PubActualizada']);

// Variables reactivas para cada campo
const email = ref('david@gmail.com');
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
    formData.append('email', email.value);
    formData.append("titulo", title.value);
    formData.append("descripcion", description.value);
    if (file.value) {
      formData.append("foto", file.value);
    }
    

    if(props.publications?.id){
      
        const data = {
        email : email.value,
        titulo : title.value,
        descripcion : description.value,
        foto : file.value,
      };

       await editPublication(props.publications.id, data);
      Swal.fire("Exito!", "Publicacion editada con exito");
      
      
    }else{
      await AddPublications(formData);
      console.log(email.value,title.value,description.value,file.value)
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

/**diseño de form */
/* From Uiverse.io by gharsh11032000 */ 
.ingresar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Fondo oscuro semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Encima de todo */
}
.form-container {
  width: 400px;
  background: linear-gradient(#212121, #212121) padding-box,
              linear-gradient(145deg, transparent 35%,#e81cff, #40c9ff) border-box;
  border: 2px solid transparent;
  padding: 32px 24px;
  font-size: 14px;
  font-family: inherit;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  border-radius: 16px;
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
}

.form-container button:active {
  scale: 0.95;
}

.form-container .form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-container .form-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.form-container .form-group label {
  display: block;
  margin-bottom: 5px;
  color: #717171;
  font-weight: 600;
  font-size: 12px;
}

.form-container .form-group input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  color: #fff;
  font-family: inherit;
  background-color: transparent;
  border: 1px solid #414141;
}

.form-container .form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  resize: none;
  color: #fff;
  height: 96px;
  border: 1px solid #414141;
  background-color: transparent;
  font-family: inherit;
}

.form-container .form-group input::placeholder {
  opacity: 0.5;
}

.form-container .form-group input:focus {
  outline: none;
  border-color: #e81cff;
}

.form-container .form-group textarea:focus {
  outline: none;
  border-color: #e81cff;
}

.form-container .form-submit-btn {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  align-self: flex-start;
  font-family: inherit;
  color: #717171;
  font-weight: 600;
  width: 40%;
  background: #313131;
  border: 1px solid #414141;
  padding: 12px 16px;
  font-size: inherit;
  gap: 8px;
  margin-top: 8px;
  cursor: pointer;
  border-radius: 6px;
}

.form-container .form-submit-btn:hover {
  background-color: #fff;
  border-color: #fff;
}




</style>