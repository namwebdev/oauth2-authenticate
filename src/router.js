import { createRouter, createWebHistory } from "vue-router";
import store from "./store.js";
// layout
import AppLayout from "@/layouts/app.vue";
import FullscreenLayout from "@/layouts/fullscreen.vue";
//
import Login from "@/pages/Login.vue";
import GithubCallback from "@/pages/Callback/Github.vue";
import Home from "@/pages/Home.vue";
import Test from "@/pages/Test.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: FullscreenLayout,
    children: [{ path: "", component: Login }],
  },
  {
    path: "/callback/github",
    name: "github-callback",
    component: FullscreenLayout,
    children: [{ path: "", component: GithubCallback }],
  },
  {
    path: "/",
    name: "home",
    component: AppLayout,
    children: [{ path: "", component: Home }],
  },
  {
    path: "/test",
    name: "test",
    component: AppLayout,
    children: [{ path: "", component: Test }],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = Object.keys(store.state.user).length !== 0;
  if (to.path == "/login" || to.path == "/callback/github") {
    if (isAuth) {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    if (isAuth) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;

export function routerPush(name, params) {
  if (params) return router.push({ name, params });
  return router.push({ name });
}
