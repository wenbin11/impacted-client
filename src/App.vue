<template>
  <!-- App Container -->
  <div id="app">
    <!-- Navigation Bar Component -->
    <nav-bar />
    <!-- Router View for Dynamic Component Rendering -->
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

/**
 * App Component
 *
 * The App component serves as the entry point for your Vue.js application.
 * It includes a navigation bar and a router view to render different components based on the route.
 */
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

body,
html {
  background-color: #f0f0f0;
}
</style>
