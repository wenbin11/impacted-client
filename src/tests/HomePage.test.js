/* eslint-disable */
import { mount } from "@vue/test-utils";
import HomePage from "../views/HomePage.vue";
import BlueButton from "../components/BlueButton.vue";

console.error = () => {};
console.warn = () => {};
console.log = () => {};

describe("HomePage.vue", () => {
  it("renders the HomePage component", () => {
    const wrapper = mount(HomePage);

    // Check if the HomePage component is rendered
    expect(wrapper.exists()).toBe(true);
  });

  it("displays the banner section with overlay content", () => {
    const wrapper = mount(HomePage);

    // Check if the banner section is displayed
    expect(wrapper.find(".banner-section").exists()).toBe(true);

    // Check if the overlay content is displayed
    expect(wrapper.find(".overlay-content").exists()).toBe(true);

    // Check if the banner title is displayed
    expect(wrapper.find(".banner-title").exists()).toBe(true);

    // Check if the banner text is displayed
    expect(wrapper.find(".banner-text").exists()).toBe(true);

    // Check if the donate button (BlueButton component) is displayed
    expect(wrapper.findComponent(BlueButton).exists()).toBe(true);
    expect(wrapper.findComponent(BlueButton).props("buttonText")).toBe(
      "Donate Now"
    );
    expect(wrapper.findComponent(BlueButton).props("routeName")).toBe(
      "Donation"
    );
  });

  it("displays the mission section with mission description", () => {
    const wrapper = mount(HomePage);

    // Check if the mission section is displayed
    expect(wrapper.find(".mission-section").exists()).toBe(true);

    // Check if the mission heading is displayed
    expect(wrapper.find(".mission-heading").exists()).toBe(true);

    // Check if the mission description is displayed
    expect(wrapper.find(".mission-description").exists()).toBe(true);

    // Check if the Learn More button (BlueButton component) is displayed
    expect(wrapper.findComponent(BlueButton).exists()).toBe(true);
  });
});
