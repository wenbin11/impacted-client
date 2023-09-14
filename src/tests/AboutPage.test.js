/* eslint-disable */
import { mount } from "@vue/test-utils";
import AboutPage from "../views/AboutPage.vue";
import axios from "axios";

console.error = () => {};
console.warn = () => {};
console.log = () => {};

// Mocking Axios to handle API requests in tests
jest.mock("axios");

describe("AboutPage.vue", () => {
  // Mock the data that the component fetches from the API
  const mockData = {
    learningResources: {
      count: 10,
      incremented: 2,
      daysDifference: 7,
    },
    supporters: {
      count: 100,
      incremented: 20,
      daysDifference: 14,
    },
    goals: {
      count: 50,
      incremented: 5,
      daysDifference: 30,
    },
    pieChartData: {
      legend: ["Category A", "Category B", "Category C"],
      data: [30, 40, 30],
    },
  };

  const mockECharts = {
    init: () => ({
      setOption: () => {},
    }),
  };

  // Create a mock instance of Axios with a response
  axios.get.mockResolvedValue({ data: mockData });

  it("renders the AboutPage component", async () => {
    // Mount the component
    const wrapper = mount(AboutPage, {
      global: {
        mocks: {
          $echarts: mockECharts,
        },
      },
    });

    // Wait for the data to be fetched
    await wrapper.vm.$nextTick();

    // Check if the component is rendered
    expect(wrapper.exists()).toBe(true);
  });

  it("displays purpose, core values, impact, and funding commitment sections", async () => {
    // Mount the component
    const wrapper = mount(AboutPage, {
      global: {
        mocks: {
          $echarts: mockECharts,
        },
      },
    });

    // Wait for the data to be fetched
    await wrapper.vm.$nextTick();

    // Check if all sections are rendered
    expect(wrapper.findAll(".container")).toHaveLength(4);
  });

  it("displays the purpose section", async () => {
    // Mount the component
    const wrapper = mount(AboutPage, {
      global: {
        mocks: {
          $echarts: mockECharts,
        },
      },
    });

    // Wait for the data to be fetched
    await wrapper.vm.$nextTick();

    // Check if the purpose section is rendered
    expect(wrapper.find(".header-main").text()).toBe("Purpose");
  });

  it("displays the values container", async () => {
    // Mount the component
    const wrapper = mount(AboutPage, {
      global: {
        mocks: {
          $echarts: mockECharts,
        },
      },
    });

    // Wait for the data to be fetched
    await wrapper.vm.$nextTick();

    // Check if the purpose section is rendered
    expect(wrapper.findAll(".value-title")).toHaveLength(3);
  });
});
