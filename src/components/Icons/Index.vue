<template>
  <component :is="icon" />
</template>

<script>
export default {
  components: {},
  props: {
    icon: {
      type: String,
      default: () => "",
    },
  },
};
</script>
