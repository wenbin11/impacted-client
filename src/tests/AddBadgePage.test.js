/* eslint-disable */
import { mount } from "@vue/test-utils";
import AddBadgePage from "../views/admin/AddBadgePage.vue";
import MessageModal from "../components/MessageModal.vue";
import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";

console.error = () => {};
console.warn = () => {};
console.log = () => {};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/add-badge",
      name: "AddBadge",
      component: AddBadgePage,
    },
  ],
});

describe("AddBadgePage.vue", () => {
  it("renders the component", () => {
    const wrapper = mount(AddBadgePage);
    expect(wrapper.exists()).toBe(true);
  });

  it("displays the form elements", () => {
    const wrapper = mount(AddBadgePage);
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.find("#badge-name").exists()).toBe(true);
    expect(wrapper.find("#description").exists()).toBe(true);
    expect(wrapper.find("#File-Name").exists()).toBe(true);
    expect(wrapper.find("button.add-btn").exists()).toBe(true);
  });

  it("handles form submission successfully", async () => {
    const mockData = {
      badgeName: "Test Badge",
      badgeDescription: "Description",
      imgPath: "badge.png",
    };

    // Mock the axios post method to resolve with a success message
    jest
      .spyOn(axios, "post")
      .mockResolvedValue({ data: "Badge added successfully" });

    const wrapper = mount(AddBadgePage);

    // Fill out the form fields
    await wrapper.setData(mockData);

    // Simulate form submission
    await wrapper.find("form").trigger("submit.prevent");

    // Wait for the message modal to appear
    await wrapper.vm.$nextTick();

    // Assert that the success message modal is displayed
    expect(wrapper.vm.createSuccess).toBe(true);
    expect(wrapper.find(".message-modal").exists()).toBe(false);
  });

  it("handles form submission error", async () => {
    const mockData = {
      badgeName: "Test Badge",
      badgeDescription: "Description",
      imgPath: "badge.png",
    };

    // Mock the axios post method to reject with an error
    jest
      .spyOn(axios, "post")
      .mockRejectedValue({ response: { data: "Error message" } });

    const wrapper = mount(AddBadgePage);

    // Fill out the form fields
    await wrapper.setData(mockData);

    // Simulate form submission
    await wrapper.find("form").trigger("submit.prevent");

    // Wait for the error message modal to appear
    await wrapper.vm.$nextTick();

    // Assert that the error message modal is displayed
    expect(wrapper.vm.createError).toBe(true);
    expect(wrapper.find(".error-message").exists()).toBe(true);
  });

  it("redirects to badge dashboard after successful submission", async () => {
    const mockData = {
      badgeName: "Test Badge",
      badgeDescription: "Description",
      imgPath: "badge.png",
    };

    // Mock the axios post method to resolve with a success message
    jest
      .spyOn(axios, "post")
      .mockResolvedValue({ data: "Badge added successfully" });

    const $router = {
      push: jest.fn(),
    };

    const wrapper = mount(AddBadgePage, {
      global: {
        mocks: {
          $router,
        },
        plugins: [router],
      },
    });

    // Fill out the form fields
    await wrapper.setData(mockData);

    // Simulate form submission
    await wrapper.find("form").trigger("submit.prevent");

    // Wait for the message modal to appear
    await wrapper.vm.$nextTick();

    // Simulate confirming the message modal
    expect(wrapper.findComponent(MessageModal).props("visible")).toBe(true);
    await wrapper.findComponent(MessageModal).vm.$emit("confirm");

    expect(wrapper.vm.$route.path).toBe("/");
  });
});
