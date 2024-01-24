<template>
  <div class="heading-section">
    <h2>Vytvorenie Krizovky</h2>
  </div>
  <div class="krizovka-container">
    <div class="input-section">
      <label for="titleInput">Title:</label>
      <input type="text" id="titleInput" v-model="title" />

      <label for="contentInput">Content:</label>
      <input type="text" id="contentInput" v-model="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: "KrizovkaView",
  data() {
    return {
      title: "",
      content: "",
    };
  },
};
</script>

<style scoped>
.krizovka-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
}

.input-section {
  width: 40%;
}

.heading-section {
  text-align: center;
}

</style>
