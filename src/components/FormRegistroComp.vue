<template>
    <form @submit.prevent="submit" class="login-form">
        <div class="form-group" v-for="(label, key) in visibleLabels" :key="key">
            <input
                :type="key.includes('password') ? 'password' : 'text'"
                v-model="formData[key]"
                :id="key"
                required
                placeholder=" "
            />
            <label :for="key">{{ label }}</label>
        </div>
        <BotonUser :buttonText="buttonText"/>
    </form>
</template>

<script setup>
import { ref, defineEmits, defineProps, computed } from 'vue';
import BotonUser from './Botones/BotonUser.vue';
import Swal from 'sweetalert2';

const props = defineProps({
    modo: String, 
    buttonText: String
});

const emit = defineEmits(['submit']);

const formData = ref({
    nombre: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    rol: 'cliente' 
});

// Etiquetas para los inputs
const labels = {
    nombre: 'Nombre',
    email: 'Email ID',
    password: 'Password',
    passwordConfirmation: 'Confirmar Password'
};

const visibleLabels = computed(() => {
    if (props.modo === 'registro') {
        return labels;
    } else {
        return { email: labels.email, password: labels.password };
    }
});

const submit = () => {
    if (props.modo === 'registro' && formData.value.password !== formData.value.passwordConfirmation) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden'
        });
        return;
    }

    const payload = {
        email: formData.value.email,
        password: formData.value.password
    };

    if (props.modo === 'registro') {
        payload.nombre = formData.value.nombre;
        payload.rol = formData.value.rol;
    }

    emit('submit', payload);

    formData.value = { nombre: '', email: '', password: '', passwordConfirmation: '', rol: 'cliente' };
};
</script>

<style scoped>
.login-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 350px;
    margin: auto;
}

.form-group {
    position: relative;
    margin-bottom: 20px;
}

input {
    width: 100%;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.8);
    outline: none;
}

label {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1rem;
    color: #585656;
    transition: 0.3s ease;
    pointer-events: none;
}

input:focus + label,
input:not(:placeholder-shown) + label {
    top: 0;
    left: 8px;
    font-size: 0.8rem;
    color: #bb6502;
    background: white;
    padding: 0 5px;
}
</style>
