<template>
  <div class="login-page">
    <div class="header">Welcome Back</div>
    <form class="login-form">
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
        <router-link to="/resetpassword" class="forgot-password-link">
          Forgot Password?
        </router-link>
      </div>
      <!-- Login Button -->
      <div class="form-row">
        <button class="login-btn" @click="login">Login</button>
      </div>
    </form>
    <div class="sign-up-link">
      Don't have an account? <router-link to="/register">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      // Handle the login logic here
      console.log("Login clicked");
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

.forgot-password-link {
  color: #00a2e6;
  text-decoration: none;
  font-weight: bold;
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

.sign-up-link {
  font-size: 16px;
}

/* Style the router link */
.sign-up-link a {
  color: #00a2e6;
}
</style>
