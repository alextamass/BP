<template>
  <div class="games-container">
    <div v-for="(image, index) in images" :key="index" class="game-item">
      <div class="image-container">
        <router-link :to="{ name: image.path }">
          <img :src="image.url" :alt="image.name" class="game-image" />
        </router-link>
      </div>
      <router-link :to="{ name: image.path }" class="router-link-button">
        {{ image.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Games",
  data() {
    return {
      images: [
        { url: 'https://www.studentskycasopis.sk/studentskycasopis.php?action=show_img&id=2270', name: 'Vytvoriť Osemsmerovku', path: "Osemsmerovka" },
        { url: 'https://img.grada.cz/_t_/media/sprinx.bookimages/138449_Kniha_obrazkove_krizovky_pro_deti_Kneblova_Grada_600_0_fit.jpg', name: 'Vytvoriť Krížovku', path: "Krizovka" },
        { url: 'https://www.vydarkus.eu/images/stories/virtuemart/product//obal5284.jpg', name : 'Vytvoriť doplnovačku', path: 'Doplnovacka'},
        { url: 'https://zvedavedeti.sk/wp-content/uploads/2021/09/kolaz-vytvor-si-svet-zvierat.jpg', name : 'Vytvoriť spájačku', path: 'Spajacka'}
      ],
    };
  },
};
</script>

<style scoped>
.games-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.game-item {
  width: 27%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 10px;
  text-align: center;
}

.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 8px;
  position: relative;
}

.image-container img {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.image-container:hover img {
  transform: scale(1.2);
  cursor: pointer;
  z-index: 1;
}

.game-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.router-link-button {
  display: block;
  margin-top: 10px;
  background-color: #007BFF;
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.router-link-button:hover {
  background-color: #0056b3;
}
</style>
