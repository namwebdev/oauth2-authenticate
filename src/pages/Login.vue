<template>
  <div class="login-container">
    <button
      :disabled="loading.facebook"
      class="facebook-btn social-btn"
      @click="hadleFacebookLogin"
    >
      <span v-show="!loading.facebook">
        <i class="fab fa-facebook-square"></i> Login with Facebook
      </span>
      <span v-show="loading.facebook" class="spinner" />
    </button>
    <button
      :disabled="loading.google"
      class="google-btn social-btn"
      @click.prevent="handleGoogleLogin"
    >
      <span v-show="!loading.google">
        <i class="fab fa-google"></i> Login with Google
      </span>
      <span v-show="loading.google" class="spinner" />
    </button>
    <a
      href="https://github.com/login/oauth/authorize?client_id=bbed30b54bd5c18153d3"
    >
      <button>Github</button>
    </a>
  </div>
</template>

<script>
import { reactive, onBeforeMount } from "vue";
import { initFacebookSdk } from "@/helpers/init-facebook-sdk.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import authApi from "@/api/Factory/auth.js";
import userApi from "@/api/Factory/user.js";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const loading = reactive({
      facebook: false,
      google: false,
    });
    onBeforeMount(() => initFacebookSdk());

    async function handleLoginWithToken(token) {
      if (token) {
        localStorage.setItem("token", token);
        const { data } = await userApi.getUser();
        if (data) {
          store.dispatch("onSetUser", data);
          router.push({ path: "/" });
        }
      }
    }

    return { handleLoginWithToken, loading };
  },
  methods: {
    async hadleFacebookLogin() {
      this.loading.facebook = true;
      try {
        const { authResponse } = await new Promise(FB.login);
        if (authResponse) {
          const data = await authApi.facebookLogin(authResponse.accessToken);
          await this.handleLoginWithToken(data.token || null);
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.loading.facebook = false;
      }
    },
    async handleGoogleLogin() {
      this.loading.google = true;
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) return;

        const { id_token } = googleUser.getAuthResponse();
        if (!id_token) return;

        const { token } = await authApi.googleLogin(id_token);
        this.handleLoginWithToken(token || null);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading.google = false;
      }
    },
  },
};
</script>

<style lang="css" scoped>
.login-container {
  --facebook: #4267b2;
  --google: #db4437;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.social-btn {
  @apply w-52 h-12 flex items-center justify-center text-white rounded hover:shadow-md hover:opacity-90;
}
.social-btn:disabled {
  @apply opacity-70;
}
.social-btn i {
  color: white;
  @apply text-2xl mr-2;
}
.facebook-btn {
  background-color: var(--facebook);
  @apply mb-2;
}
.google-btn {
  background-color: var(--google);
}
.spinner {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: conic-gradient(#0000 10%, white);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 5px), #000 0);
  animation: s3 1s infinite linear;
}
@keyframes s3 {
  to {
    transform: rotate(1turn);
  }
}
</style>
