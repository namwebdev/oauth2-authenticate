import { reactive } from "vue";

export default () => {
  const state = reactive({
    user: {},
  });
  function dispatch(name, payload) {
    switch (name) {
      case "onSetUser":
        state.user = payload;
        break;
      default:
        break;
    }
  }

  return { state, dispatch };
};
