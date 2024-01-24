import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import KrizovkaView from "@/views/KrizovkaView.vue";
import OsemView from "@/views/OsemView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/KrizovkaView',
      name: 'Krizovka',
      component: KrizovkaView,
    },
    {
      path: '/OsemView',
      name: 'Osemsmerovka',
      component: OsemView,
    },
  ],
});

export default router;
