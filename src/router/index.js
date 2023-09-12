import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import AboutPage from "@/views/AboutPage.vue";
import DonationPage from "@/views/DonationPage.vue";
import SignUpPage from "@/views/SignUpPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import PaymentPage from "@/views/PaymentPage.vue";
import SuccessPage from "@/views/SuccessPage.vue";
import ErrorPage from "@/views/ErrorPage.vue";
import UserProfilePage from "@/views/UserProfilePage.vue";

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
  {
    path: "/cause/:causeid",
    name: "Payment",
    component: PaymentPage,
  },
  {
    path: "/cause/:causeId/checkout",
    name: "Checkout",
    component: PaymentPage,
  },
  {
    path: "/success",
    name: "Checkout",
    component: SuccessPage,
  },
  {
    path: "/cancel",
    name: "Cancel",
    component: ErrorPage,
  },
  {
    path: "/profile",
    name: "Profile",
    component: UserProfilePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
