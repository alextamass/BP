<!--<template>-->
<!--  <div>-->
<!--    <input type="file" ref="fileInput" @change="handleFileChange">-->
<!--    <button @click="uploadImage">Upload Image</button>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from 'axios';-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      imageFile: null-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    handleFileChange(event) {-->
<!--      this.imageFile = event.target.files[0];-->
<!--    },-->
<!--    async uploadImage() {-->
<!--      try {-->
<!--        const formData = new FormData();-->
<!--        formData.append('image', this.imageFile);-->

<!--        const response = await axios.post('/api/uploadRoutes', formData, {-->
<!--          headers: {-->
<!--            'Content-Type': 'multipart/form-data'-->
<!--          }-->
<!--        });-->

<!--        console.log(response.data);-->
<!--        // Display success message or perform other actions-->
<!--      } catch (error) {-->
<!--        console.error('Error uploading image:', error);-->
<!--        // Display error message or handle error-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->


<template>
  <div>
    <div v-for="item in state.todos" :key="item.author">
      <img style="width: 250px" :src="item.todo" alt="">
      {{item.author}}
      {{item.todo}}
    </div>
  </div>
</template>

<script>
import {onMounted, reactive} from "vue";

export default {
  setup() {
    const state = reactive({
      todos: {}
    })

    function GetAll() {
    fetch("http://localhost:3000/todos")
        .then(res => res.json())
        .then(data => {
          state.todos = data
        })
    }

    onMounted(() => {
      GetAll()
    })
    return {state, GetAll}
  }

};
</script>

<style>
/* Add your CSS styles here */
</style>
