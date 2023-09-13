<template>
  <div class="reset-password-page">
    <div class="header">Reset Password</div>
    <form @submit.prevent="updatePassword" class="update-form">
      <div class="form-group">
        <div v-if="updateError" class="error-message">
          Error!
          <ul>
            <li v-for="(error, index) in message.errors" :key="index">
              {{ error.msg }}
            </li>
          </ul>
        </div>
        <label for="new-password">New Password</label>
        <input type="text" id="new-password" v-model="newPassword" />
      </div>
      <div class="form-group">
        <label for="confirm-password">Confirm Password:</label>
        <input type="text" id="confirm-password" v-model="confirmPassword" />
      </div>
      <message-modal
        :visible="updateSuccess"
        header="Password Updated"
        message="Your password has been updated."
        @confirm="redirectToProfile"
      ></message-modal>
      <button type="submit" class="update-btn">Reset Password</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import MessageModal from "../components/MessageModal.vue";

export default {
  components: { MessageModal },
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      updateSuccess: false,
      updateError: false,
      message: "",
    };
  },
  methods: {
    updatePassword() {
      // Fetch the user's current profile data from the server
      const userId = this.$route.params.userId;
      // Create an object to send as the request payload
      const userData = {
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
      };

      // Make a POST request to your backend update endpoint
      axios
        .post(`http://localhost:8080/reset-password/${userId}`, userData)
        .then((response) => {
          console.log(response.data);
          this.updateSuccess = true;
        })
        .catch((error) => {
          console.log("Update error", error.response.data);
          this.message = error.response.data;
          this.updateError = true;
        });
    },
    redirectToProfile() {
      this.updateSuccess = false;
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
.reset-password-page {
  width: 100vw;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header {
  font-size: 40px;
  font-weight: bold;
}

.error-message {
  color: #ee0000;
  font-size: 1rem;
}

.update-form {
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
}

.form-row {
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.update-btn {
  background-color: #00a2e6;
  font-weight: bold;
  font-size: 16px;
  width: 100%;
  max-width: 500px;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.update-btn:hover {
  background-color: #0056b3;
}
</style>
