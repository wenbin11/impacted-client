<template>
  <router-link :to="{ name: routeName }">
    <button>{{ buttonText }}</button>
  </router-link>
</template>

<script>
export default {
  props: {
    routeName: String,
    buttonText: String,
  },
  methods: {
    navigateToRoute() {
      this.$router.push({ name: this.routeName });
    },
  },
};
</script>

<style scoped>
button {
  background-color: #00a2e6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 20px;
  font-weight: bold;
}

button:hover {
  background-color: #0056b3;
}
</style>
