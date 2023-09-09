<template>
  <router-link :to="{ name: routeName }">
    <button>{{ buttonText }}</button>
  </router-link>
</template>

<script>
/**
 * BlueButton Component
 *
 * The BlueButton component is a reusable button component with a blue background.
 */
export default {
  props: {
    routeName: String,
    buttonText: String,
  },
};
</script>

<style scoped>
button {
  background-color: #00a2e6;
  color: white;
  border: none;
  font-size: 14px;
  padding: 14px 18px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
  font-family: "Russo One";
}

button:hover {
  background-color: #0056b3;
}
</style>
