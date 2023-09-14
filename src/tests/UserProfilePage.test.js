/* eslint-disable */
import { mount } from "@vue/test-utils";
import UserProfilePage from "@/views/UserProfilePage.vue";
import axios from "axios";

console.error = () => {};
console.warn = () => {};
console.log = () => {};

// Sample data for testing
const userData = {
  userInfo: {
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@example.com",
  },
  badgeInfo: [
    {
      badgename: "Badge 1",
      achievementtime: "2023-01-01T12:00:00Z",
      badgedescription: "Description 1",
      img_path: "badge1.jpg",
    },
    {
      badgename: "Badge 2",
      achievementtime: "2023-02-01T12:00:00Z",
      badgedescription: "Description 2",
      img_path: "badge2.jpg",
    },
  ],
  pastDonations: [
    {
      donationid: 1,
      causename: "Cause 1",
      amountdonated: 100,
      donationtime: "2023-03-01T12:00:00Z",
    },
    {
      donationid: 2,
      causename: "Cause 2",
      amountdonated: 200,
      donationtime: "2023-04-01T12:00:00Z",
    },
  ],
};

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: userData })),
}));

describe("UserProfilePage.vue", () => {
  it("renders the component with user data", async () => {
    const wrapper = mount(UserProfilePage, {
      global: {
        mocks: {
          $store: {
            state: {
              currentUser: 1, // Set the desired user ID for testing
            },
          },
        },
      },
    });

    // Wait for Axios to resolve
    await axios.get;

    // Check if the component is rendered
    expect(wrapper.exists()).toBe(true);

    // Check if user data is displayed correctly
    expect(wrapper.find(".username").text()).toBe("John Doe");
    expect(wrapper.find("#first-name").element.value).toBe("John");
    expect(wrapper.find("#last-name").element.value).toBe("Doe");
    expect(wrapper.find("#email").element.value).toBe("johndoe@example.com");

    // You can continue checking other elements and data in a similar way
  });

  it("displays past donations and badges if available", async () => {
    const wrapper = mount(UserProfilePage, {
      global: {
        mocks: {
          $store: {
            state: {
              currentUser: 1, // Set the desired user ID for testing
            },
          },
        },
      },
    });

    // Wait for Axios to resolve
    await axios.get;

    // Check if past donations are displayed
    const pastDonationTable = wrapper.find(".past-donations-container table");
    expect(pastDonationTable.exists()).toBe(true);
    expect(pastDonationTable.findAll("tr").length).toBe(
      userData.pastDonations.length + 1
    ); // +1 for the header row

    // Check if badges are displayed
    const badgeInfo = wrapper.find(".badge-container .badge-info");
    expect(badgeInfo.exists()).toBe(true);
    expect(badgeInfo.findAll(".badge-name").length).toBe(1);

    // You can continue checking other elements and data in a similar way
  });

  it("displays a message when no past donations or badges are available", async () => {
    const emptyUserData = {
      ...userData,
      pastDonations: [],
      badgeInfo: [],
    };

    axios.get.mockResolvedValue({ data: emptyUserData });

    const wrapper = mount(UserProfilePage, {
      global: {
        mocks: {
          $store: {
            state: {
              currentUser: 1, // Set the desired user ID for testing
            },
          },
        },
      },
    });

    // Wait for Axios to resolve
    await axios.get;

    // Check if the "No donations were found!" message is displayed
    const noDataMessage = wrapper.find(".no-data");
    expect(noDataMessage.exists()).toBe(true);

    // Check if the "Make a Donation" button is displayed
    const makeDonationButton = wrapper.find(".blue-btn");
    expect(makeDonationButton.exists()).toBe(true);

    // You can continue checking other elements and data in a similar way
  });
});
