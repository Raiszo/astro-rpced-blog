<script setup lang="ts">
 import { ref } from 'vue';

 const form_data = ref({
     slug: '',
     title: '',
     description: '',
     content: ''
 })

 const res_message = ref<string|null>(null);

 const handleSubmit = async () => {
     try {
	 const response = await fetch("https://httpstat.us/200", {
	     method: "POST",
	     headers: {
		 "Content-Type": "application/json",
	     },
	     body: JSON.stringify(form_data.value),
	 });

	 if (!response.ok) {
	     throw new Error("Error en la petición");
	 }

	 const data = await response.json();
	 res_message.value = "¡Formulario enviado con éxito!";
	 console.log(data);
     } catch (error) {
	 res_message.value = "Hubo un error al enviar el formulario.";
	 console.error(error);
     }
 };
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
	<label for="slug">Slug</label>
	<input
	    id="slug"
	    v-model="form_data.slug"
	    type="text"
	    placeholder="my-post-url"
	    required
	/>
      </div>
      <div class="form-group">
	<label for="title">Title</label>
	<input
	    id="slug"
	    v-model="form_data.title"
	    type="text"
	    placeholder="Mi Titulo"
	    required
	/>
      </div>
      <div class="form-group">
	<label for="description">Description</label>
	<input
	    id="description"
	    v-model="form_data.description"
	    type="text"
	    placeholder="A short description"
	    required
	/>
      </div>
      <div class="form-group">
	<label for="content">Content</label>
	<textarea
	    id="content"
	    v-model="form_data.content"
	    type="text"
	    placeholder="The content."
	    required
	/>
      </div>
      <button type="submit">Submit</button>
    </form>
    <p v-if="res_message" class="response-message">{{ res_message }}</p>
  </div>
</template>

<style scoped>
 .form-container {
     max-width: 400px;
     margin: 0 auto;
 }

 .form-group {
     margin-bottom: 1rem;
 }

 input {
     width: 100%;
     padding: 0.5rem;
     margin-top: 0.5rem;
 }

 button {
     padding: 0.5rem 1rem;
     background-color: #007bff;
     color: white;
     border: none;
     border-radius: 5px;
     cursor: pointer;
 }

 button:hover {
     background-color: #0056b3;
 }

 .response-message {
     margin-top: 1rem;
     color: green;
 }
</style>
