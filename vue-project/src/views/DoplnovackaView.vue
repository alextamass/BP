<template>
  <div>
    <h1 id="skryt" class="h1">Vytvorenie doplňovačky</h1>
    <div id="skryt" class="dropdown">
      <select class="dropdown-select" v-model="zvolenaKategoria">
        <option v-for="kategoria in kategorie" :key="kategoria">{{ kategoria }}</option>
      </select>
      <p id="skryt">Zvolená kategória: {{ zvolenaKategoria }}</p>
    </div>
    <div id="skryt" class="buttonDiv">
      <button @click="generate()" class="generovatButton">Generovať</button>
      <button style="margin-left: 5px;" class="generovatButton" @click="printPDF()">Vytlačiť</button>
    </div>
    <h1 style="text-align: center; color: orangered">Doplň správne písmená</h1>
    <div id="osemsmerovka" v-if="generovat" class="tlac">
      <div v-for="item in zvolenaKategoriaData" :key="item.slovo">
        <div class="riadok">
          <div class="obrazok">
            <img :src="item.obrazok" alt="obrazok" style="max-width: 200px;">
          </div>
          <div class="slovo">
           <p>{{ vymazChar(item.slovo)}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import kategoriejson from '../kategorie.json';


export default {
  name: "DoplnovackaView",
  data() {
    return {
      kategorie: kategoriejson.kategorie,
      zvolenaKategoria: '',
      generovat: false,
      zvolenaKategoriaData: [],
    };
  },
  methods: {
    printPDF() {
      window.print();
    },
    generate() {
      this.generovat = true;
      this.zvolenaKategoriaData = [];
      let i = 0;
      while (i < 3) {
        const index = Math.floor(Math.random() * kategoriejson[this.zvolenaKategoria].length);
        const novyItem = kategoriejson[this.zvolenaKategoria][index];
        console.log("testZacyklenia");
        let duplikat = false;
        for (const item of this.zvolenaKategoriaData) {
          if (item.slovo === novyItem.slovo) {
            duplikat = true;
            break;
          }
        }
        if (!duplikat) {
          this.zvolenaKategoriaData.push(novyItem);
          i++;
        }
      }
      this.vymazChar();
    },
    vymazChar(slovo) {
      const index = Math.floor(Math.random() * slovo.length);
      const noveSlovo = slovo.substring(0, index) + '_' + slovo.substring(index + 1);
      return noveSlovo
    },
  }
};
</script>

<style scoped>
@media print {
  .h1 {
    visibility: hidden;
  }
  .dropdown {
    visibility: hidden;
  }
  .generovatButton{
    visibility: hidden;
  }
  #osemsmerovka {
    visibility: visible;
  }
}

.h1 {
  text-align: center;
  color: orangered;
  margin: 10px;
}

.dropdown {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dropdown-select {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgb(128, 128, 128);
  font-size: 16px;
  background-color: white;
  cursor: pointer;
  width: 200px;
  transition: border-color 0.3s ease;
  margin: 10px;
}

.dropdown-select:hover {
  border-color: #007bff;
}

.generovatButton {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.generovatButton:hover {
  background-color: #0056b3;
}

.buttonDiv{
  text-align: center;
  margin: 10px;
}

.riadok{
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.slovo {
  text-align: right;
  font-size: 30px;
}

.obrazok {
  justify-self: center;
  margin-right: 10%;
}

@media print {
  .velkost-container,
  .action-button{
    display: none;
  }

  #skryt{
    display: none;
  }

}


</style>
