<template>
  <div v-if="visible" class="modal">
    <div class="modal-content">
      <img src="/images/error.png" alt="error" />
      <h1>{{ header }}</h1>
      <p>{{ message }}</p>
      <div class="button-container">
        <button @click="confirm">OK</button>
        <button @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    header: String,
    message: String,
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
.modal {
  /* Styles to create a modal overlay */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 100%;
  max-width: 500px;
  background: white;
  font-size: 1.2rem;
  text-align: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

h1 {
  background: white;
  font-size: 1.8rem;
}

img {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 75px;
  height: 75px;
  background: white;
}

p {
  margin-top: 20px;
  font-size: 1.2rem;
  background-color: white;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  background: white ;
}

button {
  background-color: #00a2e6;
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  font-weight: bold;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
}

button:hover {
  background-color: #0056b3;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
}
</style>
