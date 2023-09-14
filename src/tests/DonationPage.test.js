/* eslint-disable */
import { mount } from "@vue/test-utils";
import DonationPage from "@/views/DonationPage.vue";
import axios from "axios";

console.error = () => {};
console.warn = () => {};
console.log = () => {}

// Mock Axios to handle API requests in tests
jest.mock("axios");

describe("DonationPage.vue", () => {
  // Mocking the data to be returned by Axios
  const mockedDonationData = [
    {
      id: 1,
      title: "Donation Option 1",
      description: "Description 1",
      amount: 10,
    },
    {
      id: 2,
      title: "Donation Option 2",
      description: "Description 2",
      amount: 20,
    },
  ];

  it("renders the DonationPage component", async () => {
    // Mock Axios GET request to fetch donation data
    axios.get.mockResolvedValue({ data: mockedDonationData });

    // Mount the component
    const wrapper = mount(DonationPage);

    // Wait for the component to fetch data from the API
    await wrapper.vm.$nextTick();

    // Check if the component is rendered
    expect(wrapper.exists()).toBe(true);
  });

  it("fetches donation data from the API and displays donation containers", async () => {
    // Mock Axios GET request to fetch donation data
    axios.get.mockResolvedValue({ data: mockedDonationData });

    // Mount the component
    const wrapper = mount(DonationPage);

    // Wait for the component to fetch data from the API
    await wrapper.vm.$nextTick();

    // Check if donation containers are displayed
    const donationContainers = wrapper.findAllComponents({
      name: "DonationContainer",
    });
    expect(donationContainers).toHaveLength(mockedDonationData.length);
  });

});
