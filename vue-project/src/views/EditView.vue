<template>
  <div v-if="!updated" style="margin-top: 20px;" class="edit-view">
    <h1>Editovať položku</h1>
    <div>
      <p>Id položky : {{itemId}}</p>
      <div>
        <div v-for="item in state.todos" :key="item._id" class="polozka">
          <p v-if="item._id === itemId" >Téma : {{item.author}}</p>
          <p v-if="item._id === itemId" >Obrázok : {{item.todo}}</p>
          <label v-if="item._id === itemId" for="novaTema">Nová téma:</label>
          <input type="text" id="novaTema" v-if="item._id === itemId" v-model="state.newAuthor">
          <label v-if="item._id === itemId" for="novyObrazok">Nový obrázok:</label>
          <input type="text" id="novyObrazok" v-if="item._id === itemId" v-model="state.newTodoItem">
          <button v-if="item._id === itemId" @click="editovat()">Editovať</button>
        </div>
      </div>
    </div>
  </div>
  <h2 style="text-align: center; color: green; margin: 30px;" v-if="updated">Úspešne upravená položka</h2>
</template>

<script>
import crud from "@/modules/crud.cjs";
import {onMounted} from "vue";
export default {
  name: "EditView",
  props: {
    itemId: {
      type: String,
      required: true
    }
  },
  setup() {
    const { state, GetAllTodos, newTodo, deleteTodo, editTodo  } = crud()

    onMounted(() => {
      GetAllTodos()
    })

    return { state, GetAllTodos, newTodo, deleteTodo, editTodo }
  },
  data() {
    return {
      novaTema: "",
      novyObrazok: "",
      updated: false,
    };
  },
  methods: {
    editovat(){
      this.deleteTodo(this.itemId);
      this.newTodo();
      this.updated = true;
    }
  },
};
</script>

<style scoped>
.edit-view {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
