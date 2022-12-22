<template>
  <div>
    <div>Hello <img :src="user.avatar" :alt="user.name" /> {{ user.name }}</div>
  </div>
  <button @click="logout">Logout</button>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const user = computed(() => store.state.user || {});

    function logout() {
      localStorage.removeItem("token");
      store.dispatch("onSetUser", {});
      router.push({ path: "/login" });
    }

    return { user, logout };
  },
};
</script>
