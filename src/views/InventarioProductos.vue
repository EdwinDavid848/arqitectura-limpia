<template>
  <FormInventarioProductosComp @submit="habdleInventario"/>
  <div class="box gradDynamic">
      <div v-if="mostrarFormulario" class="modal-overlay" @click="cerrarFormulario"></div>
      <h1 class="titprod">Formulario de productos</h1>
      
      <form @submit.prevent="registroProductos" class="form">
        <div class="conten_divinput">
          <div>
            <div class="divinput">
              <input type="text" class="input" id="codi" v-model="nombre" required>
              <label for="codi" class="label">Nombre</label>
            </div>
            <div class="divinput">
            <textarea class="input textarea" id="nom" v-model="descripcion" rows="1" @input="autoResize" required></textarea>
            <label for="nom" class="label">Descripción</label>
            </div>

            <div class="divinput">
              <select v-model="category" class="input" id="catego" required>
                <option value="" disabled>Selecciona una categoría</option>
                <option v-for="option in categories" :key="option" :value="option">{{ option }}</option>
              </select>
              <label for="catego" class="label"></label>
            </div>
            <div class="divinput">
              <input type="number" class="input" id="precio" v-model="precio" required>
              <label for="precio" class="label">Precio</label>
            </div>
            <div class="divinput">
              <input type="text" class="input" id="tipo_unidad" v-model="tipo_unidad" required>
              <label for="tipo_unidad" class="label">Tipo de Unidad</label>
            </div>
            <div class="divinput">
              <input type="text" class="input" v-model="color" required>
              <label class="label">Color</label>
            </div>
          </div>
          <div>
            <div class="divinput" id="input_URL">
              <input type="file" class="input"  @change="onFileChange" required>
            </div>
            <div v-if="imageUrl" class="cont_preview-image">
              <img :src="imageUrl" alt="Imagen seleccionada" class="preview-image">
            </div>
          </div>
        </div>
        <div class="botonn">
          <button type="submit" >Ingresar</button>
        </div>
        <div v-if="MensajeError">{{ MensajeError }}</div>
      </form>

      <div class="opciones">
        <select id="categoryUno" v-model="SelectOpcion" class="input">
          <option id="category" value="">Todas las categorías</option>
          <option v-for="option in categories" :key="option" :value="option">{{ option }}</option>
        </select>
        <button class="opciones_button" @click="obtenerDatosCategoria(SelectOpcion)">Buscar</button>
      </div>

    <div class="cont_tab">
      <table class="tab">
        <thead>
          <tr class="thead_tabla">
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Tipo de Unidad</th>
            <th>Color</th>
            <th>Funciones</th>
          </tr>
        </thead>
        <tbody class="tb_tabla">
          <tr v-for="d in visibleDatos" :key="d.nombre" class="tbody_tb">
            <td>{{ d.nombre }}</td>
            <td class="descripcion-tabla" >{{ d.descripcion }}</td>
            <td>{{ d.category }}</td>
            <td>{{ d.precio }}</td>
            <td>{{ d.tipo_unidad }}</td>
            <td>{{ d.color }}</td>
            <td class="botoness">
              <button @click="cargarProducto(d)" class="editar">Editar</button>
              <button @click="eliminarProductos(d.id)" class="eliminar">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button v-if="canLoadMore" @click="loadMore" class="load-more-btn">
        Cargar más
      </button>
    </div>
    <div v-if="mostrarFormulario" class="modal_tabla">
    <h3>Editar Producto</h3>
    <form @submit.prevent="actualizarProductoSeleccionado" class="modal-content">
        <div class="conten-put">
          <div>
            <div class="divinput">
              <input type="text" class="input" v-model="nombre" required>
              <label class="label">Nombre</label>
            </div>
            <div class="divinput">
              <textarea class="input textarea" v-model="descripcion" required></textarea>
              <label class="label">Descripción</label>
            </div>
            <div class="divinput">
              <select v-model="category" class="input">
                <option v-for="option in categories" :key="option" :value="option">{{ option }}</option>
              </select>
              <label class="label">Categoría</label>
            </div>
            <div class="divinput">
              <input type="number" class="input" v-model="precio" required>
              <label class="label">Precio</label>
            </div>
            <div class="divinput">
              <input type="text" class="input" v-model="tipo_unidad" required>
              <label class="label">Tipo de Unidad</label>
            </div>
            <div class="divinput">
              <input type="text" class="input" v-model="color">
              <label class="label">Color</label>
            </div>
        
          </div>
          <div>
            <div class="divinput" id="input_URL">
              <input type="file" class="input" @change="onFileChange">
            </div>
            <div v-if="imageUrl" class="cont_preview-image">
              <img :src="imageUrl" alt="Imagen seleccionada" class="preview-image">
            </div>
          </div>
        </div>
        <div class="contenedor_botones">
          <button type="submit">Actualizar</button>
          <button type="button" @click="cerrarFormulario">Cerrar</button>
        </div>
    </form>
  </div>
</div>
</template>


<script setup>
import FormInventarioProductosComp from "@/components/FormInventarioProductosComp.vue";
import { ref, onMounted, computed } from "vue";
import Swal from "sweetalert2";
import { obtenerProductos,registrarProducto,eliminarProducto,obtenerProductosPorCategoria,actualizarProducto } from "@/services/productService";

const nombre = ref("");
const descripcion = ref("");
const precio = ref(null);
const tipo_unidad = ref("");
const color = ref("");
const category = ref("");
const categories = ref(["lana", "piedras", "agujas", "peluche", "ropa"]);
const datos = ref([]);
const SelectOpcion = ref("");
const imagenFile = ref(null);
const imageUrl = ref(null);
const mostrarFormulario = ref(false);
const canLoadMore = ref(true);
const limit = ref(5);
const productoSeleccionado = ref(null);




const loadMore = () => {
  if (limit.value + 5 <= datos.value.length) {
    limit.value += 5;
  } else {
    limit.value = datos.value.length; 
    canLoadMore.value = false; 
  }
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageUrl.value = URL.createObjectURL(file);
  }
  imagenFile.value = file;
};

const obtenerDatos = async () => {
  try {
    const response = await obtenerProductos();
    console.log("Respuesta del backend:", response);
    datos.value = response;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    Swal.fire("Error", "No se pudieron cargar todos los productos", "error");
  }
};


const obtenerDatosCategoria = async () => {
  try {
    datos.value = await obtenerProductosPorCategoria(SelectOpcion.value);
    canLoadMore.value = datos.value.length > limit.value;
  } catch (error) {
    Swal.fire("Error", "No se pudieron cargar la categorias de productos", "error");
  }
};

const registroProductos = async () => {
  try {
    await registrarProducto({
      nombre: nombre.value,
      descripcion: descripcion.value,
      category: category.value,
      precio: precio.value,
      tipo_unidad: tipo_unidad.value,
      color: color.value,
      url: imagenFile.value,
    });

    Swal.fire("Éxito", "Producto registrado", "success");
    resetForm();
    obtenerDatos();
  } catch (error) {
    Swal.fire("Error", "No se pudo registrar el producto", "error");
  }
};

const eliminarProductos = async (id) => {
  try {
    await eliminarProducto(id);
    Swal.fire("Éxito", "Producto eliminado", "success");
    obtenerDatos();
  } catch (error) {
    Swal.fire("Error", "No se pudo eliminar el producto", "error");
  }
};

const actualizarProductoSeleccionado = async () => {
  try {
    await actualizarProducto(productoSeleccionado.value.id, {
      nombre: nombre.value,
      descripcion: descripcion.value,
      category: category.value,
      precio: precio.value,
      tipo_unidad: tipo_unidad.value,
      color: color.value,
      url: imagenFile.value,
    });

    Swal.fire("Éxito", "Producto actualizado", "success");
    cerrarFormulario();
    obtenerDatos();
  } catch (error) {
    Swal.fire("Error", "No se pudo actualizar el producto", "error");
  }
};

const visibleDatos = computed(() => {
  return datos.value.slice(0, limit.value);
});

const cargarProducto = (producto) => {
  productoSeleccionado.value = producto; 
  nombre.value = producto.nombre;
  descripcion.value = producto.descripcion;
  category.value = producto.category;
  precio.value = producto.precio;
  tipo_unidad.value = producto.tipo_unidad;
  color.value = producto.color;
  imagenFile.value = producto.imagenFile;
  imageUrl.value = producto.imageUrl;
  mostrarFormulario.value = true;
};

const cerrarFormulario = () => {
  mostrarFormulario.value = false;
  resetForm();
};


const resetForm = () => {
  nombre.value = "";
  descripcion.value = "";
  precio.value = null;
  tipo_unidad.value = "";
  color.value = "";
  category.value = "";
  imagenFile.value = null;
  imageUrl.value = null;
};

onMounted(() => {
  obtenerDatos();
});
</script>



<style scoped >

.cont_preview-image{
  display: flex;
  align-items: center;
  justify-content: center;
}
.preview-image {
  max-width: 100%; 
  max-height: 400px;
  margin-top: 20px;
  border-radius: 8px;
  object-fit: cover; 
}
    .box {
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
    background-color:rgb(223, 146, 5);
  }
  
  @keyframes colorSpin{
    25%{background-position:0 100%}
    50%{background-position:100% 100%}
    75%{background-position:100% 0}
    100%{filter:hue-rotate(360deg)}
  }


  
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999; 
    }
    .modal_tabla :deep(.label) {
    color: #a58a7b; 
  }
    .modal_tabla {
      position: fixed;
      top: 50%;
      left: 50%;
      width: 70%;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      transform: translate(-50%, -50%);
      background: rgba(204, 10, 10, 0.1); 
      backdrop-filter: blur(10px); 
      -webkit-backdrop-filter: blur(10px); 
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08); 
      border: 1px solid rgba(255, 255, 255, 0.3); 
      color: #fff; 
      z-index: 1000;
      border-radius: 25px;
      transition: all 0.5s ease;
    }

    .modal-content {
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);      
      text-align: center;
      display: flex;
      flex-direction: column;
    }
    .conten-put{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
    .modal-content .divinput .input{
      background-color: #a1a1a0;
      width: 100%;
      overflow-y: auto; 
    }
    .modal_tabla h3{
      font-size: 30px;
      text-align: center;
      padding: 10px;
    }
    .contenedor_botones{
      display: flex;
      justify-content: center;
      padding: 20px 10px;
      gap: 20px;
    }
    .contenedor_botones button{
      width: 20%;
      height: 30px;
      border-radius: 25px;
    }

    .opciones{
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    #categoryUno{
      text-align: center;
      background-color: #fafafa;
      width: 20%;
    }
    .opciones_button{
      background-color: #f18140;
      width: 80px;
      height: 50px;
      border-radius: 15px;
      margin-left: 10px;
      margin-right: 10px;
      transition: all 0.5s ease;
    }
    .opciones_button:hover{
      background-color: #ec9513;
    }

      .titprod{
        text-align: start;
        text-transform: uppercase;
        margin-left: 130px;
        padding-top: 50px;
        margin-bottom: 30px;
        color: #e49013;
        font-family: arial black;
        text-shadow: 0px 0px 15px  rgba(0, 0, 0, 0.486);
      }

      .label{
        font-weight: bold;
        position: absolute;
        top: 1rem;
        left: 1rem;
        color: #050505;
        background-color: #180e0800;
        pointer-events: none;
        transition: 150ms cubic-bezier(0.4,0,0.2,1);
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
      }
      .input{
        all:unset;
        color: #0f0f0f;
        padding: 15px;
        border-radius: 0.5rem;
        transition: 150ms cubic-bezier(0.4,0,0.2,1);
        width: 100%;
      }
      .input:focus{
        border: 1px solid var(--primary);
      }
      .input:is(:focus,:valid) ~ label{
        transform: translateY(-120%) ;
        background-color: rgba(22, 20, 20, 0.822);
        padding-inline: 0.3rem;
        color: var(--primary);
      }
      .form{
        width: 100%;
        margin-bottom: 50px;
        gap: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .conten_divinput {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 50px;
      width: 80%;
      padding: 20px;
      border-radius: 15px;
      background: rgba(255, 255, 255, 0.1); 
      backdrop-filter: blur(10px); 
      -webkit-backdrop-filter: blur(10px); 
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08); 
      border: 1px solid rgba(255, 255, 255, 0.3); 
      color: #fff; 
    }
      .divinput{
        margin-bottom: 10px;
        font-size: 18px;
        width: 100%;
        margin-top: 5px;
        display: flex;
        position: relative;
        backdrop-filter: blur(16px) saturate(180%);
        -webkit-backdrop-filter: blur(16px) saturate(180%);
        background-color: rgba(195, 202, 216, 0.87);
        border-radius: 12px;
        border: 1px solid rgba(107, 104, 104, 0.144);

      }
      .seccion{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
      }
      #nom{
        width: 500px; 
        min-height: 50px;
        max-width: 100%; 
        padding: 8px;
        font-size: 16px;
        resize: none;
        overflow: hidden;
        }
      .botonn{
        font-size: 15px;
        margin-top: 15px;
        width: 95%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .botonn button:hover{
      transition: 0.3s;
        background-color: #ec9513;
        color: #ffff;
    }
    .botonn button{
      width: 40%;
      transition: 0.5s;
      border-radius: 15px;
      height: 50px;
      font-family: arial black;
      font-size: 18px;
        font-family: arial black;
        border: none;
        background: #ffffff;
        border: none;
        box-shadow: 0 0 15px #ec9513;
    }
    .tablaproduc{
      display: flex;
        align-items: center;
        justify-content: center;
    }
    .cont_tab{
      min-height: 100vh;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .load-more-btn {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 16px;
      border-radius: 5px;
    }

    .load-more-btn:hover {
      background-color: #45a049;
    }
    .tab{
      width: 90%;
      overflow-y: auto;
      background-color: #000000;
    }
    .tb_tabla{
      width: 90%;
      max-height: 10px;
      flex-grow: 1;
    }
    
    .thead_tabla{
      background-color: #ff940a;
      font-family: arial black;
      color: #1a1818;
    }
    .editar{
      padding: 6px 12px;
      background-color: #52e63f;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 0.9em;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    .editar:hover{
      cursor: pointer;
      background-color: rgb(127, 255, 180);
    }
    .eliminar{
      padding: 6px 12px;
      background-color: #f33809;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 0.9em;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    .eliminar:hover{
      cursor: pointer;
      background-color: rgb(245, 114, 62);
    }
    

    .tbody_tb{
      font-family: arial;
      text-align: center;
    }
    .tbody_tb:nth-child(odd) {
      background-color: #ff940a;
    }
    
    .tbody_tb:nth-child(even) {
      background-color: #ffcd95;
    }
    th, td {
    padding: 10px;
    width: 14.28%;
    text-align: left;
    border-bottom: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    white-space: nowrap;     
    overflow: hidden;         
    text-overflow: ellipsis; 
    height: 20px;
  }
  .botoness button {
      margin-right: 5px;
    }

  .descripcion-tabla{
    min-width: 50px;
    max-width: 60px;
    max-height: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  table{
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: #ff940a;
    border-radius: 8px;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
  }


</style>