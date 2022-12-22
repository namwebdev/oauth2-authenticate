<template>
  <div>Github</div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import userApi from "@/api/Factory/user.js";
import authApi from "@/api/Factory/auth.js";

const route = useRoute();
const router = useRouter();
const store = useStore();

initGithubLogin();

async function initGithubLogin() {
  const { code } = route.query;
  const { token } = await authApi.githubLogin(code);
  if (token) {
    localStorage.setItem("token", token);
    const { data } = await userApi.getUser();
    if (data) {
      store.dispatch("onSetUser", data);
      router.push({ path: "/" });
    }
  }
}
</script>

<style lang=""></style>
