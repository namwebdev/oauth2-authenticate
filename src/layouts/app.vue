<template>
  <section class="overflow-x-hidden mt-16 md:mt-20">
    <Navbar />
    <router-view />
    <Footer />
  </section>
</template>

<script>
import Navbar from "@/components/App/Navbar/Index.vue";
import Footer from "@/components/App/Footer.vue";

export default {
  name: "AppLayout",
  components: { Navbar, Footer },
};
</script>
