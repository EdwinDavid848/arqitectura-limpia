<template>
    <form @submit.prevent="submitForm">
        <input type="text" v-model="formData.email" placeholder="Correro" required />
        <input type="password" v-model="formData.password" placeholder="Contraseña" required/>
        <button type="submit" >{{ props.buttonText }}</button>
    </form>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({ buttonText: String });
const emit = defineEmits(['submit']);

const formData = ref({ email: '', password: '' });

const submitForm = () => {
  emit('submit', formData.value);
};
</script>