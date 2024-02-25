<template>
  <body>
  <h1 class="h1">Vytvorenie spájačky</h1>
  <div class="dropdown">
    <select class="dropdown-select" v-model="zvolenaKategoria">
      <option v-for="kategoria in kategorie" :key="kategoria">{{ kategoria }}</option>
    </select>
    <p>Zvolená kategória: {{ zvolenaKategoria }}</p>
  </div>
  <div class="inputContainer">
    <input v-if="zvolenaKategoria" v-model="zvolenaDlzka" type="number" min="0" :max="getMaxDlzka" class="dlzkaInput">
  </div>
  <div class="buttonDiv">
    <button @click="generate()" class="generovatButton">Generovať</button>
  </div>
  <br>
  <h2 v-if="generovat" class="h1">Pospájaj slová k správnym obrázkom</h2>
  <div v-for="(item, index) in zvolenaKategoriaData" :key="index">
    <div class="riadok">
      <div class="obrazok">
        <img :src="item.obrazok" alt="obrazok" style="max-width: 200px;">
      </div>
      <div class="slovo">
        <p>{{zamiesaneSlova[index]}}</p>
      </div>
    </div>
  </div>
  </body>
</template>

<script>

import kategoriejson from '../kategorie.json';

export default {
  name: "SpajackaView",
  data() {
    return {
      generovat: false,
      kategorie: kategoriejson.kategorie,
      zvolenaKategoria: '',
      zvolenaDlzka: 0,
      zvolenaKategoriaData: [],
      zamiesaneSlova: [],
      maxdlzka: 0,
    };
  },
  computed: {
    getMaxDlzka() {
      this.maxdlzka = kategoriejson[this.zvolenaKategoria].length
      return this.maxdlzka;
    }
  },
  methods: {
    generate(){
      this.generovat = true;
      this.zvolenaKategoriaData = [];
      let i = 0;
      while (i < this.zvolenaDlzka){
        const index = Math.floor(Math.random() * kategoriejson[this.zvolenaKategoria].length);
        const novyItem = kategoriejson[this.zvolenaKategoria][index];
        let duplikat = false;
        for(const item of this.zvolenaKategoriaData){
          if(novyItem.slovo === item.slovo){
            duplikat = true;
            break;
          }
        }
        if(!duplikat){
          this.zvolenaKategoriaData.push(novyItem);
          i++;
        }
      }
      this.zamiesaj();
    },
    zamiesaj(){
      this.zamiesaneSlova = [];
      for(let i = 0; i < this.zvolenaDlzka; i++) {
        const item = this.zvolenaKategoriaData[i];
        this.zamiesaneSlova.push(item.slovo);
      }
      for(let i = 0; i < this.zvolenaDlzka * 2; i++){
        const index = Math.floor(Math.random() * this.zvolenaDlzka);
        const item = this.zamiesaneSlova[index];
        this.zamiesaneSlova.splice(index,1);
        this.zamiesaneSlova.push(item);
      }
    },
  },

}
</script>

<style scoped>
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
.inputContainer{
  display: flex;
  justify-content: center;
}

.dlzkaInput {
  width: 7%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
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

body{
  background-color: #1b1b1c;
}


</style>