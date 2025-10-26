import { createRouter, createWebHistory } from "vue-router";
import App from "@/App.vue";
import { useCommonStore } from "@/stores/Common";
import { storeToRefs } from "pinia";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/players",
      name: "players",
      component: () => import("@/views/PlayersView.vue"),
      meta: { navbarTitle: "Jugadores" },
    },
    {
      path: "/scores",
      name: "scores",
      component: () => import("@/views/ScoresView.vue")
    },
    {
      path: "/results",
      name: "results",
      component: () => import("@/views/ResultsView.vue"),
      meta: { navbarTitle: "Partida en curso" },
    },
  ],
});

router.beforeEach((to, from) => {
  const commonStore = useCommonStore();
  const { navbarTitle } = storeToRefs(commonStore);
  to.meta.navbarTitle
    ? (navbarTitle.value = to.meta.navbarTitle as string)
    : (navbarTitle.value = "");
  return true;
});

export default router;
