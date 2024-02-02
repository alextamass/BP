<template>
  <h1 class="h1">Vytvorenie spájačky</h1>
  <div class="dropdown">
    <select class="dropdown-select" v-model="zvolenaKategoria">
      <option v-for="kategoria in kategorie" :key="kategoria">{{ kategoria }}</option>
    </select>
    <p>Zvolená kategória: {{ zvolenaKategoria }}</p>
  </div>
  <div class="inputContainer">
    <input v-if="zvolenaKategoria" type="number" min="0" :max="getMaxDlzka" class="dlzkaInput">
  </div>
  <div class="buttonDiv">
    <button @click="generate()" class="generovatButton">Generovať</button>
  </div>
  <div v-for="item in zvolenaKategoriaData" :key="item.slovo">
    <p>{{item.slovo}}</p>
  </div>
</template>

<script>

import kategoriejson from '../kategorie.json';

export default {
  name: "SpajackaView",
  data() {
    return {
      kategorie: kategoriejson.kategorie,
      zvolenaKategoria: '',
      zvolenaKategoriaData: [],
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
      this.zvolenaKategoriaData = kategoriejson[this.zvolenaKategoria];
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


</style>