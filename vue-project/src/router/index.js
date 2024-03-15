import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import KrizovkaView from "@/views/KrizovkaView.vue";
import OsemView from "@/views/OsemView.vue";
import DoplnovackaView from "@/views/DoplnovackaView.vue";
import SpajackaView from "@/views/SpajackaView.vue";
import EditorKrizovkyView from "@/views/EditorKrizovkyView.vue";
import EditorOsemsmeroviekView from "@/views/EditorOsemsmeroviekView.vue";
import adminView from "@/views/AdminView.vue";

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
    {
      path: '/EditKrizovka',
      name: 'EditKrizovka',
      component: EditorKrizovkyView,
    },
    {
      path: '/EditOsemsmerovka',
      name: 'EditOsemsmerovka',
      component: EditorOsemsmeroviekView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: adminView,
    },
  ],
});



export default router;
