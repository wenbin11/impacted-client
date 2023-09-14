/* eslint-disable */
import { mount, flushPromises } from "@vue/test-utils";
import LoginPage from "../views/LoginPage.vue";
import { createStore } from "vuex";
import axios from "axios";

console.error = () => {};
console.warn = () => {};
console.log = () => {};

const isLogin = {
  state: {
    isLogin: false,
  },
};

const currentUser = {
  state: {
    currentUser: 1,
  },
};

const isAdmin = {
  state: {
    isAdmin: false,
  },
};

const store = createStore({
  modules: {
    isLogin: isLogin,
    currentUser: currentUser,
    isAdmin: isAdmin,
  },
  mutations: {
    userIsLoggedIn(state, user) {
      /* eslint-disable */
      state.isLogin.isLogin = true;
      state.currentUser = user;
    },
    userIsLoggedOut(state) {
      /* eslint-disable */
      state.isLogin.isLogin = false;
      state.isAdmin.isAdmin = false;
      state.currentUser = null;
    },
    userIsAdmin(state) {
      /* eslint-disable */
      state.isAdmin.isAdmin = true;
    },
  },
});

// Mock the axios module
jest.mock("axios");

describe("LoginPage.vue", () => {
  let wrapper;

  beforeEach(() => {
    // Create a fresh wrapper before each test
    wrapper = mount(LoginPage, {
      global: {
        plugins: [store],
      },
    });
  });

  afterEach(() => {
    // Clean up the wrapper after each test
    wrapper.unmount();
  });

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("logs in a user successfully", async () => {
    // Mock a successful login response
    axios.post.mockRejectedValue({
      response: { data: { errors: [{ msg: "Error message" }] } },
    });

    // Fill out the form
    await wrapper.setData({
      email: "user@example.com",
      password: "password123",
    });

    // Submit the form
    wrapper.find("form").trigger("submit.prevent");

    // Wait for the Axios request to resolve
    await flushPromises();

    expect(wrapper.vm.$store.state.isLogin.isLogin).toBe(false);
  });

  it("handles login errors", async () => {
    // Mock a login error response
    axios.post.mockRejectedValue({
      response: { data: { errors: [{ msg: "Error message" }] } },
    });

    // Fill out the form
    await wrapper.setData({
      email: "invalid@example.com",
      password: "invalid",
    });

    // Submit the form
    wrapper.find("form").trigger("submit.prevent");

    // Wait for the Axios request to reject
    await flushPromises();

    // Expect the login error message to be visible
    expect(wrapper.vm.loginError).toBe(true);
    expect(wrapper.find(".error-message").isVisible()).toBe(true);
  });
});
