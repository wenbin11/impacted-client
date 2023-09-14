/* eslint-disable */
import { mount } from "@vue/test-utils";
import ErrorPage from "../views/ErrorPage.vue";
import { createRouter, createWebHistory } from "vue-router";

console.error = () => {};
console.warn = () => {};
console.log = () => {};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/cancel",
      query: { causeId: "2" },
      name: "Cancel",
      component: ErrorPage,
    },
  ],
});

describe("ErrorPage.vue", () => {
  it("renders the component", () => {
    const wrapper = mount(ErrorPage, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("displays the error image", () => {
    const wrapper = mount(ErrorPage, {
      global: {
        plugins: [router],
      },
    });
    const errorImage = wrapper.find("img");
    expect(errorImage.exists()).toBe(true);
    expect(errorImage.attributes("src")).toBe("/images/error.png");
    expect(errorImage.attributes("alt")).toBe("error");
  });

  it("displays the error header", () => {
    const wrapper = mount(ErrorPage, {
      global: {
        plugins: [router],
      },
    });
    const errorHeader = wrapper.find(".error-header");
    expect(errorHeader.exists()).toBe(true);
    expect(errorHeader.text()).toBe("Oops! Something Went Wrong.");
  });

  it("displays the details header", () => {
    const wrapper = mount(ErrorPage, {
      global: {
        plugins: [router],
      },
    });
    const detailsHeader = wrapper.find(".details-header");
    expect(detailsHeader.exists()).toBe(true);
    expect(detailsHeader.text()).toBe("Payment Was Cancelled.");
  });

  it("displays the thank you text", () => {
    const wrapper = mount(ErrorPage, {
      global: {
        plugins: [router],
      },
    });
    const thankYouText = wrapper.find(".thank-you-text");
    expect(thankYouText.exists()).toBe(true);
    expect(thankYouText.text()).toBe("Try Again Below.");
  });

  it("contains a 'Try Again' button", () => {
    const wrapper = mount(ErrorPage, {
      global: {
        plugins: [router],
      },
    });
    const tryAgainButton = wrapper.find(".error-btn");
    expect(tryAgainButton.exists()).toBe(true);
    expect(tryAgainButton.text()).toBe("Try Again");
  });
});
