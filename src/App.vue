<template>
  <div id="app">
    <nav-bar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: { NavBar },
};
</script>

<style>
* {
  background-color: #f5f5f5;
  font-family: "Open Sans", sans-serif;
  margin: 0px;
}
</style>
