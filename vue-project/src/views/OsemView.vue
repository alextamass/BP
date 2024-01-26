<template>
  <div class="container">
    <div class="half left">
      <h1 class="h1">Vytvorenie Osemsmerovky</h1>
      <br>
      <div class="input">
        <input
            @keyup.enter="addWord"
            :disabled="this.disableButtons"
            type="text" v-model="enteredWord"
            class="text-field"
            placeholder="Zadaj slovo, ktoré chceš pridať" />
        <button
            v-if="!disableButtons"
            @click="addWord"
            class="action-button">Pridať</button>
        <div class="entered-words">
          <p v-for="(word, index) in enteredWords" :key="index">
            {{ word }}
            <button @click="vymaz(index)">Vymazať</button>
          </p>
        </div>
      </div>
      <h2 v-if="disableButtons" class="error-message">
        Zadaný maximálny počet slov (10)
      </h2>
      <div>
        <button @click="toggleGrid" class="button-generate">Generovat</button>
      </div>
    </div>
    <div class="divider"></div>
    <div  class="half right">
      <h1 class="right-heading">Vygenerovaná osemsmerovka : </h1> <br>
      <div v-if="showGrid" class="crossword-grid" :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }">
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
  </div>
</template>

<script>
export default {
  name: "OsemView",
  data() {
    return {
      enteredWord: "",
      disableButtons: false,
      enteredWords: [],
      columns: 8,
      showGrid: false,
      grid: [],
    };
  },
  methods: {
    addWord() {
      if(this.enteredWords.length < 10) {
        if (this.enteredWord.trim() !== "") {
          this.enteredWords.push(this.enteredWord.trim());
          this.enteredWord = "";
        }
      }
      else{
        this.disableButtons = true;
        alert("Zadaný maximálny počet slov");
      }
    },
    vymaz(index) {
      this.enteredWords.splice(index, 1);
      if(this.disableButtons){
        if(this.enteredWords.length < 10){
          this.disableButtons = false;
        }
      }
    },
    toggleGrid() {
      if(!this.showGrid){
        this.showGrid = true;
      }
      if (this.showGrid) {
        this.findLongestWord();
      }
    },
    findLongestWord() {
      var characters = 0;
      var longest = 0
      for (var word of this.enteredWords) {
        for(var chars of word){
          characters++;
        }
        if(word.length >= longest){
          longest = word.length;
        }
      }
      this.columns = longest + 7;
      this.checkColumns()
    },
    checkColumns(){
      var sumOfChars = 0;
      for (var word of this.enteredWords) {
        for(var char in word){
          sumOfChars++;
        }
      }
      if(this.columns * this.columns < sumOfChars){
        this.columns++;
        this.checkColumns();
      }
      else{
        this.initializeGrid()
      }
    },
    initializeGrid() {
      if (this.showGrid) {
        this.grid = Array.from({ length: this.columns }, () =>
            Array.from({ length: this.columns }, () => ({ value: "", placeholder: "" }))
        );

        for (let i = 0; i < this.enteredWords.length; i++) {
          const word = this.enteredWords[i];

          if (word.length <= this.columns) {
            const startRow = Math.floor(Math.random() * this.columns);
            const startCol = Math.floor(Math.random() * this.columns);
            const placeHorizontally = Math.random() < 0.5;
            const placeRightToLeft = Math.random() < 0.5;

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
      } else {
        this.grid = Array.from({ length: this.columns }, () =>
            Array.from({ length: this.columns }, () => ({ value: "", placeholder: "" }))
        );
      }
      this.fillEmpty()
    },
    fillEmpty(){
      //vytvorit json so slovenskymi pismenami a naplnit prazdne miesta
    },
    updateCell(rowIndex, colIndex) {
      console.log(`Updated cell at row ${rowIndex}, column ${colIndex} with value: ${this.grid[rowIndex][colIndex].value}`);
    },
  },
};
</script>



<style scoped>
.entered-words {
  margin-top: 20px;
}

.entered-words p {
  margin: 5px 0;
  color: #007BFF;
  font-weight: bold;
}

.container {
  display: flex;
  height: 100vh;
}

.h1 {
  text-align: center;
  color: orangered;
}

.half {
  flex: 1;
  box-sizing: border-box;
  padding: 20px;
}

.input {
  text-align: center;
}

.left {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.right {
  background-color: #ffffff;
}

.text-field {
  width: 300px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.action-button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button-generate {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 25px;
}

.action-button:hover {
  background-color: #0056b3;
}

.divider {
  width: 1px;
  background-color: #ccc;
  height: 100%;
  margin: 0 10px;
}

.crossword-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 2px;
  background-color: #eee;
  border: 2px solid black;
  border-radius: 5px;
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

.crossword-input {
  width: 100%;
  height: 100%;
  border: none;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  outline: none;
}

.right-heading{
  color: black;
  text-align: center;
}

.error-message {
  background: red;
  padding: 10px;
  color: white;
  border-radius: 10px;
  position: relative;
  display: inline-block;
  box-shadow: 1px 1px 1px 1px #aaaaaa;
  margin-top: 10px;
}
</style>

