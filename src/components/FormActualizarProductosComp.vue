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
                        @focus="focusedFields[key] = true"
                        @blur="focusedFields[key] = formData[key].length > 0"
                    ></textarea>
                </template>
            
                <template v-else>
                    <input
                        v-model="formData[key]"
                        :id="key"
                        required
                        placeholder=" "
                        @focus="focusedFields[key] = true"
                        @blur="focusedFields[key] = formData[key].length > 0"
                    />            
                </template>
                <label :for="key" :class="{ 'active': focusedFields[key] }">{{ labe }}</label>
            </div>

            <select v-model="category" class="input" id="categoria" required>
                <option value="Categoria" disabled>Selecciona una categoría</option>
                <option v-for="option in categories" :key="option" :value="option">{{ option }}</option>
            </select>

            <div class="form-group">
                <input type="file" class="input" @change="onFileChange" required>
            </div>
        </section>

        <div class="cont_preview-image">
            <img :src="imageUrl" alt="Imagen seleccionada" class="preview-image">
        </div>
        <div class="cont-button">
            <button type="submit">Ingresar</button>
        </div>
    </form>
</template>

<script setup>
import { defineEmits, ref, reactive } from 'vue';

const emit = defineEmits(['submit']);

const categories = ref(["lana", "piedras", "agujas", "peluche", "ropa"]);
const category = ref();
const imagenFile = ref(null);
const imageUrl = ref(null);

const formData = ref({
    nombre: '',
    descripcion: '',
    precio: '',
    tipo_unidad: '',
    color: '',
});

const label = ref({
    nombre: 'Nombre',
    descripcion: 'Descripción',
    precio: 'Precio',
    tipo_unidad: 'Unidad',
    color: 'Color',
});

const focusedFields = reactive({
    nombre: false,
    descripcion: false,
    precio: false,
    tipo_unidad: false,
    color: false,
});

const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        imageUrl.value = URL.createObjectURL(file);
    }
    imagenFile.value = file;
};

const submit = () => {
    const payload = {
        nombre: formData.value.nombre,
        descripcion: formData.value.descripcion,
        category: category.value,
        precio: formData.value.precio,
        tipo_unidad: formData.value.tipo_unidad,
        color: formData.value.color,
        url: imagenFile.value
    };

    emit('submit', payload);
};


</script>

<style scoped>
.login-inventario {
    display: grid;
    grid-template-columns: 2.5fr 2fr;
    width: 100%;
    margin: auto;
    padding-top: 50px;
}

section {
    padding: 25px;
}

.form-group {
    position: relative;
    margin-bottom: 20px;
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
.cont-button{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 25px;
}
button{
    width: 100%;
    padding: 10px;
    border: 2px solid #424141;
    border-radius: 5px;
    font-size: 1rem;
    background: rgba(129, 128, 128, 0.548);
    outline: none;
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

</style>
