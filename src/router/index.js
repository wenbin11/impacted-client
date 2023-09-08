import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import AboutPage from "@/views/AboutPage.vue";
import DonationPage from "@/views/DonationPage.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;