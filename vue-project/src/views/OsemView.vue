<template>
  <div class="container">
    <div class="half left">
      <h1 class="h1">Vytvorenie Osemsmerovky</h1>
      <br>
      <div class="input">
        <input @keyup.enter="addWord" type="text" v-model="enteredWord" class="text-field" placeholder="Zadaj slovo, ktoré chceš pridať" />
        <button @click="addWord" class="action-button">Pridať</button>
        <div class="entered-words">
          <p v-for="(word, index) in enteredWords" :key="index">
            {{ word }}
            <button @click="vymaz(index)">Vymazať</button>
          </p>
        </div>
      </div>
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
      enteredWords: [],
      columns: 8,
      showGrid: false,
      grid: [],
    };
  },
  methods: {
    addWord() {
      if (this.enteredWord.trim() !== "") {
        this.enteredWords.push(this.enteredWord.trim());
        this.enteredWord = "";
      }
    },
    vymaz(index) {
      this.enteredWords.splice(index, 1);
    },
    toggleGrid() {
      this.showGrid = !this.showGrid;
      if (this.showGrid) {
        this.findLongestWord();
      }
    },
    findLongestWord() {
      var max = 0;
      for (var word of this.enteredWords) {
        if (word.length >= max) {
          max = word.length;
        }
      }
      this.columns = max + 1;
      this.initializeGrid();
    },
    initializeGrid() {
      if (this.showGrid) {
        this.grid = Array.from({ length: this.columns }, () =>
            Array.from({ length: this.columns }, () => ({ value: "", placeholder: "" }))
        );

        for (let i = 0; i < this.enteredWords.length; i++) {
          const word = this.enteredWords[i];
          const startRow = i % this.columns;
          const startCol = Math.floor(i / this.columns);

          for (let j = 0; j < word.length; j++) {
            const char = word[j];
            const row = (startRow + j) % this.columns;
            const col = startCol;

            if (row < this.columns && col < this.columns) {
              this.grid[row][col].placeholder = char;
            }
          }
        }
      } else {
        this.grid = Array.from({ length: this.columns }, () =>
            Array.from({ length: this.columns }, () => ({ value: "", placeholder: "" }))
        );
      }
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
</style>

