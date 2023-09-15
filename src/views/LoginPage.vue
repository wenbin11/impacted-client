<template>
  <div class="login-page">
    <div class="header">Login to Your Account</div>
    <!-- Login Error Message -->
    <div v-if="loginError" class="error-message">
      Login Unsuccessful!
      <ul>
        <li v-for="(error, index) in message.errors" :key="index">
          {{ error.msg }}
        </li>
      </ul>
    </div>
    <form class="login-form" @submit.prevent="login">
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
      <!-- Forgot Password Link -->
      <div class="form-row">
        <a href="/forgot-password">Forgot Password?</a>
      </div>
      <!-- Login Button -->
      <div class="form-row">
        <button class="login-btn" type="submit">Login</button>
      </div>
    </form>
    <div class="signup-link">
      Don't have an account? <router-link to="/signup">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
/** Login Page Component */
export default {
  data() {
    return {
      email: "",
      password: "",
      loginError: false,
      message: "",
    };
  },
  methods: {
    login() {
      // Create an object to send as the request payload
      const userData = {
        email: this.email,
        password: this.password,
      };

      // Make a POST request to backend login endpoint
      axios
        .post("http://localhost:8080/login", userData)
        .then((response) => {
          const [token, { userId }] = response.data;
          // Store the token and user information in local storage and vuex store
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(userId));
          this.$store.commit("userIsLoggedIn", userId);

          if (userId === 1) {
            this.$store.commit("userIsAdmin");
          }
          // Redirect to a home page
          this.$router.push("/");
        })
        .catch((error) => {
          console.log("Login error", error.response.data);
          this.message = error.response.data;
          this.loginError = true;
        });
    },
  },
};
</script>

<style scoped>
.login-page {
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
  color: #cc0000;
  font-size: 1rem;
}

.login-form {
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

.login-btn {
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

.login-btn:hover {
  background-color: #0056b3;
}

.signup-link {
  font-size: 16px;
}
</style>
