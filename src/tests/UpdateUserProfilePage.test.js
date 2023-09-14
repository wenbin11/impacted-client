/* eslint-disable */
import { mount, flushPromises } from "@vue/test-utils";
import UpdateUserProfilePage from "@/views/UpdateUserProfilePage.vue";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import MessageModal from "@/components/MessageModal.vue";
import axios from "axios";

console.error = () => {};
console.warn = () => {};
console.log = () => {};

jest.mock("axios");

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

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/update-profile/:userId",
      name: "UpdateProfile",
      component: UpdateUserProfilePage,
    },
  ],
});

describe("UpdateUserProfilePage.vue", () => {
  it("renders the component", () => {
    const userData = {
      firstname: "John",
      lastname: "Doe",
      email: "johndoe@example.com",
    };

    axios.get.mockResolvedValue({ data: userData });
    
    const wrapper = mount(UpdateUserProfilePage, {
      global: {
        plugins: [router, store],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
  it("fetches user profile data and populates input fields", async () => {
    const userData = {
      firstname: "John",
      lastname: "Doe",
      email: "johndoe@example.com",
    };

    axios.get.mockResolvedValue({ data: userData });

    const wrapper = mount(UpdateUserProfilePage, {
      global: {
        plugins: [router, store],
      },
    });

    await flushPromises(); // Wait for Axios to resolve

    expect(wrapper.find("#first-name").element.value).toBe("John");
    expect(wrapper.find("#last-name").element.value).toBe("Doe");
    expect(wrapper.find("#email").element.value).toBe("johndoe@example.com");
  });

  it("displays an error message when the update fails", async () => {
    axios.post.mockRejectedValue({
      response: { data: { errors: [{ msg: "Error message" }] } },
    });

    const wrapper = mount(UpdateUserProfilePage, {
      global: {
        plugins: [router, store],
      },
    });

    await wrapper.find("form").trigger("submit.prevent");

    await flushPromises(); // Wait for Axios to reject

    expect(wrapper.find(".error-message").exists()).toBe(true);
    expect(wrapper.find(".error-message").text()).toContain(
      "Update Unsuccessful!"
    );
    expect(wrapper.find(".error-message ul li").text()).toBe("Error message");
  });

  it("displays a success message and redirects to the profile page on successful update", async () => {
    axios.post.mockResolvedValue({ data: {} });

    const wrapper = mount(UpdateUserProfilePage, {
      global: {
        plugins: [router, store],
      },
    });

    await wrapper.find("form").trigger("submit.prevent");

    await flushPromises(); // Wait for Axios to resolve

    expect(wrapper.findComponent(MessageModal).props("visible")).toBe(true);

    await wrapper.findComponent(MessageModal).vm.$emit("confirm");

    expect(wrapper.vm.$route.path).toBe("/");
  });
});
