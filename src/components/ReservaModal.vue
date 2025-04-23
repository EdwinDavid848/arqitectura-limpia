<template>
  <section class="ingresar-overlay" v-if="agenda">
    <div class="ingresar-modal">
      <h1 class="insertpub">Agendar Clase</h1>

      <VueCal
        locale="es"
        :disable-views="['years', 'year', 'days', 'day', 'weeks', 'week']"
        :disable-days="disableDays"
        @cell-click="seleccionarFecha"
      />

      <p style="color: white;">Fecha seleccionada: {{ fechaSeleccionada }}</p>

      <button @click="AgregarReserva()" class="btn-curso">Reservar</button>
      <button class="btn-curso" @click="$emit('closeForm')">Cancelar</button>
    </div>
  </section>
</template>


<script setup>
import { ref, computed, watch, defineProps, defineEmits, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { AddReservaciones } from '@/services/ReservationClassServices';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { useAuthStore } from '@/store/authStore';

const permisos=useAuthStore();

const props = defineProps({
  clase: Object,
  visible: Boolean
});

const emit = defineEmits(['closeForm']);
const agenda = ref(props.visible);

// Ejecuta el watch inmediatamente si hay datos disponibles

watch(() => props.visible, (newValue) => {
  agenda.value = newValue;
  
}); 

watch(() => props.clase, (newClase) => {
  if (newClase && newClase.fecha) {
    clase.value = { fecha: newClase.fecha };
    calcularDiasPermitidos();
  }
}, { immediate: true }); // Ejecuta el watch inmediatamente si hay datos disponibles


// Día de la semana en que se imparte la clase (Ejemplo: "Martes")
const clase = ref(props.clase ? { fecha: props.clase.fecha } : { fecha: null }); 
const diasPermitidos = ref([]); // Aquí guardaremos las fechas habilitadas
const fechaSeleccionada = ref(null);

// Función para obtener el índice del día (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
const getDayIndex = (dayStr) => {
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return daysOfWeek.indexOf(dayStr);
};

// Calcular qué días del mes actual coinciden con el día de la clase
const calcularDiasPermitidos = () => {
  const hoy = new Date(); // Fecha actual
  const mesActual = hoy.getMonth(); // Obtener el mes actual
  const year = hoy.getFullYear(); // Año actual
  const dayIndex = getDayIndex(clase.value.fecha); // Índice del día de la clase

  const fechas = [];
  for (let dia = 1; dia <= 31; dia++) {
    const fecha = new Date(year, mesActual, dia); // Crear una fecha con cada día del mes
    if (fecha.getMonth() !== mesActual) break; // Evita agregar días de otro mes
    if (fecha.getDay() === dayIndex) { 
      fechas.push(fecha.toISOString().split('T')[0]); // Formato "YYYY-MM-DD"
    }
  }
  diasPermitidos.value = fechas;
};

// Ejecutar la función para calcular los días válidos
calcularDiasPermitidos();

// Computed property para desactivar días no válidos en el calendario
const disableDays = computed(() => {
  const allDays = [0, 1, 2, 3, 4, 5, 6]; // Domingo (0) a Sábado (6)
  const dayIndex = getDayIndex(clase.value.fecha); // Índice del día de la clase

  return allDays.filter((day) => day !== dayIndex); // Deshabilita todos menos el día permitido
});



// Función para manejar la selección de fecha
const seleccionarFecha = (date) => {
  fechaSeleccionada.value = date; // Guardamos la fecha elegida
  console.log("Fecha seleccionada:", fechaSeleccionada.value);
};

const AgregarReserva = async () => {
  try {
    
    const fechaISO = new Date(fechaSeleccionada.value).toISOString().split('T')[0];
    await AddReservaciones(props.clase.titulo, permisos.user.email, fechaISO);
    console.log(props.clase.titulo, permisos.user.email, fechaISO)
    Swal.fire({ icon: 'success', title: 'Reservación exitosa', text: 'Clase reservada el dia', fechaISO }).then(() => {
          window.location.reload(); // 🔄 Recargar la página después de eliminar
        });  
    emit('closeForm');
    
  } catch (error) {
    agenda.value=false
    console.error(error);
  }
};
onMounted(async () => {
  
  if (!permisos.isAuthenticated) {
        console.log("Acceso denegado, redirigiendo al login...");
      }else{
        permisos.fetchUserInfo();
      }
});
</script>



<style scoped>
.ingresar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.301); /* Fondo oscuro semi-transparente */
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
  
