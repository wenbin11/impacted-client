<template>
  <!-- Nav Bar Container -->
  <nav class="navbar">
    <!-- Left Side of NavBar  -->
    <div class="left">
      <!-- Text Logo -->
      <span class="logo">ImpactEd</span>
    </div>
    <!-- Center of NavBar -->
    <div class="center">
      <!-- Navlinks Available to all User Types -->
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About Us</router-link></li>
        <li><router-link to="/donation">Donations</router-link></li>
        <li class="dashboard" v-if="$store.state.isAdmin.isAdmin">
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
      </ul>
    </div>
    <!-- Right Side of NavBar -->
    <div class="right">
      <!-- Navlinks depending on User Types -->
      <ul class="nav-links">
        <li class="sign-up" v-if="!$store.state.isLogin.isLogin">
          <router-link to="/register">Sign Up</router-link>
        </li>
        <li v-if="!$store.state.isLogin.isLogin">
          <button class="blue-btn">
            <router-link to="/login">Login</router-link>
          </button>
        </li>
        <li v-if="$store.state.isLogin.isLogin" class="profile">
          <router-link to="/profile">My Profile</router-link>
        </li>
        <li v-if="$store.state.isLogin.isLogin">
          <button class="blue-btn" @click="logout">
            <a>Logout</a>
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
/**
 * Navbar Component
 *
 * The Navbar component represents the navigation bar at the top of the ImpactEd website.
 *
 * It includes a logo, navigation links, and user-related options such as sign-up and login.
 */
export default {
  created() {
    const userId = localStorage.getItem("user");
    if (userId) {
      this.$store.commit("userIsLoggedIn", userId);
    }
  },
  methods: {
    // Check if user is logged in
    logout() {
      this.logoutUser();
      this.$store.commit("userIsLoggedOut");
      this.$router.push("/");
    },
    logoutUser() {
      // Clear user authentication data from localStorage or sessionStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
};
</script>

<style scoped>
.navbar {
  position: sticky;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100vw;
  height: 80px;
  top: 0px;
  z-index: 100;
  background-color: #f6f6f6;
}

.left {
  background-color: #f6f6f6;
}

.logo {
  background-color: #f6f6f6;
  margin-left: 10vw;
  font-size: 1.7rem;
  font-family: "Russo One";
  color: #00a2e6;
}

a:hover {
  color: #00a2e6;
}

.nav-links {
  background-color: #f6f6f6;
  display: flex;
  list-style: none;
  font-size: 1.25rem;
  font-weight: bold;
}

ul li a {
  background-color: #f6f6f6;
  color: black;
  text-decoration: none;
}

.center {
  margin-left: 10vw;
}

.center li {
  margin-left: 75px;
}

.right {
  margin-left: 10vw;
}

.right li {
  margin-left: 50px;
  background-color: #f6f6f6;
}

.blue-btn {
  border: none;
  cursor: pointer;
  font-weight: bold;
  background-color: #00a2e6;
  color: white;
  font-size: 1.25rem;
}

.blue-btn a {
  color: white;
  background-color: #00a2e6;
  font-size: 1.25rem;
  padding: 10px 40px;
  border-radius: 10px;
}

.blue-btn:hover,
.blue-btn a:hover {
  background-color: #0056b3;
}
</style>
