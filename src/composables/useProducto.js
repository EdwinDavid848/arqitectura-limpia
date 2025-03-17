import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import { getProductosPorCategoria } from '@/services/productService';

export function useProductos() {
  const categories = ref(['Todos', 'lana', 'peluche', 'ropa', 'piedras', 'agujas']);
  const selectedCategory = ref('Todos');
  const productos = ref([]);
  const estilo = ref('list');
  const Titulo = ref('');
  const route = useRoute();
  const animar = ref(false);
  const offset = ref(0);
  const limit = ref(10);
  const loading = ref(false);


  const obtenerProductosPorCategoriaTienda = async (categoria, reset = false) => {
    try {
      if (reset) {
        productos.value = [];
        offset.value = 0;
      }
  
      const data = await getProductosPorCategoria(categoria, limit.value, offset.value);
      console.log('Productos obtenidos:', data);
      Titulo.value = categoria.toUpperCase();
  
      if (data.length !== 0) {
        const nuevosProductos = data.filter(nuevo => 
          !productos.value.some(existente => existente.id === nuevo.id)
        );
  
        if (reset) {
          productos.value = nuevosProductos;
        } else {
          productos.value = [...productos.value, ...nuevosProductos];
        }
  
        if (nuevosProductos.length > 0) {
          offset.value += limit.value;  
        }
      }
  
      animar.value = true;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al obtener productos, por favor inténtalo de nuevo más tarde.',
      });
    }
  };
  
  

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
  
    if (scrollY + windowHeight >= docHeight - 100 && !loading.value) {
      loading.value = true;
      obtenerProductosPorCategoriaTienda(selectedCategory.value, false)  
        .finally(() => {
          loading.value = false;
        });
    }
  };

const cambiarCategoria = (categoria) => {
  selectedCategory.value = categoria;
  animar.value = false;
  obtenerProductosPorCategoriaTienda(categoria, true); 
};

  const estilo_mostrarProductos = (nuevoEstilo) => {
    estilo.value = nuevoEstilo;
  };

  onMounted(() => {
    selectedCategory.value = route.params.categoria || 'Todos';
    productos.value = [];  // 🔹 Limpiar productos al montar la vista
    offset.value = 0;      // 🔹 Resetear offset
    obtenerProductosPorCategoriaTienda(selectedCategory.value);
    window.addEventListener('scroll', handleScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return {
    categories,
    selectedCategory,
    productos,
    estilo,
    Titulo,
    animar,
    cambiarCategoria,
    estilo_mostrarProductos,
    handleScroll,
  };
}


