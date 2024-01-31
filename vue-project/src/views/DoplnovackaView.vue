<template>
  <div>
    <h1 class="h1">Vytvorenie doplňovačky</h1>
    <div class="dropdown">
      <select class="dropdown-select" v-model="zvolenaKategoria">
        <option v-for="kategoria in kategorie" :key="kategoria">{{ kategoria }}</option>
      </select>
      <p>Zvolená kategória: {{ zvolenaKategoria }}</p>
    </div>
    <div v-if="zvolenaKategoria">
      <div v-for="item in data" :key="item.slovo">
        <p>{{ item.slovo }}</p>
        <img :src="item.obrazok" alt="obrazok" style="max-width: 200px;">
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
    };
  },
  computed: {
    data() {
      if (this.zvolenaKategoria) {
        return kategoriejson[this.zvolenaKategoria];
      } else {
        return [];
      }
    }
  }
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
</style>
