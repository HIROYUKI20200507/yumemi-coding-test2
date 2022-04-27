<template>
  <div class="flex">
    <NavBar />
    <TopFront />
  </div>
</template>

<script>
import TopFront from "../pages/TopFront.vue";
import NavBar from "../components/NavBar.vue";

export default {
  name: "HomeView",

  components: {
    TopFront,
    NavBar,
  },
};
</script>
