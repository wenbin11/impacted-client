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
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
  font-family: "Open Sans", sans-serif;
  box-sizing: border-box;
  user-select: none;
}
</style>
