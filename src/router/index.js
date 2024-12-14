import { createRouter, createWebHistory } from "vue-router";
import TabOne from "@/components/TabOne.vue";
import TabTwo from "@/components/TabTwo.vue";

const routes = [
  { path: "/one", name: "One", component: TabOne },
  { path: "/two", name: "Two", component: TabTwo },
  { path: "/:catchAll(.*)", redirect: "/one" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
