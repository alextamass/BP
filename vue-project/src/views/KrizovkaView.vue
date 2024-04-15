<template>
  <body>
  <h1>Vytvorenie krížovky</h1>
  <button @click="showNapoveda" class="action-button" style="margin-left: 10px">{{this.napovedaText}}</button>
  <div class="input">
    <input
        @keyup.enter="addWord"
        type="text" v-model="enteredWord"
        class="text-field"
        placeholder="Zadaj slovo, ktoré chceš pridať" />
    <input
        @keyup.enter="addWord"
        type="text" v-model="napoveda"
        class="text-field"
        placeholder="Zadaj nápovedu" />
    <br>
    <button
        style="margin-top: 10px;"
        @click="addWord"
        class="action-button">Pridať</button>
    <div class="container">
      <div class="slova-container">
        <div v-for="(word, index) in enteredWords" :key="index" class="riadok">
          <div class="entered-word">Slovo: {{ word }}</div>
          <div class="napoveda">Napoveda: {{ napovedy[index] }}</div>
          <button class="delete-button" @click="vymaz(index)">
            <img style="width: 25px" src="https://cdn-icons-png.flaticon.com/512/3687/3687412.png" alt="" />
          </button>
          <button class="delete-button" style="margin-left: 7px" @click="setVysledokKrizovky(index)">
            <img style="width: 25px" src="https://freepngimg.com/thumb/finish_line/26665-3-finish-line-transparent-thumb.png" alt="" />
          </button>
        </div>
      </div>
    </div>
    <p v-if="this.vysledokKrizovky !== ''">Hladane slovo : {{this.getVysledokKrizovky}}</p>
    <div>
      <button @click="checkWords()" class="button-generate">Generovat</button>
      <button @click="vytlacit()" class="button-generate">Vytlacit</button>
    </div>
  </div>
  <div class="how-to" v-if="zobrazitNapovedu">
  <p>
    Zadaj aspoň dve slová s nápovedou, ktoré majú aspoň jeden spoločný znak. <br>
    Kliknutím na tlačítko
    <button class="delete-button">
      <img style="width: 25px" src="https://freepngimg.com/thumb/finish_line/26665-3-finish-line-transparent-thumb.png" alt="" />
    </button>
    pri slove označíš odpoveď. <br> Kliknutím na tlačítko Generovať sa krížovka vygeneruje.
  </p>
  </div>
  <div class="error-message" v-if="showError">
    <p>{{ errorMessage }}</p>
  </div>
  <div class="generovana-krizovka" v-if="showGrid">
    <div class="crossword-grid" :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }">
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="crossword-row">
        <div v-for="(cell, colIndex) in row" :key="colIndex" class="crossword-cell" :class="{'empty': !cell.placeholder }"
        >
          <input
              v-model="cell.value"
              :placeholder="cell.placeholder"
              class="crossword-input"
              :class="{ 'naplnene': cell.placeholder, 'prazdne': !cell.placeholder, 'odpoved' : rowIndex === this.odpoved, 'hidden' : this.hidden && rowIndex !== 0 }"
              @input="updateCell(rowIndex, colIndex)"
              readonly
          />
        </div>
     </div>
    </div>
  </div>
  <div style="text-align: center" v-for="(napoveda, index) in ocislovaneNapovedy" :key="index">
    <p>{{napoveda.plac}}.  {{napoveda.napoveda}}</p>
  </div>
  </body>
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
      columns: 20,
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
      //upravit aby sa vsetky porovnavali s odpovedou a nie navzajom
      if(this.enteredWords.length < 2){
        this.errorMessage = "Zadany prilis maly pocet slov";
        this.showError = true;
      }
      else {
        for(let i = 0; i < this.enteredWords.length; i ++){
          let word = this.enteredWords[i];
          let maSpolocne = false;
          for(let j = 0; j < this.enteredWords.length; j ++){
            let comparedWord = this.enteredWords[j];
            if(j === i || maSpolocne) continue;
            for(let g = 0; g < word.length; g++){
              let char = word.charAt(g);
              if(comparedWord.includes(char)){
                maSpolocne = true;
                break;
              }
            }
            if(maSpolocne === false){
              this.errorMessage = "Zadane slova nemaju ziadny spolocny znak : " + word;
              this.showError = true;
              return;
            }
          }
        }
        this.showError = false;
        this.initializeGrid();
      }
    },
    initializeGrid() {
      this.ocislovaneNapovedy = [];
      this.placed = 0;
      this.showGrid = true;
      this.grid = Array.from({ length: this.columns }, () =>
          Array.from({ length: this.columns }, () => ({ value: "", placeholder: "" }))
      );

      //vpisat vysledok prvy
      const startColumn = Math.floor(this.columns / 2);
      this.odpoved = startColumn;
      for(let i = 0; i < this.vysledokKrizovky.length; i ++){
        this.grid[startColumn][i].placeholder = this.vysledokKrizovky.charAt(i);
      }

      for (let i = 0; i < this.enteredWords.length; i++) {
        const word = this.enteredWords[i];
        const napoveda = this.napovedy[i];
        //nevpisat odpoved dalsi krat
        if (word === this.vysledokKrizovky) continue;
        const common = this.findCommonChar(word);
        if (common.length === 0) {
          console.log(`No common characters found for ${word}`);
          continue;
        }
        //vsetky spolocne prejst
        for(let j = 0; j < common.length; j++){
          const startRow = startColumn - common[j].i;
          const startCol = common[j].j;
          if(this.placeWord(word,startRow,startCol, startColumn)){
            this.placed++;
            let plac = this.placed
            this.grid[0][startCol].placeholder = this.placed;
            this.ocislovaneNapovedy.push({plac,napoveda});
            break;
          }
        }
      }
    },
    placeWord(word, startRow, startCol, odpovedCol){
      // je cely riadok okrem odpovede prazdny
      for (let i = 0; i < this.columns; i++){
        if(!(this.grid[i][startCol].placeholder === '') && i !== odpovedCol) return false;
      }
      for (let j = 0; j < word.length; j++) {
        const char = word.charAt(j);
        if (startRow + j < this.columns && startCol + j < this.columns) {
          //neprepisovat uz vlozene slovo
          if(this.grid[startRow + j][startCol].placeholder === '') {
            //zistit ci aj druha strana je prazdna
            this.grid[startRow + j][startCol].placeholder = char;
          }
        } else {
          console.log('Prekrocilo hranice');
          break;
        }
      }
      return true;
    },
    findCommonChar(slovo){
      console.log(slovo+"test");
      let common = [];
      for(let i = 0; i < slovo.length; i++){
        let char = slovo.charAt(i);
        for(let j = 0; j < this.vysledokKrizovky.length; j++){
          if(char === this.vysledokKrizovky.charAt(j)){
            common.push({j,i});
            console.log("Spolocny :", char, "pozicia :", j);
          }
        }
      }
      return common;
    },
    vymaz(index){
      this.enteredWords.splice(index,1);
      this.napovedy.splice(index,1);
    },
    setVysledokKrizovky(index){
      this.vysledokKrizovky = this.enteredWords[index];
    },
    vytlacit(){
      this.hidden = !this.hidden;
      setTimeout(() => {
        this.$nextTick(() => {
          window.print();
          this.hidden = false;
        });
      }, 1000);
    },
    showNapoveda(){
      this.zobrazitNapovedu = !this.zobrazitNapovedu;
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
</style>
