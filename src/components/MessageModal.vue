<template>
  <div v-if="visible" class="modal">
    <div class="modal-content">
      <p>{{ message }}</p>
      <button @click="confirm">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    message: String,
  },
  methods: {
    confirm() {
      this.$emit("confirm");
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
  height: 10vw;
  background: white;
  font-size: 1.2rem;
  text-align: center;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

p {
  background-color: white;
}

button {
  background-color: #00a2e6;
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 40px;
  font-weight: bold;
}

button:hover {
  background-color: #0056b3;
}
</style>
