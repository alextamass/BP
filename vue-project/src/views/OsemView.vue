<template>
  <div class="container">
    <div class="half left" id="skryt">
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
        Zadaný maximálny počet slov (8)
      </h2>
      <div>
        <button @click="toggleGrid" class="button-generate">Generovat</button>
      </div>
    </div>
    <div id="skryt" class="divider"></div>
    <div class="half right" v-if="showGrid">
      <button style="float: right" class="action-button" v-if="showGrid" @click="exportToPDF">Vytlačiť</button>
      <br>
      <div id="generovanaOsemsmerovka">
        <h1 v-if="showGrid" class="right-heading">Vygenerovaná osemsmerovka : </h1>
        <div class="crossword-container">
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
      <section v-if="showGrid">
        <h1 class="hladaneSlova">Hľadané slová</h1>
        <div  v-for="(word, index) in enteredWords" :key="index" class="words">
        {{index + 1}} :  {{word}}
        </div>
      </section>
      </div>
    </div>
  </div>
</template>

<script>
import abeceda from '../abeceda.json'
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';

export default {
  name: "OsemView",
  data() {
    return {
      characters: abeceda,
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
      if(this.enteredWords.length < 8) {
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
        if(this.enteredWords.length < 8){
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
            if(placeRightToLeft) {
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
                if ((row < this.columns && col < this.columns && this.grid[row][col].placeholder === "") ||
                    (row < this.columns && col < this.columns && this.grid[row][col].placeholder === char)) {
                  this.grid[row][col].placeholder = char;
                } else {
                  this.initializeGrid();
                  return;
                }
              }
            }
            else{
              for (let j = 0; j < word.length; j++) {
                const char = word[j];
                let row, col;
                if (placeHorizontally) {
                  row = startRow;
                  col = startCol - j;
                } else {
                  row = startRow - j;
                  col = startCol;
                }
                if (
                    row >= 0 &&
                    row < this.columns &&
                    col >= 0 &&
                    col < this.columns &&
                    (this.grid[row][col].placeholder === "" ||
                        this.grid[row][col].placeholder === char)
                ) {
                  this.grid[row][col].placeholder = char;
                } else {
                  this.initializeGrid();
                  return;
                }
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
      for(let i = 0; i < this.columns; i++){
        for(let j = 0; j < this.columns; j++){
          if(this.grid[i][j].placeholder === ""){
            const random = Math.floor(Math.random() * this.characters.numCharacters);
            this.grid[i][j].placeholder = this.characters.characters[random];
          }
        }
      }
    },
    exportToPDF() {
      // const pdf = new jsPDF({
      //   orientation: "landscape",
      //   unit: "pt",
      //   format: [792, 800]
      // });
      //
      // const content = document.getElementById("generovanaOsemsmerovka");
      //
      // html2canvas(content, {
      //   scale: 1
      // }).then(canvas => {
      //   const imgData = canvas.toDataURL("image/jpeg", 1.0);
      //   const imgWidth = 792;
      //   const imgHeight = (canvas.height * imgWidth) / canvas.width;
      //
      //   pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      //   pdf.save("Osemsmerovka.pdf");
      // });
      window.print();
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
  background-color: #1b1b1c;
}

.h1 {
  text-align: center;
  color: orangered;
}

.hladaneSlova {
  text-align: center;
  color: black;
  margin-top: 30px;
  margin-bottom: 30px;
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
  height: 100vh;
  overflow-y: auto;
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
  transition: background-color 0.3s ease;
}

.button-generate:hover {
  background-color: #0056b3;
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

.crossword-container {
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin-left: 60px;
  margin-bottom: 20px;
}

.words {
  margin-left: 20px;
  color: #333;
  font-size: 18px;
  text-align: left;
  display: inline-block;
  font-family: Georgia;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 5px;
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

@media print {
  .action-button{
    display: none;
  }

  #skryt{
    display: none;
  }
}
</style>

