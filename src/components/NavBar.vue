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
      </ul>
    </div>
    <!-- Right Side of NavBar -->
    <div class="right">
      <!-- Navlinks depending on User Types -->
      <ul class="nav-links">
        <li class="sign-up">
          <router-link to="#">Sign Up</router-link>
        </li>
        <li>
          <button class="blue-btn">
            <router-link to="#">Login</router-link>
          </button>
        </li>
        <!-- <li v-if="userLoggedIn">
          <router-link to="/profile">My Profile</router-link>
        </li>
        <li v-if="userLoggedIn"><a href="#" @click="logout">Logout</a></li> -->
      </ul>
    </div>
  </nav>
</template>

<script>
/**
 * NavBar Component
 *
 * Component containing the project logo and nav-links to all the
 * common pages used
 */
export default {};
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
  background-color: #f5f5f5;
}

.logo {
  margin-left: 10vw;
  font-size: 1.7rem;
  font-family: "Russo One";
  color: #00a2e6;
}

a:hover {
  color: #00a2e6;
}

.nav-links {
  display: flex;
  list-style: none;
  font-size: 1.25rem;
  font-weight: bold;
}

ul li a {
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
}

.blue-btn {
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.blue-btn a {
  color: white;
  background-color: #00a2e6;
  font-size: 1.25rem;
  border-radius: 10px;
  padding: 10px 40px;
}

.blue-btn a:hover {
  background-color: #0056b3;
}
</style>
