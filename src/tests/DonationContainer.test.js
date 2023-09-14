/* eslint-disable */
import { mount } from "@vue/test-utils";
import DonationContainer from "../components/DonationContainer.vue";

console.error = () => {};
console.warn = () => {};
console.log = () => {};

// Sample data for testing
const boxData = {
  causename: "Sample Cause",
  image_path: "sample-image.jpg",
  targetsupplies: 100,
  typename: "Infrastructure Development",
  totalsupporters: 50,
  currentsupplies: 25,
};

describe("DonationContainer.vue", () => {
  it("renders the component with data", () => {
    const wrapper = mount(DonationContainer, {
      props: {
        boxData: boxData,
      },
    });

    // Check if the component is rendered
    expect(wrapper.exists()).toBe(true);

    // Check if the cause name is displayed
    const causeName = wrapper.find(".cause-name h3");
    expect(causeName.text()).toBe(boxData.causename);

    // Check if the image is displayed with the correct src attribute
    const mainImage = wrapper.find(".main-img");
    expect(mainImage.exists()).toBe(true);

    // Check if the donate button is displayed
    const donateButton = wrapper.find(".donate-btn");
    expect(donateButton.exists()).toBe(true);
  });
});
