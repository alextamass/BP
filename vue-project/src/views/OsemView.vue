<template>
  <div class="container">
    <div class="half left">
      <h1 class="h1">Vytvorenie Osemsmerovky</h1>
      <br>
      <div class="input">
        <input type="text" class="text-field" placeholder="Zadaj slovo, ktoré chceš pridať" />
        <button class="action-button">Pridať</button>
      </div>
    </div>
    <div class="divider"></div>
    <div class="half right">
    </div>
  </div>
</template>

<script>
export default {
  name: "OsemView",
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.h1 {
  text-align: center;
  color: orangered;
}

.half {
  flex: 1;
  box-sizing: border-box;
  padding: 20px;
}

.input {
  text-align: center;
}

.left {

}

.right {
  background-color: #ffffff;
}

.text-field {
  width: 300px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.action-button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #0056b3;
}

.divider {
  width: 1px;
  background-color: #ccc;
  height: 100%;
  margin: 0 10px;
}
</style>
