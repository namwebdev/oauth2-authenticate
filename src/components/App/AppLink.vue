<template>
  <router-link :aria-label="props.name" :to="props" v-bind="attrs">
    <slot />
  </router-link>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  components: { RouterLink },
  props: {
    name: {
      type: String,
      default: () => "Home",
    },
    params: {
      type: Object,
      default: () => null,
    },
  },
  setup(props, { attrs }) {
    return { props, attrs };
  },
};
</script>
