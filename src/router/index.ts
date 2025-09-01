import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw, RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "../store/auth.ts";

import Login from "../pages/Login.vue";
import Home from "../pages/Home.vue";
import Callback from "../pages/Callback.vue";

const routes: RouteRecordRaw[] = [
  { path: "/login", component: Login, meta: { public: true } },
  { path: "/callback", component: Callback, meta: { public: true } },
  { path: "/", component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to: RouteLocationNormalized) => {
  const auth = useAuthStore();

  if (to.path === "/callback") return;
  if ((!to.meta.public) && !auth.isAuthenticated) {
    await auth.fetchMe();
    if (!auth.isAuthenticated) return "/login";
  }
});

export default router;
