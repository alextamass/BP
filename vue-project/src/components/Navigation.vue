<template>
  <nav class="navigation-container">
    <router-link to="/" class="navigation-button">Home</router-link>
    <router-link to="/login" class="navigation-button">Prihlásenie</router-link>
    <router-link to="/registration" class="navigation-button">Registrácia</router-link>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
};
</script>

<style scoped>
.navigation-container {
  display: flex;
  justify-content: space-around;
  background-color: #333;
  padding: 10px;
}

.navigation-button {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border: 1px solid #fff;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
}
</style>
