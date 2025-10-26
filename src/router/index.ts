import { createRouter, createWebHistory } from "vue-router";
import App from "@/App.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/",
      name: "players",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/",
      name: "scores",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/",
      name: "results",
      component: () => import("@/views/Home.vue"),
    },
  ],
});

export default router;
