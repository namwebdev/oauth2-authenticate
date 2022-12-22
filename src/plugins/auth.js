import router from "@/router.js";
import store from "@/store.js";
import userApi from "@/api/Factory/user.js";

const auth = {
  loginWithToken: async function (token) {
    if (!token) return;

    localStorage.setItem("token", token);
    const { data } = await userApi.getUser();
    if (data) {
      store.dispatch("onSetUser", data);
      router.push({ path: "/" });
    }
  },
  user() {
    return store.state.user || {};
  },
  logout: function () {
    localStorage.removeItem("token");
    store.dispatch("onSetUser", {});
    router.push({ path: "/login" });
  },
};

export default {
  install: (app, options) => {
    app.config.globalProperties.$auth = auth;
    app.provide("auth", options);
  },
};
