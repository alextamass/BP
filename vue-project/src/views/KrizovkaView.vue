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
        style="margin-top: 10px;"
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
      <button @click="checkWords()" class="button-generate">Generovat</button>
    </div>
  </div>
  <div class="generovana-krizovka" v-if="showGrid">
    <div class="crossword-grid" :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }">
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="crossword-row">
        <div v-for="(cell, colIndex) in row" :key="colIndex" class="crossword-cell">
          <input
              v-model="cell.value"
              :placeholder="cell.placeholder"
              class="crossword-input"
              @input="updateCell(rowIndex, colIndex)"
              readonly
          />
        </div>
     </div>
    </div>
  </div>
  <div class="error-message" v-if="showError">
    <p>{{ errorMessage }}</p>
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
      columns: 15,
      grid: [],
      showGrid: false,
      errorMessage: '',
      showError: false,
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
    checkWords(){
      if(this.enteredWords.length < 2){
        this.errorMessage = "Zadany prilis maly pocet slov";
        this.showError = true;
      }
      else {
        for(let i = 0; i < this.enteredWords.length; i ++){
          let word = this.enteredWords[i];
          for(let j = 0; j < this.enteredWords.length; j ++){
            let comparedWord = this.enteredWords[j];
            let maSpolocne = false;
            if(j === i) continue;
            for(let g = 0; g < word.length; g++){
              let char = word.charAt(g);
              if(comparedWord.includes(char)){
                maSpolocne = true;
                break;
              }
            }
            if(maSpolocne === false){
              this.errorMessage = "Zadane slova nemaju ziadny spolocny znak" + word;
              this.showError = true;
              return;
            }
          }
        }
        //upravit tak, ze staci aby mal spolocny znak len s jednym slovom, nie so vsetkymi
        this.showError = false;
        this.initializeGrid();
      }
    },
    initializeGrid() {
      this.showGrid = true;
      this.grid = Array.from({ length: this.columns }, () =>
          Array.from({ length: this.columns }, () => ({ value: "", placeholder: "" }))
      );

      for (let i = 0; i < this.enteredWords.length; i++) {
        const word = this.enteredWords[i];

        if (word.length <= this.columns) {
          let startRow = Math.floor(Math.random() * this.columns);
          let startCol = Math.floor(Math.random() * this.columns);
          const placeHorizontally = Math.random() < 0.5;

          if (placeHorizontally && startCol + word.length > this.columns) {
            startCol = this.columns - word.length;
          } else if (!placeHorizontally && startRow + word.length > this.columns) {
            startRow = this.columns - word.length;
          }

          for (let j = 0; j < word.length; j++) {
            const char = word[j];
            let row, col;

            if (placeHorizontally) {
              row = startRow;
              col = startCol + j;
            } else {
              row = startRow + j;
              col = startCol;
            }

            if (row < this.columns && col < this.columns && this.grid[row][col].placeholder === "") {
              this.grid[row][col].placeholder = char;
            } else {
              this.initializeGrid();
              return;
            }
          }
        }
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

.generovana-krizovka{
  display: flex;
  justify-content: center;
  margin: 10px;
}

.input-section {
  width: 40%;
}

.crossword-input {
  width: 100%;
  height: 100%;
  border: none;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  outline: none;
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

.error-message {
  background-color: mistyrose;
  color: firebrick;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.button-generate {
  padding: 10px 20px;
  background-color: dodgerblue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
  transition: background-color 0.3s ease;
}

.button-generate:hover {
  background-color: darkblue;
}

.action-button:hover {
  background-color: darkblue;
}

.slova-container {
  margin-top: 10px;
  font-size: medium;
  color: deepskyblue;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.crossword-row {
  display: flex;
  flex-direction: column;
}

.crossword-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid black;
  height: 40px;
  width: 40px;
}

.crossword-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 2px;
  width: fit-content;
  background-color: #eee;
  border: 2px solid black;
  border-radius: 5px;
}


</style>
