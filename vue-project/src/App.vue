<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderKrizovky from "@/components/Header.vue";
import Navigation from "@/components/Navigation.vue";
</script>

<template>
  <div id="app">
  <navigation/>
  <header-krizovky/>
  </div>
  <router-view />
</template>

<style scoped>

@media print {
  #app{
    display: none;
  }
}


</style>
