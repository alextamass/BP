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


<!--<template>-->
<!--  <div>-->
<!--    <div v-for="item in state.todos" :key="item.author">-->
<!--      <img style="width: 250px" :src="item.todo" alt="">-->
<!--      {{item.author}}-->
<!--      {{item.todo}}-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<template>
  <h1>Admin Rozhranie</h1>
  <body>
  <br><br>
  <div class="login" v-if="this.prihlaseny === false">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="login-forma">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="login-forma">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>


  <div style="text-align: center" v-if="this.prihlaseny === true">
    <button @click="zobrazTF()" style="width: 30%; margin: 5px">Nahrať</button>
    <button @click="ukazDatabazu()" style="width: 30%; margin: 5px">Zobraziť udaje v databaze</button>
  </div>

  <div v-if="zobrazDatabazu" class="zobraz-databazu">
    <div v-for="item in state.todos" :key="item._id" class="polozka">
      <p class="nazov-lekcie">Lekcia: {{ item.author }}</p>
      <img class="obrazok" :src="item.todo" alt="">
      <button class="tlacidlo-vymazat" @click="vymaz(item._id)">Vymazať úlohu</button>
    </div>
  </div>
  <div v-if="prihlaseny === true && this.nahrat === true">
    <div class="pridaj">
      <p>Lekcia: </p>
      <br>
      <input type="number" v-model="state.newAuthor">
    </div>

    <div class="pridaj">
      <p>Link na obrazok: </p>
      <input style="width: 33%" type="text" v-model="state.newTodoItem">
    </div>
    <div class="pridaj">
      <button @click="pridaj()" style="width: 15%; text-align: center">Pridať</button>
    </div>
  </div>
  </body>
</template>

<script>
import {onMounted, reactive} from "vue";
import crud from "@/modules/crud.cjs";

export default {
  data() {
    return {
      nahrat: false,
      pridajItem: false,
      zobrazDatabazu: false,
      prihlaseny: false,
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    login() {
      if (this.username === 'admin' && this.password === 'admin') {
        console.log('Login successful');
        this.error = '';
        this.prihlaseny = true;
      } else {
        this.error = 'Nesprávne údaje';
      }
    },
    ukazDatabazu(){
      this.zobrazDatabazu = true;
      this.nahrat = false;
    },
    async vymaz(id) {
      await this.deleteTodo(id);
      await this.GetAllTodos();
    },
    zobrazTF(){
      this.zobrazDatabazu = false;
      this.nahrat = true;
    },
    pridaj(){
      this.newTodo();
      this.GetAllTodos();
      setTimeout(() => {
        alert('Úspešne pridané do databázy');
      }, 1000);
    }

  },
  setup() {
    const { state, GetAllTodos, newTodo, deleteTodo, editTodo  } = crud()

    onMounted(() => {
      GetAllTodos()
    })

    return { state, GetAllTodos, newTodo, deleteTodo, editTodo }
  }

};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-forma {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.pridaj{
  margin: 10px;
  display: flex;
  justify-content: center;
}

h1 {
  text-align: center;
  color: orangered;
}

.zobraz-databazu {
  margin-top: 20px;
  text-align: center;
}

.polozka {
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  width: 30%;
}

.nazov-lekcie {
  font-weight: bold;
}

.obrazok {
  width: 250px;
  margin-top: 10px;
}

.tlacidlo-vymazat {
  padding: 8px 16px;
  font-size: 14px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.tlacidlo-vymazat:hover {
  background-color: #c82333;
}
</style>
