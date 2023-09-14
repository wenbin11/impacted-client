/* eslint-disable */
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import ChangePasswordPage from "../views/ChangePasswordPage.vue";
import axios from "axios";


console.error = () => {};
console.warn = () => {};
console.log = () => {};

// Mocking Axios to handle API requests in tests
jest.mock("axios");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/reset-password/:userId",
      name: "ResetPassword",
      component: ChangePasswordPage,
    },
  ],
});

describe("ChangePasswordPage.vue", () => {
  it("renders the ChangePasswordPage component", () => {
    // Mount the component with the router
    const wrapper = mount(ChangePasswordPage, {
      global: {
        plugins: [router],
      },
    });

    // Check if the component is rendered
    expect(wrapper.exists()).toBe(true);
  });

  it("initializes data correctly", () => {
    // Mount the component with the router
    const wrapper = mount(ChangePasswordPage, {
      global: {
        plugins: [router],
      },
    });

    // Check initial data values
    expect(wrapper.vm.newPassword).toBe("");
    expect(wrapper.vm.confirmPassword).toBe("");
    expect(wrapper.vm.updateSuccess).toBe(false);
    expect(wrapper.vm.updateError).toBe(false);
    expect(wrapper.vm.message).toBe("");
  });

  it("updates the password when form is submitted successfully", async () => {
    // Mock the Axios POST request
    axios.post.mockResolvedValue({ data: {} });

    // Mount the component with the router
    const wrapper = mount(ChangePasswordPage, {
      global: {
        plugins: [router],
      },
    });

    // Set new password and confirm password
    wrapper.setData({
      newPassword: "newPassword",
      confirmPassword: "newPassword",
    });

    // Trigger the form submission
    await wrapper.find("form").trigger("submit.prevent");

    // Check if updateSuccess is set to true
    expect(wrapper.vm.updateSuccess).toBe(true);
    // Check if updateError remains false
    expect(wrapper.vm.updateError).toBe(false);
  });
});
