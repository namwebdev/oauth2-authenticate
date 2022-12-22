import { createApp } from "vue";
import gAuthPlugin from "@/plugins/google-auth.js";
import auth from "@/plugins/auth.js";
import router from "./router.js";
import store from "./store.js";
import useStore from "@/hooks/useStore.js";
import App from "./App.vue";
import "@/assets/css/index.css";

import userApi from "@/api/Factory/user.js";

const { state, dispatch } = useStore();

userApi
  .getUser()
  .then(({ data }) => {
    dispatch("onSetUser", data);
    store.dispatch("onSetUser", data);
  })
  .catch((e) => {
    if (e.response.status === 401) return;
    console.log(e.response);
  })
  .finally(() =>
    createApp(App)
      .use(gAuthPlugin, {
        clientId: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
        scope: "profile email",
        prompt: "select_account",
      })
      .use(store)
      .use(router)
      .mount("#app")
  );
