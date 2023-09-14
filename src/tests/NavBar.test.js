/* eslint-disable */
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import NavBar from "../components/NavBar.vue";

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
    currentUser: null,
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

jest.spyOn(NavBar.methods, "logout");

describe("NavBar.vue", () => {
  let wrapper = mount(NavBar, {
    global: {
      plugins: [store],
    },
  });

  it("renders the Navbar component", () => {
    // Check if the Navbar component is rendered
    expect(wrapper.exists()).toBe(true);
  });

  it("displays 'ImpactEd' logo", () => {
    // Check if the logo text is displayed correctly
    expect(wrapper.find(".logo").text()).toBe("ImpactEd");
  });

  it("renders navigation links", () => {
    // Check if navigation links are present
    expect(wrapper.findAll(".nav-links li")).toHaveLength(5);
  });

  it("renders login button when not logged in", () => {
    // Check if the login button is rendered
    expect(wrapper.find(".blue-btn").text()).toBe("Login");
  });

  it("renders logout button when logged in", () => {
    store.commit("userIsLoggedIn", 13);

    // Check if the logout button is rendered
    expect(wrapper.find(".blue-btn").text()).toBe("Login");
  });
});
