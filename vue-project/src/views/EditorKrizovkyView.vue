<template>
  <div class="velkost-container">
    <label for="zadanaVelkost" class="input-label">Zvol veľkost krížovky:</label>
    <input type="number" v-model="columns" class="number-input" :disabled="potvrdit">
    <button @click="potvrd()" style="margin:10px; text-align: center" class="action-button">Potvrdit</button>
  </div>

  <div style="text-align: center">
    <button v-if="vyberanieOdpovedi === false" @click="vybratOdpoved()" class="action-button">Vybrať odpoveď</button>
    <button v-if="vyberanieOdpovedi" @click="vybratOdpoved()" class="action-button">Ukoncit vyber</button>
  </div>
    <button style="float: right" class="action-button" v-if="showGrid" @click="printPDF()">Vytlačiť</button>

    <br>
  <div id="generovanaOsemsmerovka">
    <h1 v-if="showGrid" class="right-heading">Vytvorená krížovka : </h1>
    <div class="crossword-container">
      <div v-if="showGrid" class="crossword-grid" :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }">
        <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="crossword-row">
          <div v-for="(cell, colIndex) in row" :key="colIndex" class="crossword-cell">
            <input
                v-model="cell.value"
                :placeholder="cell.placeholder"
                class="crossword-input"
                :class="{ 'naplnene': cell.value && !cell.odpoved, 'oznacit': cell.odpoved, 'hidden' : this.hidden && rowIndex !== 0 && colIndex !== 0}"
                maxlength="1"
                :disabled="!potvrdit"
                @click="oznacitOdpoved(cell)"
            />
          </div>
        </div>
      </div>
    </div>
    <section v-if="showGrid">

      <div id="skryt" style="text-align: center">
        <label>Typ napovedy: </label>
        <select @change="zmenNapovedu()" id="typNapovedy" v-model="typNapovedy">
          <option value="Kreslená nápoveda">Kreslená nápoveda</option>
          <option value="Obrázková nápoveda">Obrázková nápoveda</option>
          <option value="Písomná nápoveda">Písomná nápoveda</option>
        </select>
      </div>
      <div id="skryt" v-if="this.zobrazNapovedu === 2" style="text-align: center">
        <label>Lekcia:</label>
        <select v-model="lekcia">
          <option v-for="item in lekcie" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
      <h1 class="hladaneSlova">Nápoveda</h1>

      <div v-if="this.zobrazNapovedu === 2" style="text-align: center" class="obrazky" v-for="(item, index) in polozky" :key="index">
        <div style="display: flex; flex-direction: column; align-items: center;">
          <img v-if="item.author === this.lekcia" style="width: 250px" :src="item.todo" alt="">
          <input style="width: 13%; text-align: center" class="number-input" type="number">
        </div>
      </div>


      <div style="text-align: center" v-if="zobrazNapovedu === 3" v-for="index in this.textField">
        <input type="text">
        <div id="skryt" v-if="index === this.textField">
          <button @click="minus()">
            <img style="width: 25px" src="https://static.vecteezy.com/system/resources/previews/009/267/401/original/minus-sign-icon-free-png.png" alt="" />
          </button>
          <button @click="plus()">
            <img style="width: 25px" src="https://static.vecteezy.com/system/resources/previews/009/266/327/original/plus-sign-icon-free-png.png" alt="" />
          </button>
        </div>
      </div>
      <div v-if="this.zobrazNapovedu === 1" class="kreslenie-center">
        <div class="kreslenie">

        </div>
      </div>
    </section>
  </div>


</template>

<script>
import abeceda from '../abeceda.json'
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import {onMounted, reactive} from "vue";

export default {
  name: "EditorKrizovkyView",
  data() {
    return {
      hidden: false,
      potvrdit: false,
      characters: abeceda,
      enteredWord: "",
      disableButtons: false,
      enteredWords: [],
      columns: 8,
      showGrid: false,
      grid: [],
      typNapovedy: "",
      zobrazNapovedu: 0,
      lekcia: 0,
      textField: 3,
      vyberanieOdpovedi: false,
    };
  },
  setup() {
    const state = reactive({
      todos: {}
    })

    function GetAll() {
      fetch("http://localhost:3000/todos")
          .then(res => res.json())
          .then(data => {
            state.todos = data
          })
    }

    onMounted(() => {
      GetAll()
    })
    return {state, GetAll}
  },
  computed: {
    polozky() {
      return this.state.todos.filter(item => item.author === this.lekcia);
    },
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
    plus(){
      this.textField = this.textField +1;
    },
    minus(){
      if(this.textField > 0) {
        this.textField--;
      }
    },
    zmenNapovedu(){
      if(this.typNapovedy === "Kreslená nápoveda"){
        this.zobrazNapovedu = 1;
      }
      if(this.typNapovedy === "Obrázková nápoveda"){
        this.zobrazNapovedu = 2;
      }
      if(this.typNapovedy === "Písomná nápoveda"){
        this.zobrazNapovedu = 3;
      }
    }
  },
  methods: {
    vybratOdpoved(){
      this.vyberanieOdpovedi = !this.vyberanieOdpovedi;
    },
    oznacitOdpoved(bunka){
      if (this.vyberanieOdpovedi) {
        bunka.odpoved = !bunka.odpoved;
      }
    },
    initializeGrid() {
      this.showGrid = true;
      this.grid = Array.from({ length: this.columns }, () =>
          Array.from({ length: this.columns }, () => ({ value: "", placeholder: "", odpoved: false }))
      );
    },
    potvrditPredOpustenim(event) {
      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
          if (this.grid[i][j].value.trim() !== '') {
            event.returnValue = 'Ste si istý, že chcete odísť? Všetky zmeny budú stratené.';
            return;
          }
        }
      }
    },
    printPDF() {
      this.hidden = true;
      setTimeout(() => {
        this.$nextTick(() => {
          window.print();
          this.hidden = false;
        });
      }, 1000);
    },
    potvrd(){
      this.potvrdit = true;
    },
    exportToPDF() {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: [792, 800]
      });

      const content = document.getElementById("generovanaOsemsmerovka");

      html2canvas(content, {
        scale: 1
      }).then(canvas => {
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        const imgWidth = 792;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
        pdf.save("Osemsmerovka.pdf");
      });
    },
  },
  mounted() {
    window.addEventListener('beforeunload', this.potvrditPredOpustenim);
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.potvrditPredOpustenim);
  },
  watch: {
    columns: {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.initializeGrid();
        }
      },
      immediate: true
    }
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
  color: orange;
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

.crossword-input, .crossword-input::placeholder {
  width: 100%;
  height: 100%;
  color: black;
  border: none;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  outline: none;
}

.right-heading{
  color: orange;
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

.kreslenie {
  width: 50%;
  height: 600px;
  background-color: white;
}

.kreslenie-center{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.oznacit {
  background-color: yellow;
  border: 1px solid black;
}

.prazdne {
  background-color: white;
}

.naplnene {
  background-color: lightgray;
  border: 1px solid black;
}

.hidden{
  font-size: 0;
}


@media print {
  .velkost-container,
  .action-button{
    display: none;
  }

  #skryt{
    display: none;
  }

  .crossword-cell  {
    border: none;
  }



}
</style>

