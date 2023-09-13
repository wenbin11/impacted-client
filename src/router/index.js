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
import UpdateUserProfilePage from "@/views/UpdateUserProfilePage.vue";
import ChangePasswordPage from "@/views/ChangePasswordPage.vue";
import DashboardPage from "@/views/admin/DashboardPage.vue";
import UserDashboardPage from "@/views/admin/UserDashboardPage.vue";
import DonationTypeDashboardPage from "@/views/admin/DonationTypeDashboardPage.vue";
import AddTypePage from "@/views/admin/AddTypePage.vue";
import UpdateTypePage from "@/views/admin/UpdateTypePage.vue";
import AddBadgePage from "@/views/admin/AddBadgePage.vue";
import UpdateBadgePage from "@/views/admin/UpdateBadgePage.vue";
import BadgeDashboardPage from "@/views/admin/BadgeDashboardPage.vue";
import EducationalCauseDashboardPage from "@/views/admin/EducationalCauseDashboardPage.vue";
import AddCausePage from "@/views/admin/AddCausePage.vue";
import UpdateCausePage from "@/views/admin/UpdateCausePage.vue";
import DonationDashboardPage from "@/views/admin/DonationDashboardPage.vue";
import UpdateDonationPage from "@/views/admin/UpdateDonationPage.vue";
import AddDonationPage from "@/views/admin/AddDonationPage.vue";

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
  {
    path: "/update-profile/:userId",
    name: "UpdateProfile",
    component: UpdateUserProfilePage,
  },
  {
    path: "/reset-password/:userId",
    name: "ResetPassword",
    component: ChangePasswordPage,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage,
  },
  {
    path: "/dashboard/user",
    name: "UserDashboard",
    component: UserDashboardPage,
  },
  {
    path: "/dashboard/types",
    name: "TypeDashboard",
    component: DonationTypeDashboardPage,
  },
  {
    path: "/add-type",
    name: "AddType",
    component: AddTypePage,
  },
  {
    path: "/update-type/:typeId",
    name: "UpdateType",
    component: UpdateTypePage,
  },
  {
    path: "/dashboard/badges",
    name: "BadgeDashboard",
    component: BadgeDashboardPage,
  },
  {
    path: "/add-badge",
    name: "AddBadge",
    component: AddBadgePage,
  },
  {
    path: "/update-badge/:badgeId",
    name: "UpdateBadge",
    component: UpdateBadgePage,
  },
  {
    path: "/update-cause/:causeId",
    name: "UpdateCause",
    component: UpdateCausePage,
  },
  {
    path: "/dashboard/causes",
    name: "CauseDashboard",
    component: EducationalCauseDashboardPage,
  },
  {
    path: "/add-cause",
    name: "AddCause",
    component: AddCausePage,
  },
  {
    path: "/update-donation/:donationId",
    name: "UpdateDonation",
    component: UpdateDonationPage,
  },
  {
    path: "/dashboard/donations",
    name: "DonationDashboard",
    component: DonationDashboardPage,
  },
  {
    path: "/add-donation",
    name: "AddDonation",
    component: AddDonationPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
