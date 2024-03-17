<template>
  <div class="bg">
    <div>
<!--      <h2 class="home-heading">Bakalárska práca Alex Tamáš</h2>-->
      <p class="home-paragraph">
        <br>
<!--        Vítam Vás na mojej stránke. V nasledujúcej sekcii si môžete vybrať typ krížovky, ktorý chcete vytvoriť.-->
      </p>
    </div>
    <Games/>
  </div>
</template>

<script>
import Games from "@/components/Games.vue";

export default {
  name: "HomeView",
  components: { Games },
};
</script>

<style scoped>
.home-heading {
  color: red;
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: white;
  font-family: Georgia;
  font-size: 3.5em;
  margin-bottom: 10px;
  text-align: center;
}

.home-paragraph {
  color: floralwhite;
  font-family: "Sans Serif Collection";
  font-size: 1.2em;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.bg{
  background-color: #1b1b1c;
}
</style>
