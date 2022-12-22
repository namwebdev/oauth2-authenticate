import { createStore } from "vuex";

export default createStore({
  state: {
    user: {},
  },
  actions: {
    onSetUser: ({ commit }, user) => {
      commit("setUser", user);
    },
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
  },
});
