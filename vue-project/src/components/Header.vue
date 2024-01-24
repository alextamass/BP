<template>
  <header class="header-container">
    <div class="header-content">
      <h1 class="header-title">Editor Krížoviek AT</h1>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderKrizovky',
};
</script>

<style scoped>
.header-container {
  background-image: url('https://www.maxmax.sk/images/detailed/88/D%C4%9Btsk%C3%BD_obr%C3%A1zek_MAX_-_vzor_174.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40vh;
  margin: 0;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.header-title {
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: black;
  background-color: orange;
  color: chartreuse;
  font-size: 5em;
  margin: 0;
  outline: 6px solid black;
  padding: 10px;
}
</style>
