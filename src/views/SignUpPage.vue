<template>
  <div class="sign-up-page">
    <div class="header">Create An Account</div>
    <!-- Registration Error Message -->
    <div v-if="registrationError" class="error-message">
      Registration Unsuccessful!
      <ul>
        <li v-for="(error, index) in message.errors" :key="index">
          {{ error.msg }}
        </li>
      </ul>
    </div>
    <form class="sign-up-form" @submit.prevent="signUp">
      <!-- First Name and Last Name -->
      <div class="form-row">
        <div class="form-group">
          <label for="first-name">First Name:</label>
          <input type="text" id="first-name" v-model="firstName" required />
        </div>
        <div class="form-group">
          <label for="last-name">Last Name:</label>
          <input type="text" id="last-name" v-model="lastName" required />
        </div>
      </div>
      <!-- Email -->
      <div class="form-row">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
      </div>
      <!-- Password -->
      <div class="form-row">
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
      </div>
      <!-- Registration Success Modal -->
      <message-modal
        :visible="registrationSuccess"
        header="Registration Successful!"
        message="You have successfully registered an account."
        @confirm="redirectToLogin"
      ></message-modal>
      <!-- Sign Up Button -->
      <div class="form-row">
        <button class="sign-up-btn" type="submit">Sign Up</button>
      </div>
    </form>
    <div class="login-link">
      Already have an account? <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MessageModal from "../components/MessageModal.vue";
/**
 * Sign up page component
 */
export default {
  components: { MessageModal },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      registrationSuccess: false,
      registrationError: false,
      message: "",
    };
  },
  methods: {
    signUp() {
      // Create an object to send as the request payload
      const userData = {
        username: this.firstName + " " + this.lastName,
        password: this.password,
        email: this.email,
        fname: this.firstName,
        lname: this.lastName,
      };

      // Make a POST request to backend registration endpoint
      axios
        .post("http://localhost:8080/register", userData)
        .then((response) => {
          console.log(response.data);
          this.registrationSuccess = true;
        })
        .catch((error) => {
          console.log("Registration error", error.response.data);
          this.message = error.response.data;
          this.registrationError = true;
        });
    },
    redirectToLogin() {
      this.registrationSuccess = false;
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.sign-up-page {
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

.sign-up-form {
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

.sign-up-btn {
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

.sign-up-btn:hover {
  background-color: #0056b3;
}

.login-link {
  font-size: 16px;
}
</style>
