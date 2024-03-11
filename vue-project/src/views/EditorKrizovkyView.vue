<template>
  <body>
  <h1>Vytvorenie krížovky</h1>
  <div class="velkost-container">
    <label for="zadanaVelkost" class="input-label">Zvol velkost krizovky:</label>
    <input type="number" v-model="columns" class="number-input">
    <button @click="initializeGrid()" style="margin:10px; text-align: center" class="action-button">Potvrdit</button>
  </div>

  <div class="error-message" v-if="showError">
    <p>{{ errorMessage }}</p>
  </div>
  <div class="generovana-krizovka" v-if="showGrid" @keydown.arrow-left="moveLeft" @keydown.arrow-right="moveRight" @keydown.arrow-up="moveUp" @keydown.arrow-down="moveDown">
    <div class="crossword-grid" :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }">
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="crossword-row">
        <div v-for="(cell, colIndex) in row" :key="colIndex" class="crossword-cell">
          <input
              v-model="cell.value"
              :placeholder="cell.placeholder"
              class="crossword-input"
              @input="updateCell(rowIndex, colIndex)"
              maxlength="1"
              @keydown.enter="$event.target.blur()"
              @keydown.tab="moveNext"
              :tabindex="rowIndex * columns + colIndex"
          />
        </div>
      </div>
    </div>
  </div>
  <div style="text-align: center" v-for="(napoveda, index) in ocislovaneNapovedy" :key="index">
    <p>{{napoveda.plac}}.  {{napoveda.napoveda}}</p>
  </div>

  <div>
    <input v-model="txtOdpovede[0]" class="odpovede" placeholder="Zadaj nápovedu">
    <button @click="addTextField" class="action-button">Pridať textové pole</button>
    <div v-for="(index) in pridaneTxt" :key="index">
      <input v-model="txtOdpovede[index]" class="" placeholder="Zadaj odpoved">
    </div>
  </div>

  </body>
</template>


<script>
export default {
  name: "EditorKrizovkyView",
  data() {
    return {
      vyberanieOdpovedi : false,
      enteredWords: [],
      enteredWord : '',
      napoveda : '',
      napovedy: [],
      columns: 0,
      grid: [],
      showGrid: false,
      errorMessage: '',
      showError: false,
      vysledokKrizovky: '',
      ocislovaneNapovedy: [],
      placed: 0,
      odpoved: 0,
      hidden: false,
      zobrazitNapovedu: false,
      velkost : 0,
      txtOdpovede: [''],
      pridaneTxt: []
    };
  },
  methods: {
    initializeGrid() {
      this.showGrid = true;
      this.grid = Array.from({ length: this.columns }, () =>
          Array.from({ length: this.columns }, () => ({ value: "", placeholder: "" }))
      );
    },
    vytlacit(){
      this.hidden = !this.hidden;
    },
    showNapoveda(){
      this.zobrazitNapovedu = !this.zobrazitNapovedu;
    },
    moveUp(event) {
      const currentIndex = event.target.tabIndex;
      if (currentIndex % this.columns === 0) {
        event.preventDefault();
      } else {
        this.setFocus(currentIndex - 1);
      }
    },
    moveDown(event) {
      const currentIndex = event.target.tabIndex;
      if ((currentIndex + 1) % this.columns === 0 || currentIndex === this.grid.length * this.columns - 1) {
        event.preventDefault();
      } else {
        this.setFocus(currentIndex + 1);
      }
    },
    moveLeft(event) {
      const currentIndex = event.target.tabIndex;
      if (currentIndex < this.columns) {
        event.preventDefault();
      } else {
        this.setFocus(currentIndex - this.columns);
      }
    },
    moveRight(event) {
      const currentIndex = event.target.tabIndex;
      if (currentIndex >= this.grid.length * this.columns - this.columns) {
        event.preventDefault();
      } else {
        this.setFocus(currentIndex + this.columns);
      }
    },
    setFocus(index) {
      const targetInput = document.querySelector(`input[tabindex="${index}"]`);
      targetInput.focus();
    },
    addTextField() {
      this.pridaneTxt.push('');
    },
  },
  computed: {
    getVysledokKrizovky(){
      return this.vysledokKrizovky;
    },
    napovedaText(){
      if(this.zobrazitNapovedu){
        return "Skryť návod";
      }
      return "Zobraziť návod";
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


.generovana-krizovka{
  display: flex;
  justify-content: center;
  margin: 10px;
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
  gap: 1px;
  width: fit-content;
  background-color: white;
  border: 2px solid black;
  border-radius: 5px;
}

.slova-container {
  display: flex;
  flex-direction: column;
}

.riadok {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.entered-word,
.napoveda {
  padding: 10px;
  margin-right: 10px;
}

.entered-word {
  color: orangered;
}

.napoveda {
  color: orange;
}

.container {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete-button{
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.prazdne {
  background-color: white;
}

.naplnene {
  background-color: lightgray;
}

.empty{
  visibility: hidden;
}

.odpoved{
  background-color: orange;
}

.hidden{
  font-size: 0;
}

body{
  background-color: #1b1b1c;
}

.how-to{
  margin: 5px;
  background-color: deepskyblue;
  text-align: center;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
  color: black;
}

.velkost-container {
  max-width: 300px;
  margin: 20px auto;
  text-align: center;
}

.input-label {
  font-size: 18px;
  margin-bottom: 10px;
}

.number-input {
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
}

</style>
