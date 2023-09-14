/* eslint-disable */
import { mount, flushPromises } from "@vue/test-utils";
import SignUpPage from "../views/SignUpPage.vue";
import MessageModal from "@/components/MessageModal.vue";
import axios from "axios";

console.error = () => {};
console.warn = () => {};
console.log = () => {};

// Mock the axios module
jest.mock("axios");

describe("SignUpPage.vue", () => {
  let wrapper;

  beforeEach(() => {
    // Create a fresh wrapper before each test
    wrapper = mount(SignUpPage);
  });

  afterEach(() => {
    // Clean up the wrapper after each test
    wrapper.unmount();
  });

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

});
