<template>
  <section class="ingresar-overlay">
    <div class="ingresar-modal">
      <h1 class="insertpub">Agregar Clase</h1>
      <form @submit.prevent="submitForm">
        <!-- Título -->
        <div class="inputsect">
          <input v-model="title" required type="text" class="input" />
          <label class="label">Título</label>
        </div>

        <!-- Descripción -->
        <div class="inputsect">
          <input v-model="description" required type="text" class="input" />
          <label class="label">Descripción</label>
        </div>

        <!-- Profesor -->
        <div class="inputsect">
          <input v-model="teacher" required type="text" class="input" />
          <label class="label">Profesor</label>
        </div>

        <!-- Día -->
        <div class="inputsect">
          <select v-model="date" required class="input">
            <option disabled value="">Selecciona un día</option>
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
          </select>
          <label class="label">Día</label>
        </div>

        <!-- Hora de inicio -->
        <div class="inputsect">
          <input v-model="horacomienzo" required type="time" class="input" />
          <label class="label">Hora que comienza</label>
        </div>

        <!-- Hora de fin -->
        <div class="inputsect">
          <input v-model="horafinal" required type="time" class="input" />
          <label class="label">Hora que finaliza</label>
        </div>

        <!-- Precio -->
        <div class="inputsect">
          <input v-model="price" required type="number" class="input" />
          <label class="label">Precio</label>
        </div>

        <!-- Imagen -->
        <div class="form-group">
          <input type="file" @change="onFileChange" required />
        </div>

        <!-- Botón para guardar -->
        <button class="btn-curso" type="submit">Guardar Cambios</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import Swal from 'sweetalert2';
import { AddClass, EditClass } from '@/services/ClassServices';

const props = defineProps({
  clase: Object // Recibe la clase a editar
});
const emit = defineEmits(['closeForm', 'claseActualizada']);

// Variables reactivas para cada campo
const title = ref('');
const description = ref('');
const teacher = ref('');
const date = ref('');
const horacomienzo = ref('');
const horafinal = ref('');
const price = ref();
const file = ref(null);

// Llenar los campos si se está editando una clase
watch(() => props.clase, (newClase) => {
  if (newClase) {
    title.value = newClase.titulo || '';
    description.value = newClase.descripcion || '';
    teacher.value = newClase.profesor || '';
    date.value = newClase.fecha || '';
    horacomienzo.value = newClase.comienzo || '';
    horafinal.value = newClase.final || '';
    price.value = newClase.precio || '';
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
    formData.append("titulo", title.value);
    formData.append("descripcion", description.value);
    formData.append("profesor", teacher.value);
    formData.append("fecha", date.value);
    formData.append("comienzo", horacomienzo.value);
    formData.append("final", horafinal.value);
    formData.append("precio", price.value);
    if (file.value) {
      formData.append("imagen", file.value);
    }

    let response;
  if (props.clase?.id) {
      // Si la clase tiene ID, se actualiza
    try {
    const data = {
      titulo: title.value,
      descripcion: description.value,
      profesor: teacher.value,
      fecha: date.value,
      comienzo: horacomienzo.value,
      final: horafinal.value,
      precio: price.value,
      imagen: file.value, // Asegurar que `image.value` tenga el archivo correcto
    };

    response=await EditClass(props.clase.titulo, data);  
    Swal.fire("Éxito", "Clase actualizada correctamente", "success");
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar la clase", "error");
    }
  } else {
      // Si no hay ID, se agrega una nueva clase
      response = await AddClass(formData);
    }

    if (response && response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: props.clase?.id ? 'Clase actualizada' : 'Clase agregada',
        text: 'Recargue la página para verificar'
      }).then(() => {
        window.location.reload();
      });

      emit('claseActualizada'); // Notificar actualización
      emit('closeForm'); // Cerrar formulario
    } else {
      throw new Error('Error en la respuesta');
    }
  } catch (error) {
    console.error('Error en la petición:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Verifique los datos e intente nuevamente.'
    });
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
  background-color: rgba(0, 0, 0, 0.6); /* Fondo oscuro semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Encima de todo */
}

/* Contenedor del modal */
.ingresar-modal {
  background-color: #252525;
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  color: #fff;
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
  background: #333;
  border: 1px solid #555;
  border-radius: 5px;
  padding: 10px;
  color: #fff;
  outline: none;
}

.input:focus {
  border-color: #5b5fc7;
}

.label {
  position: absolute;
  top: -10px;
  left: 10px;
  background: #252525;
  color: #d69457;
  font-size: 0.8rem;
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
  background: #333;
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
  color: #ffffff;
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
}

.btn-curso:hover {
    background: linear-gradient(90deg, #ec9513, #f7c200);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

    
</style>