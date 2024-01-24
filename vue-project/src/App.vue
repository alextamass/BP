<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderKrizovky from "@/components/Header.vue";
import Navigation from "@/components/Navigation.vue";
</script>

<template>
  <navigation/>
  <header-krizovky/>
  <router-view />
</template>

<style scoped>

</style>
