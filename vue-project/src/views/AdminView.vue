<template>
  <h1>Admin Rozhranie</h1>
  <body>
  <br><br>
  <div class="login" v-if="this.prihlaseny === false">
    <h2>Prihlásenie</h2>
    <form @submit.prevent="login">
      <div class="login-forma">
        <label for="username">Používateľské meno:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="login-forma">
        <label for="password">Heslo:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Prihlásiť</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>


  <div style="text-align: center" v-if="this.prihlaseny === true">
    <button @click="zobrazTF()" style="width: 30%; margin: 5px">Nahrať</button>
    <button @click="ukazDatabazu()" style="width: 30%; margin: 5px">Zobraziť udaje v databaze</button>
  </div>

  <div v-if="zobrazDatabazu" class="zobraz-databazu">
    <label>Téma:</label>
    <select v-model="lekcia">
      <option v-for="item in lekcie" :key="item" :value="item">{{ item }}</option>
      <option :value="-1">Zobraziť všetky položky</option>
    </select>
    <div v-if="lekcia !== -1" v-for="item in state.todos" :key="item._id" class="polozka">
      <div v-if="item.author === this.lekcia">
        <p class="nazov-lekcie">Téma: {{ item.author }}</p>
        <img class="obrazok" :src="item.todo" alt="">
        <button class="tlacidlo-vymazat" @click="vymaz(item._id)">Vymazať</button>
        <router-link :to="{ name: 'editView', params: { itemId: item._id } }">Editovať</router-link>
      </div>
    </div>

    <div v-if="lekcia === -1" v-for="item in state.todos" :key="item._id" class="polozka">
      <div>
        <p class="nazov-lekcie">Téma: {{ item.author }}</p>
        <img class="obrazok" :src="item.todo" alt="">
        <button class="tlacidlo-vymazat" @click="vymaz(item._id)">Vymazať</button>
        <router-link :to="{ name: 'editView', params: { itemId: item._id } }">Editovať</router-link>
      </div>
    </div>

  </div>
  <div v-if="prihlaseny === true && this.nahrat === true" class="pridaj-container">
    <div class="pridaj">
      <p>Téma: </p>
      <br>
      <input style="width: 20%" type="text" v-model="state.newAuthor">
    </div>

    <div class="pridaj">
      <p>Odkaz na obrázok: </p>
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
      error: '',
      lekcia: null,
    };
  },
  computed: {
    lekcie(){
      let array = [];
      for(let i = 0; i < this.state.todos.length; i ++){
        const autor = this.state.todos[i].author;
        let duplikat = false;
        for (let j = 0; j < array.length; j++) {
          if (array[j] === autor) {
            duplikat = true;
            break;
          }
        }
        if(!duplikat){
          array.push(autor);
        }
      }
      return array;
    },
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
