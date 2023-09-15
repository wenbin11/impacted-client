<template>
  <!-- About Page Container -->
  <div class="about-page">
    <!-- Purpose Container -->
    <div class="container">
      <!-- Purpose Header -->
      <div class="header-container">
        <h1>Our</h1>
        <h1 class="header-main">Purpose</h1>
      </div>
      <!-- Purpose Body Text -->
      <p class="purpose-body-text">
        Our vision at ImpactEd is a world where every child has equal access to
        quality education, empowering them to reach their full potential and
        create positive change in their communities. We envision a future where
        education knows no boundaries and serves as a catalyst for social and
        economic progress, fostering a more equitable and sustainable world.
      </p>
      <!-- Purpose Image -->
      <img src="../assets/about/purpose.jpg" class="purpose" />
    </div>

    <!-- Core Values Container -->
    <div class="container">
      <!-- Core Values Header -->
      <div class="header-container">
        <h1>Our</h1>
        <h1 class="header-main">Core Values</h1>
      </div>
      <!-- Values Box Containers -->
      <div class="values-box-container">
        <!-- Value Box 1 -->
        <div class="values-box">
          <h2 class="value-title">Innovation</h2>
          <div class="value-body-text">
            We embrace innovative approaches to education, leveraging
            technology, research, and best practices to drive meaningful and
            sustainable change in teaching and learning methods.
          </div>
        </div>
        <!-- Value Box 2 -->
        <div class="values-box">
          <h2 class="value-title">Transparency</h2>
          <div class="value-body-text">
            We are committed to providing clear and accurate information about
            our initiatives, impact, and financial management.
          </div>
        </div>
        <!-- Value Box 3 -->
        <div class="values-box">
          <h2 class="value-title">Advocacy</h2>
          <div class="value-body-text">
            We advocate for education as a fundamental human right and work to
            raise awareness about the importance of education in transforming
            lives and societies.
          </div>
        </div>
      </div>
    </div>

    <!-- Impact Container -->
    <div class="container">
      <!-- Impact Header -->
      <div class="header-container">
        <h1>Our</h1>
        <h1 class="header-main">Impact</h1>
      </div>
      <!-- Impact Container -->
      <div class="impact-container">
        <!-- Impact Box Left -->
        <div class="impact-box-left">
          <div class="left-side">
            <div class="left-header">
              <span class="header-text" v-if="aboutData.learningResources">
                {{ parseInt(aboutData.learningResources.count) }} learning
                resources
              </span>
            </div>
            <div class="left-paragraph">
              <span class="paragraph-text">distributed</span>
            </div>
            <div class="left-header">
              <span class="header-text" v-if="aboutData.supporters">
                {{ aboutData.supporters.count }} supporters
              </span>
            </div>
            <div class="left-paragraph">
              <span class="paragraph-text">promoting learning</span>
            </div>
            <div class="left-header">
              <span class="header-text" v-if="aboutData.goals">
                {{ aboutData.goals.count }} goals
              </span>
            </div>
            <div class="left-paragraph">
              <span class="paragraph-text">achieved</span>
            </div>
          </div>
          <div class="right-side">
            <div class="right-header">
              <span
                class="green-header-text"
                v-if="aboutData.learningResources"
              >
                + {{ aboutData.learningResources.incremented }}
              </span>
            </div>
            <div class="right-paragraph">
              <span
                class="green-paragraph-text"
                v-if="aboutData.learningResources"
              >
                {{ getTextContent(aboutData.learningResources.daysDifference) }}
              </span>
            </div>
            <div class="right-header">
              <span class="green-header-text" v-if="aboutData.supporters">
                + {{ aboutData.supporters.incremented }}
              </span>
            </div>
            <div class="right-paragraph">
              <span class="green-paragraph-text" v-if="aboutData.supporters">
                {{ getTextContent(aboutData.supporters.daysDifference) }}
              </span>
            </div>
            <div class="right-header">
              <span class="green-header-text" v-if="aboutData.goals">
                + {{ aboutData.goals.incremented }}
              </span>
            </div>
            <div class="right-paragraph">
              <span class="green-paragraph-text" v-if="aboutData.goals">
                {{ getTextContent(aboutData.goals.daysDifference) }}
              </span>
            </div>
          </div>
        </div>
        <!-- Impact Box Right -->
        <div class="impact-box-right">
          <div class="impact-box-header">Impact to Date</div>
          <div class="impact-box-body">
            ImpactEd donations have not only enhanced educational opportunities
            but also enabled school resources, academic support, community
            engagement, and empowerment programs worldwide.
          </div>
        </div>
      </div>
    </div>

    <!-- Funding Commitment Container -->
    <div class="container">
      <!-- Funding Commitment Header -->
      <div class="header-container">
        <h1>Our</h1>
        <h1 class="header-main">Funding Commitment</h1>
      </div>
      <!-- Fundings Chart Container -->
      <div class="fundings-chart-container" ref="chartRef"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";

/**
 * AboutPage Component
 *
 * The AboutPage component represents a page that provides information about ImpactEd's purpose,
 * core values, impact to date, and funding commitment.
 *
 * It consists of sections such as Purpose, Core Values, Impact, and Funding Commitment, each with
 * relevant content and visual elements.
 */
export default {
  data() {
    return {
      aboutData: [],
    };
  },
  created() {
    // Send a GET request to fetch data from the backend.
    axios
      .get("http://localhost:8080/about")
      .then((response) => {
        this.aboutData = response.data;
        this.renderChart();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    // Function to format text based on the number of days.
    getTextContent(numberOfDays) {
      if (numberOfDays === 1) {
        return "in the last day";
      } else {
        return `in the last ${numberOfDays} days`;
      }
    },
    // Function to render a chart using ECharts library.
    renderChart() {
      // Initialize an ECharts chart using a DOM element with the ref "chartRef."
      const chart = echarts.init(this.$refs.chartRef);
      const option = {
        // Configuration options for the chart.
        title: {
          left: 20,
          top: 10,
          text: "Overall Funding Commitments (SGD)",
          textStyle: {
            fontSize: 24,
          },
        },
        legend: {
          orient: "vertical",
          right: 30,
          top: 10,
          textStyle: {
            fontSize: 16,
          },
          data: this.aboutData.pieChartData.legend,
        },
        series: [
          {
            type: "pie",
            radius: "70%",
            center: ["50%", "60%"],
            data: this.aboutData.pieChartData.data.map((value, index) => ({
              // Configure pie chart series data.
              name: this.aboutData.pieChartData.legend[index],
              value,
            })),
            label: {
              show: true,
              fontSize: 20,
              // Configure label format
              formatter: "${c}\n{d}%",
            },
            // Apply emphasis to labels.
            emphasis: {
              label: {
                show: true,
                fontSize: 24,
                fontWeight: "bold",
              },
            },
          },
        ],
      };
      // Set the chart's configuration options and render it.
      chart.setOption(option);
    },
  },
};
</script>

<style scoped>
.container {
  width: 90vw;
  margin: 70px auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header-container {
  display: flex;
  justify-content: center;
}

h1 {
  font-size: 2.5rem;
}

.header-main {
  margin-left: 10px;
  color: #00a2e6;
  font-weight: bold;
}

.purpose-body-text {
  margin-top: 30px;
  font-size: 1.25rem;
  line-height: 2rem;
}

.purpose {
  margin-top: 5vh;
  width: 90vw;
  border-radius: 20px;
  object-fit: cover;
}

.values-box-container {
  width: 90vw;
  margin-top: 30px;
  display: flex;
  gap: 75px;
}

.values-box {
  width: calc(33.3%);
  border: 1px solid gray;
  border-radius: 20px;
}

.value-title {
  color: #00a2e6;
  font-size: 28px;
  margin: 10px;
}

.value-body-text {
  text-align: center;
  font-size: 1.25rem;
  line-height: 2rem;
  margin: 20px;
}

.impact-container {
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  border-radius: 20px;
}

.impact-box-left,
.impact-box-right {
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
}

ul li {
  list-style-type: none;
}

.left-side,
.right-side {
  flex: 1;
}

.left-side {
  text-align: left;
}

.right-side {
  text-align: right;
}

.header-text,
.green-header-text {
  font-size: 1.5rem;
  font-weight: bold;
}

.green-paragraph-text,
.paragraph-text {
  font-size: 1.2rem;
}

.paragraph-text {
  color: #687781;
}

.green-header-text,
.green-paragraph-text {
  color: #00bf80;
}

.left-header,
.right-header {
  margin-top: 20px;
}

.impact-box-left {
  border-bottom-left-radius: 30px;
  border-top-left-radius: 30px;
}

.impact-box-left,
.left-side,
.right-side,
.left-header,
.right-header,
.green-header-text,
.green-paragraph-text,
.paragraph-text,
.header-text,
.left-paragraph,
.right-paragraph {
  background-color: #f6f6f6;
}

.impact-box-right,
.impact-box-header,
.impact-box-body {
  background-color: #00a2e6;
}

.impact-box-right {
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.impact-box-header {
  font-size: 2rem;
  font-weight: bold;
}

.impact-box-body {
  margin-top: 30px;
  font-size: 1.2rem;
  line-height: 2rem;
}

.fundings-chart-container {
  width: 95%;
  height: 500px;
  margin-top: 30px;
  border-radius: 20px;
  border: 1px solid gray;
  padding: 25px;
}
</style>
