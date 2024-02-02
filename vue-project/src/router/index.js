import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import KrizovkaView from "@/views/KrizovkaView.vue";
import OsemView from "@/views/OsemView.vue";
import DoplnovackaView from "@/views/DoplnovackaView.vue";
import SpajackaView from "@/views/SpajackaView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/Krizovka',
      name: 'Krizovka',
      component: KrizovkaView,
    },
    {
      path: '/Osemsmerovka',
      name: 'Osemsmerovka',
      component: OsemView,
    },
    {
      path: '/Doplnovacka',
      name: 'Doplnovacka',
      component: DoplnovackaView,
    },
    {
      path: '/Spajacka',
      name: 'Spajacka',
      component: SpajackaView,
    },
  ],
});

export default router;
