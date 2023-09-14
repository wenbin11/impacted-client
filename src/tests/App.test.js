/* eslint-disable */
import { shallowMount } from "@vue/test-utils";
import App from "../App.vue";

console.error = () => {};
console.warn = () => {};
console.log = () => {};

describe("App.vue", () => {
  it("renders the App component", () => {
    // Mount the App component
    const wrapper = shallowMount(App);

    // Check if the App component is rendered
    expect(wrapper.exists()).toBe(true);
  });

  it("should have NavBar child component", () => {
    // Mount the App component
    const wrapper = shallowMount(App);

    // Check if NavBar component exists
    expect(wrapper.findComponent({ name: "NavBar" }).exists()).toBe(true);
  });
});
