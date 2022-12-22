<template>
  <div class="antialiased bg-white fixed top-0 left-0 h-16 lg:h-20 z-10 w-full">
    <div class="sm:block hidden shadow h-full">
      <DesktopNav :menus="menus" />
    </div>
    <div class="sm:hidden shadow-xs h-full">
      <MobileNav :menus="menus" />
    </div>
  </div>
</template>

<script>
import DesktopNav from "@/components/App/Navbar/DesktopNav.vue";
import MobileNav from "@/components/App/Navbar/MobileNav.vue";

const menus = [
  {
    title: "Inspiration",
    subs: [
      {
        title: "Explore Design Work",
        descriptions: "Trending designs to inspire you",
        icon: "Explore",
        link: "",
        categories: [],
      },
      {
        title: "Explore Design Work",
        descriptions: "Trending designs to inspire you",
        icon: "Heart",
        link: "",
      },
      {
        title: "Explore Design Work",
        descriptions: "Trending designs to inspire you",
        icon: "Explore",
        link: "",
      },
    ],
  },
  {
    title: "Find Work",
    subs: [
      {
        title: "Explore Design Work",
        descriptions: "Trending designs to inspire you",
        icon: "Explore",
        link: "",
      },
      {
        title: "Explore Design Work",
        descriptions: "Trending designs to inspire you",
        icon: "Heart",
        link: "",
      },
      {
        title: "Explore Design Work",
        descriptions: "Trending designs to inspire you",
        icon: "Explore",
        link: "",
      },
    ],
  },
  {
    title: "Learn",
  },
  {
    title: "Go Pro",
  },
];

export default {
  components: { DesktopNav, MobileNav },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    menus() {
      return menus;
    },
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>
