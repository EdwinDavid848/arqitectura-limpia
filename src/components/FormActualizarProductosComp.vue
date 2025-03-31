<template>
    <form @submit.prevent="submit" class="login-inventario">
        <section>
            <div class="form-group" v-for="(labe, key) in label" :key="key">
                <template v-if="key === 'descripcion'">
                    <textarea
                        class="input"
                        v-model="formData[key]"
                        :id="key"
                        required
                        rows="4"
                    ></textarea>
                </template>
                <template v-else>
                    <input v-model="formData[key]" :id="key" required />
                </template>
                <label :for="key">{{ labe }}</label>
            </div>

            <select v-model="category" class="input" id="categoria" required>
                <option value="" disabled>Selecciona una categoría</option>
                <option v-for="option in categories" :key="option" :value="option">{{ option }}</option>
            </select>

            <div class="form-group">
                <input type="file" class="input" @change="onFileChange">
            </div>
        </section>

        <div class="cont_preview-image">
            <img v-if="imageUrl" :src="imageUrl" alt="Imagen seleccionada" class="preview-image">
        </div>
        <div class="cont-button">
            <button type="submit">Actualizar</button>
            <button type="button" @click="$emit('close')" class="cancel-button">Cancelar</button>
        </div>
    </form>
</template>

<script setup>
import { defineProps, defineEmits, ref, reactive, watch } from 'vue';

const props = defineProps(['producto']);
const emit = defineEmits(['submit', 'close']);

const categories = ref(["lana", "piedras", "agujas", "peluche", "ropa"]);
const category = ref('');
const imagenFile = ref(null);
const imageUrl = ref(null);

const formData = reactive({
    nombre: '',
    descripcion: '',
    precio: '',
    tipo_unidad: '',
    color: '',
});

const label = {
    nombre: 'Nombre',
    descripcion: 'Descripción',
    precio: 'Precio',
    tipo_unidad: 'Unidad',
    color: 'Color',
};

watch(() => props.producto, (nuevoProducto) => {
    if (nuevoProducto) {
        Object.assign(formData, nuevoProducto);
        category.value = nuevoProducto.category || '';
        imageUrl.value = nuevoProducto.imagen || null;
    }
}, { immediate: true });

const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        imageUrl.value = URL.createObjectURL(file);
    }
    imagenFile.value = file;
};

const submit = () => {
    emit('submit', { ...formData, category: category.value, url: imagenFile.value });
};
</script>

<style scoped>
.login-inventario {
    display: grid;
    grid-template-columns: 2.5fr 2fr;
    width: 100%;
    margin: auto;
}

section {
    padding: 25px;
}

.form-group {
    position: relative;
    margin-bottom: 15px;
    width: 100%;
}

input, textarea {
    width: 100%;
    padding: 10px;
    border: 2px solid #a09b9b;
    border-radius: 5px;
    font-size: 1rem;
    background-color: #e2e7ec;
    outline: none;
    resize: none;
}

.input {
    width: 100%;
    padding: 10px;
    border: 2px solid #a09b9b;
    border-radius: 5px;
    font-size: 1rem;
    background-color: #e2e7ec;
    outline: none;
}

label {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1rem;
    color: #242323;
    transition: 0.3s ease;
    pointer-events: none;
}

#categoria{
    margin-bottom: 20px;
}

input:focus + label,
input:not(:placeholder-shown) + label,
textarea:focus + label,
.active {
    top: 0;
    left: 8px;
    font-size: 0.8rem;
    color: #000000;
    background: rgba(255, 254, 254, 0.699);
    padding: 0 5px;
}

.cont_preview-image {
    width: 100%;
    max-width: 600px;
    max-height: 500px; 
    border: 1px solid rgb(122, 120, 120);
    background-color: #e2e7ec;
    padding: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 25px;
}

.preview-image {
    max-width: 100%;
    max-height: 100%;
    height: auto;
    width: auto;
    object-fit: contain; 
}



.cancel-button {
    background-color: red;
    color: white;
    border: none;
    cursor: pointer;
}
.cont-button{
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0px 25px;
}
button{
    width: 40%;
    padding: 10px;
    border: 2px solid #424141;
    border-radius: 5px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.548);
    outline: none;
    cursor: pointer;
}

</style>
