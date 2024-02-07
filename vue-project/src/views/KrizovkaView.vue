<template>
  <h1>Vytvorenie krížovky</h1>
  <div class="input">
    <input
        @keyup.enter="addWord"
        :disabled="this.disableButtons"
        type="text" v-model="enteredWord"
        class="text-field"
        placeholder="Zadaj slovo, ktoré chceš pridať" />
    <input
        @keyup.enter="addWord"
        :disabled="this.disableButtons"
        type="text" v-model="napoveda"
        class="text-field"
        placeholder="Zadaj nápovedu" />
    <br>
    <button
        v-if="!disableButtons"
        @click="addWord"
        class="action-button">Pridať</button>
    <div class="slova-container">
      <div class="enteredWords" v-for="(word, index) in enteredWords" :key="index">
        Slovo: {{word}}
      </div>
      <div class="enteredWords" v-for="(word, index) in napovedy" :key="index">
        Napoveda: {{word}}
      </div>
    </div>
    <div>
      <button  class="button-generate">Generovat</button>
    </div>
  </div>

</template>

<script>
export default {
  name: "KrizovkaView",
  data() {
    return {
      enteredWords: [],
      enteredWord : '',
      napoveda : '',
      napovedy: [],
    };
  },
  methods: {
    addWord(){
      if(this.enteredWord.length > 0 && this.napoveda.length > 0) {
        this.enteredWords.push(this.enteredWord);
        this.napovedy.push(this.napoveda);
        this.enteredWord = "";
        this.napoveda = "";
      }
    },
  },
};
</script>

<style scoped>
h1{
  text-align: center;
  color: orangered;
  margin: 10px;
}

.krizovka-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
}

.input-section {
  width: 40%;
}

.input {
  text-align: center;
}

.action-button {
  padding: 10px 20px;
  background-color: dodgerblue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.text-field {
  width: 300px;
  padding: 10px;
  margin: 10px;
  border: 1px solid white;
  border-radius: 5px;
}

.button-generate {
  padding: 10px 20px;
  background-color: dodgerblue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 25px;
  transition: background-color 0.3s ease;
}

.button-generate:hover {
  background-color: darkblue;
}

.action-button:hover {
  background-color: darkblue;
}

.slova-container {
  font-size: medium;
  color: deepskyblue;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}



</style>
