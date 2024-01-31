import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import KrizovkaView from "@/views/KrizovkaView.vue";
import OsemView from "@/views/OsemView.vue";
import DoplnovackaView from "@/views/DoplnovackaView.vue";

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
  ],
});

export default router;
