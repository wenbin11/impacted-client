import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import AboutPage from "@/views/AboutPage.vue";
import DonationPage from "@/views/DonationPage.vue";
import SignUpPage from "@/views/SignUpPage.vue";
import LoginPage from "@/views/LoginPage.vue";

// My Routes
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
  },
  {
    path: "/donation",
    name: "Donation",
    component: DonationPage,
  },
  {
    path: "/register",
    name: "Register",
    component: SignUpPage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;