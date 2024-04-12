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
  min-height: 30vh;
  margin: 0;
}

.header-content {
  max-width: 90%;
  margin: 0 auto;
}

.header-title {
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: black;
  background-color: orange;
  color: chartreuse;
  font-size: 3em;
  margin: 0;
  padding: 10px;
  outline: 4px solid black;
}
</style>
