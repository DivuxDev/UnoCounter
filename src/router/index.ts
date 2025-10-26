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
      meta: { navbarTitle: "Players" },
    },
    {
      path: "/scores",
      name: "scores",
      component: () => import("@/views/ScoresView.vue"),
      meta: { navbarTitle: "Scores" },
    },
    {
      path: "/results",
      name: "results",
      component: () => import("@/views/Home.vue"),
      meta: { navbarTitle: "Results" },
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
