<template>
  <div>
    <h1 class="h1">Vytvorenie doplňovačky</h1>
    <div class="dropdown">
      <select class="dropdown-select" v-model="zvolenaKategoria">
        <option v-for="kategoria in kategorie" :key="kategoria">{{ kategoria }}</option>
      </select>
      <p>Zvolená kategória: {{ zvolenaKategoria }}</p>
    </div>
    <div class="buttonDiv">
      <button @click="generate()" class="generovatButton">Generovať</button>
    </div>
    <div v-if="generovat">
      <div v-for="item in zvolenaKategoriaData" :key="item.slovo">
        <div class="slovo">
          <p>{{ item.slovo }}</p>
        </div>
        <div class="obrazok">
          <img :src="item.obrazok" alt="obrazok" style="max-width: 200px;">
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
    generate(){
      this.generovat = true;
      if(this.zvolenaKategoriaData.length > 0){
        this.zvolenaKategoriaData.splice(0, this.zvolenaKategoriaData.length)
      }
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

    },
  },
};
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

.slovo {
  text-align: right;
  font-size: 30px;
  margin-right: 30%;
}

.obrazok {
  justify-self: center;
  margin-left: 30%;
}



</style>
