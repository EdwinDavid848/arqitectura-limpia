<template>
    <div class="cont-info">
    <img src="@/assets/perfil.png" alt="Imagen de perfil" />
    <div >
        <h1>{{ nombre ?? 'Usuario' }}</h1>
        <h2>{{ rol ?? 'Sin rol' }}</h2>
    </div>
    </div>
  
    <div class="cont-datos" @click="closeEditing">
      <div>
        <img src="@/assets/icons/correo-electronico.png" alt="Correo electrónico"/>
        <input v-if="editField === 'email'" v-model="tempData.email" @keyup.enter="updateFieldHandler('email')" @click.stop type="text"/>
        <p >{{ email }}</p>
        <div class="image-editar">
          <img src="@/assets/icons/editar-texto.png" class="img_editar" alt="Editar" @click.stop="startEditing('email', email)"/>
        </div>
      </div>
  
      <div>
        <img src="@/assets/icons/telefono.png" alt="Teléfono"/>
        <input  v-if="editField === 'telefono'"  v-model="tempData.telefono"  @keyup.enter="updateFieldHandler('telefono')"  @click.stop  type="text"/>
        <p v-else-if="telefono && telefono.trim() !== ''">{{ telefono }}</p>
        <p v-else>Agrega Numero Telefonico</p>
        <div class="image-editar">
          <img 
            src="@/assets/icons/editar-texto.png" 
            class="img_editar" 
            alt="Editar" 
            @click.stop="startEditing('telefono', telefono)"/>
        </div>
      </div>
      
      <div>
      <img src="@/assets/icons/cerrar.png" alt="Contraseña"/>
      <p>**********</p>
      <div  class="image-editar" id="image-editar" @click="mostrarUptadePassword = true">
        <div>
            <img src="@/assets/icons/cerrar.png" alt="Contraseña"/>
          <button class="btn-actualizar-password">
            Actualizar Contraseña
          </button>
        </div>
      </div>
    </div>
          <div>
        <img src="@/assets/icons/personas.png" alt="Rol"/>
        <p>{{ rol }}</p>
      </div>
  </div>
    <div v-if="rol == 'administrador'" class="opciones-administrador">
      <select v-model="opcionSelecionada" @change="direcionarPag">
        <option value="" disabled selected>Opciones de Administrador</option>
        <option v-for="option in opcionesAdministrador" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>
  
    <div v-if="mostrarUptadePassword" class="conten_uptadePaswword">
      <div class="modal">
        <button class="modal-close" @click="mostrarUptadePassword = false">X</button>
        <h2>Actualizar Contraseña</h2>
        <p>Ingresa tu contraseña actual y la nueva contraseña para actualizarla.</p>
        <div>
          <label>Contraseña Actual</label>
          <input
            v-model="tempData.originalPassword"
            type="password"
            placeholder="Ingresa tu contraseña actual"
          />
        </div>
        <div>
          <label>Nueva Contraseña</label>
          <input
            v-model="tempData.password"
            type="password"
            placeholder="Ingresa tu nueva contraseña"
          />
        </div>
        <section>
          <button @click="updatePasswordHandler">Actualizar Contraseña</button>
          <button style="background-color:transparent; color: rgb(216, 33, 33);" @click="mostrarUptadePassword = false">Cancelar</button>
        </section>
      </div>

    </div>
</template>
  
<script setup>
import { ref,defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { updateField,updatePassword } from '@/services/perfilService';
import Swal from 'sweetalert2';


const props = defineProps({
  nombre: String,
  email: String,
  rol: String,
  telefono: String,
  password: String,
});

const router = useRouter();
const opcionSelecionada = ref('');
const opcionesAdministrador = ref(['Inventario Productos', 'Permisos de rol']);

const rutas = ref({
  "Inventario Productos": '/inventario_productos',
  "Permisos de rol": '/PermisosRol'
});

const direcionarPag = () => {
  if (opcionSelecionada.value) {
    const route = rutas.value[opcionSelecionada.value];
    if (route) {
      router.push(route);  
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ruta no encontrada para la opción seleccionada.',
      });
    }
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Advertencia',
      text: 'Por favor, selecciona una opción válida.',
    });
  }
};

const editField = ref(null);
const tempData = ref({
  email: '',
  telefono: '',
  password: '',
  originalPassword: '',
});
const mostrarUptadePassword = ref(false);

const startEditing = (field, value) => {
  editField.value = field;
  tempData.value[field] = value;
};

const closeEditing = () => {
  editField.value = null;
};

const updateFieldHandler = (field) => {
  let value = tempData.value[field];

  if (field === 'telefono') {
    // Eliminar espacios y todo lo que no sea número
    const cleanedValue = value.replace(/\D/g, '');

    if (cleanedValue.length !== 10) {
      Swal.fire({
        icon: 'error',
        title: 'Número inválido',
        text: 'El número de teléfono debe tener exactamente 10 dígitos.',
      });
      return;
    }

    // Actualizamos el campo con el valor limpio
    tempData.value[field] = cleanedValue;
  }

  updateField(props.email, field, tempData.value[field]);
  editField.value = null;
};


const updatePasswordHandler = () => {
  updatePassword(props.email, tempData.value.originalPassword, tempData.value.password);
};
</script>



<style>
    .cont-info{
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 200px;
        gap: 20px
    }
    .cont-info img{
        height:150px;
        width: 150px;
        border-radius: 50%;
        margin-left: 30px;
        box-shadow: 3px 6px 10px rgba(0, 0, 0, 0.1);

    }

    .cont-info div h2{
        background-color: rgb(240, 159, 10);
        border-radius: 25px;
        padding: 5px 15px;
        text-align: center;
        color: rgb(255, 255, 255);
        font-size: 20px;
    }

    .cont-datos{
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: auto;
    }
    .image-editar{
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      padding-right: 20px;
    }
    .cont-datos div{
        display: flex;
        flex-direction: row;
        align-items: center;
        height: auto;
        gap: 20px;
        min-width: auto;
    }
    .cont-datos div img{
        height: 25px;
        margin-left: 30px;
    }
    .cont-datos div p{
        font-size: 22px;
        min-width: 60%;
        width: auto;
        font-weight: bold;
        color: rgb(0, 0, 0);
    }
    .cont-datos div input{
      padding: 5px;
      border-radius: 25px;
      font-size: 22px;
      font-weight: bold;
      text-align: center;
      background-color: #1d1a1a;
      border: 1px solid rgb(211, 208, 201);
      color: rgb(255, 255, 255);
    }
    #actulizar_password{
        background-color: rgba(221, 233, 229, 0.562);
        text-align: center;
        color: rgb(0, 0, 0);
    }
    .botton-password{
      background-color: rgba(230, 141, 7, 0.288);
      padding: 5px;
      border: 1px solid black;

    }


  #image-editar div{
    padding: 5px 10px;
    transition: all 0.3s ease
  }
  #image-editar div:hover{
    background-color: rgb(247, 225, 186);
    color: rgb(204, 78, 6);
    border-radius: 10px;

  }
  .btn-actualizar-password{
    background-color: transparent;
    border: none;
    color: rgb(110, 42, 2);
    font-size: 15px;
    font-weight: bold;
  }

  .conten_uptadePaswword {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: rgba(0, 0, 0, 0.5);
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  text-align: start;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

}

.modal h2 {
  margin-bottom: 5px;
  font-size: 28px;
  color: rgb(255, 255, 255);
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.modal p{
  color: #ffffff;
  font-size: 20px;
}
.modal div{
  display: flex;
  gap: 10px;
  flex-direction: column;
  margin-top: 20px;

}
.modal div label{
  font-size: 20px;
  color: rgb(255, 255, 255);
}
.modal div input{
  padding: 12px;
  border-radius: 5px;
  border: 2px solid #ccc;
  background: rgba(255, 255, 255, 0.8);
}



.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
.modal section{
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 10px;
  height: 100px;
}

.modal button {
  margin-top: 10px;
  font-weight: bold;
  font-size: 15px;
  padding: 15px 15px;
  border: none;
  background-color: #ffd700; 
  color: rgb(0, 0, 0);
  border-radius: 5px;
  cursor: pointer;
}

.opciones-administrador{
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.opciones-administrador select{
  width: 90%;
  padding: 15px;
  border-radius: 5px;
  background-color:rgb(245, 187, 27) ;
  border: 3px solid rgb(245, 187, 27);
  font-size: 15px;
  font-weight: bold;
}
.img_editar{
  border: 3px solid transparent; /* Borde transparente inicialmente */
  border-radius: 10px; /* Esquinas redondeadas */
  transition: transform 0.3s ease, border-color 0.3s ease; 
  cursor: pointer;
}

.img_editar:hover {
  transform: scale(1.1); /* Aumenta el tamaño de la imagen al 110% */
  border-color: #ff6600; /* Cambia el color del borde (puedes usar cualquier color) */
}
</style>
