<template>
  <div class="box gradDynamic">
    <h2 class="section-title">Usuarios</h2>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Nombre del usario o correo"
      class="search-bar"
      @input="filterUsuarios"
    />

    <table v-if="Usu.length" class="Usu-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(usuarioss, index) in Usu" :key="index">
          <td data-label="Nombre">{{ usuarioss.nombre }}</td>
<td data-label="Correo">{{ usuarioss.email }}</td>
<td data-label="Teléfono">{{ usuarioss.telefono }}</td>
<td data-label="Rol">
  <div class="opciones-administradorr">
    <select v-model="usuarioss.nuevoRol">
      <option value="" disabled>Opciones de Rol</option>
      <option v-for="option in opcionesAdministrador" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</td>
<td data-label="Acciones">
  <button @click="editRol(usuarioss)" class="btn">Guardar</button>
</td>

        </tr>
      </tbody>
    </table>

    <p v-else class="no-data-message">No se encontraron Usu.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { obtenerUsuarios, actualizarRolUsuario } from '@/services/PermisosRolService';

const Usu = ref([]);
const UsuOriginales = ref([]);
const searchQuery = ref('');
const opcionesAdministrador = ref(['cliente', 'profesor', 'administrador']);

const filterUsuarios = () => {
  const query = searchQuery.value.toLowerCase();

  Usu.value = UsuOriginales.value
    .filter(
      (usuarioss) =>
        usuarioss.nombre.toLowerCase().includes(query) ||
        usuarioss.email.toLowerCase().includes(query)
    )
    .map(filtrado => {
      const original = Usu.value.find(u => u.email === filtrado.email);
      return {
        ...filtrado,
        nuevoRol: original?.nuevoRol ?? filtrado.rol,
      };
    });
};


const obtenerUsu = async () => {
  try {
    const usuarios = await obtenerUsuarios();
    Usu.value = usuarios.map(user => ({
      ...user,
      nuevoRol: user.rol,
    }));
    UsuOriginales.value = usuarios;
  } catch (error) {
    console.error("Error al obtener los usuarios", error);
  }
};

const editRol = async (usuario) => {
  if (!usuario.nuevoRol || usuario.nuevoRol === usuario.rol) {
    Swal.fire({
      icon: 'warning',
      title: 'No hay cambios en el rol'
    });
    return;
  }

  try {
    await actualizarRolUsuario(usuario.email, usuario.nuevoRol);
    usuario.rol = usuario.nuevoRol;

    Swal.fire({
      icon: 'success',
      title: 'Rol actualizado correctamente'
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Fallo en la edición del rol',
      text: error.response?.data?.detail || 'Error desconocido'
    });
  }
};

onMounted(() => {
  obtenerUsu();
});
</script>



<style scoped>
.opciones-administradorr{
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:#131313;
}
.opciones-administradorr select{
  width: 90%;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid rgb(245, 187, 27);
  font-size: 15px;
  font-weight: bold;
}
  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
      height:100%;
      width:100%;
      min-height: 100vh;
      padding-bottom: 20px;
      padding-top: 100px;
    }
    
  .gradDynamic{
    position:relative;
  }
  
  .gradDynamic:after, .gradDynamic:before{
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    content:"";
    z-index:-1;
  }
  
  .gradDynamic:after{
    background:radial-gradient(circle,rgb(0, 0, 0),transparent);
    background-size:400%;
    animation:colorSpin 30s linear infinite;
  }
  
  .gradDynamic:before{
    background-color:rgb(184, 183, 182);
  }
  
  @keyframes colorSpin{
    25%{background-position:0 100%}
    50%{background-position:100% 100%}
    75%{background-position:100% 0}
    100%{filter:hue-rotate(360deg)}
  }


.search-bar {
    width: 20%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .admin-section {
    height: 100%;
    padding: 100px 20px;
    border-radius: 8px;
  }

  .section-title {
    font-size: 1.8em;
    font-weight: bold;
    margin-bottom: 20px;
    color: #f8efef;
  }
  .Usu-table {
    width: 90%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: #ff940a;
    border-radius: 8px;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
  }

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    border-bottom: 1px solid #ddd;

  }

  th {
    background-color: rgb(223, 146, 5);
    font-weight: bold;
    color: #000000;
  }

  td {
    color: #000000;
    background-color: rgb(252, 251, 245);
  }

  .no-data-message {
    color: #999;
    font-style: italic;
    text-align: center;
    margin-top: 20px;
  }

  /* Animación de desvanecimiento */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Estilos responsivos */
  @media (max-width: 768px) {
    .admin-section {
      padding: 15px;
    }

    .Usu-table {
      font-size: 0.9em;
    }

    .section-title {
      font-size: 1.5em;
    }

    th, td {
      padding: 8px;
    }

    .ticket-content {
      width: 95%;
    }
  }

  /* From Uiverse.io by Mike11jr */ 
.btn {
 padding: 1.1em 2em;
 background: none;
 border: 2px solid #fff;
 font-size: 15px;
 color: #131313;
 cursor: pointer;
 position: relative;
 overflow: hidden;
 transition: all 0.3s;
 border-radius: 12px;
 background-color: #ecd448;
 font-weight: bolder;
 box-shadow: 0 2px 0 2px #000;
}

.btn:before {
 content: "";
 position: absolute;
 width: 100px;
 height: 120%;
 background-color: #ff6700;
 top: 50%;
 transform: skewX(30deg) translate(-150%, -50%);
 transition: all 0.5s;
}

.btn:hover {
 background-color: rgb(223, 146, 5);
 color: #fff;
 box-shadow: 0 2px 0 2px #0d3b66;
}

.btn:hover::before {
 transform: skewX(30deg) translate(150%, -50%);
 transition-delay: 0.1s;
}

.btn:active {
 transform: scale(0.9);
}
  @media (max-width: 768px) {
  .Usu-table,
  .Usu-table thead,
  .Usu-table tbody,
  .Usu-table th,
  .Usu-table td,
  .Usu-table tr {
    display: block;
    width: 100%;
  }

  .Usu-table thead {
    display: none; /* Oculta el encabezado en móviles */
  }

  .Usu-table tr {
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: #fff;
    padding: 10px;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  }

  .Usu-table td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 10px;
    text-align: left;
    position: relative;
  }

  .Usu-table td::before {
    content: attr(data-label);
    font-weight: bold;
    color: #333;
  }

  .opciones-administradorr select {
    width: 100%;
    font-size: 14px;
    padding: 10px;
  }

  .search-bar {
    width: 90%;
  }
}

  </style>
