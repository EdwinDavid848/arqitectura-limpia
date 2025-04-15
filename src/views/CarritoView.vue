<template>
  <div class="cont_principal">
    <button v-show="email_client" @click="toggleCart" class="open-cart-btn" aria-label="Ver Carrito">
      Ver Carrito
    </button>
    <transition name="fade-slide">
      <div v-if="isCartVisible" class="cart-overlay">
        <div class="cart">
          <div class="cart-header">
            <h2>Mis Reservas</h2>
            <button @click="toggleCart" class="close-cart-btn" aria-label="Cerrar reservas">X</button>
          </div>
          <div class="cart-body">
            <div v-if="cartStore.items.length === 0" class="no-items-message">
              <p>No tienes productos reservados actualmente.</p>
            </div>
            <div v-else>
              <div v-for="(item, index) in cartStore.items" :key="index" class="cart-item">
                <img :src="item.imagen_url" alt="product image" class="product-image" />
                <div class="cart_dat">
                  <p class="tit">{{ item.product_name }}</p>
                  <p>{{ item.precio }} $</p>
                  <div class="quantity-controls">
                    <button @click="decreaseQuantity(item)" class="decrease-btn">-</button>
                    <input type="text" v-model="item.cantidad" readonly class="quantity-input"/>
                    <button @click="increaseQuantity(item)" class="increase-btn">+</button>
                  </div>
                  <p>Total: {{ totalPrecio.toFixed(2) }} $</p>
                  <button @click="removeItem(item.product_id)" class="remove-btn">Eliminar</button>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="cartStore.items.length > 0" class="cart-footer">
            <h3>Subtotal: {{ cartSubtotal }} $</h3>
            <router-link class="pay-btn" to="/comprar_producto">Continuar Compra</router-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import Swal from 'sweetalert2';

const authStore = useAuthStore();
const cartStore = useCartStore();
const isCartVisible = ref(false);

const email_client = computed(() => authStore.email);

const cartSubtotal = computed(() => {
  return cartStore.items.reduce((sum, item) => sum + item.precio * item.cantidad, 0).toFixed(2);
});

const toggleCart = () => {
  isCartVisible.value = !isCartVisible.value;
};

const increaseQuantity = async (item) => {
    if (!email_client.value) {
        Swal.fire({
            icon: 'error',
            title: 'Inicia sesión',
            text: 'Debes iniciar sesión para modificar el carrito.'
        });
        return;
    }

    if (!item.product_id) {
        console.error("Error: product_id no encontrado", item);
        return;
    }

    const newQuantity = item.cantidad + 1;
    item.cantidad = newQuantity;

    await cartStore.updateCarrito(item.product_id, newQuantity, email_client.value);
};

const totalPrecio = computed(() =>
  cartStore.items.reduce((total, item) => total + item.precio * item.cantidad, 0)
);


const decreaseQuantity = async (item) => {
  if (item.cantidad > 1) {
    const newQuantity = item.cantidad - 1;
    item.cantidad = newQuantity; 
    await cartStore.updateCarrito(item.product_id, newQuantity, email_client.value);
  }else{
    console.log("error")
  }
};

const removeItem = async (productId) => {
    try{
      await cartStore.removeFromCart(email_client.value, productId);

      cartStore.items = cartStore.items.filter(item => item.product_id !== productId);
      Swal.fire({
            icon: 'success',
            title: 'Elimanr Del carrito',
            text: 'Se elimino el producto del carrito'
      });
    }catch(error){
       Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al elimnar del carrito'
      });
    }
};

watch(email_client, async (newEmail) => {
  if (newEmail) {
    await cartStore.fetchCarrito(newEmail);
  }
});

onMounted(async () => {
  await nextTick();
  if (email_client.value) {
    await cartStore.fetchCarrito(email_client.value);
  }
});

</script>


<style scoped>
.fade-slide-enter-from,
.fade-slide-leave-to {
  transform: translateX(100%);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  transform: translateX(0);
}

.cart-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  transition: all 0.3s ease-in-out;
}

.cart {
  width: 350px;
  background-color: #fff;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
}

.cart-header h2 {
  font-size: 1.5rem;
  color: #333;
}

.close-cart-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
}

.close-cart-btn:hover {
  color: #333;
}
.cart_dat .tit{
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;
}
.cart_dat p{
  color: #020202;

}
.cart-body {
  flex-grow: 1;
  overflow-y: auto;
  margin-top: 20px;
}

.cart-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.product-image {
  width: 170px;
  height: 100px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 5px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.item-details {
  flex-grow: 1;
}

.item-name {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
}

.item-price, .item-total {
  color: #555;
  margin-top: 5px;
  font-size: 0.9rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.quantity-input {
  width: 40px;
  height: 30px;
  text-align: center;
  margin: 0 10px;
  border: none;
  background-color: #f0f0f0;
  font-size: 1rem;
  border-radius: 5px;
}

.decrease-btn, .increase-btn {
  background-color: #000000;
  border: none;
  height: 30px;
  padding: 5px 10px;
  font-size: 18px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.decrease-btn:hover, .increase-btn:hover {
  background-color: #7ecf3c;
}

.remove-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.remove-btn:hover {
  background-color: #c0392b;
}

.cart-footer {
  border-top: 2px solid #ddd;
  padding-top: 10px;
  text-align: center;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 10;
  padding-bottom: 20px; 
}

.cart-footer h3 {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #333;
}

.pay-btn {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 150px; /* Añade margen superior para separación */
}

.pay-btn:hover {
  background-color: #219150;
}

.open-cart-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #e7a624;
  color: white;
  padding: 15px 20px;
  font-size: 16px;
  border: none;
  border-radius: 50px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 1000;
}

.open-cart-btn:hover {
  background-color: #e09000;
}

.open-cart-btn i {
  margin-right: 5px;
}

</style>