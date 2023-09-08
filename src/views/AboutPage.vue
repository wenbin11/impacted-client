<template>
  <div class="about-page">
    <!-- Purpose Container -->
    <div class="container">
      <!-- Purpose Header -->
      <div class="header-container">
        <h1>Our</h1>
        <h1 class="header-main">Purpose</h1>
      </div>
      <!-- Purpose Body-Text -->
      <p class="purpose-body-text">
        Our vision at ImpactEd is a world where every child has equal access to
        quality education, empowering them to reach their full potential and
        create positive change in their communities. We envision a future where
        education knows no boundaries and serves as a catalyst for social and
        economic progress, fostering a more equitable and sustainable world.
      </p>
      <img src="../assets/about/purpose.jpg" class="purpose" />
    </div>

    <!-- Core Values Container -->
    <div class="container">
      <!-- Core Values Header -->
      <div class="header-container">
        <h1>Our</h1>
        <h1 class="header-main">Core Values</h1>
      </div>
      <!-- values-box Containers -->
      <div class="values-box-container">
        <!-- values-box 1 -->
        <div class="values-box">
          <h2 class="value-title">Innovation</h2>
          <div class="value-body-text">
            We embrace innovative approaches to education, leveraging
            technology, research, and best practices to drive meaningful and
            sustainable change in teaching and learning methods
          </div>
        </div>
        <!-- values-box 2 -->
        <div class="values-box">
          <h2 class="value-title">Transparency</h2>
          <div class="value-body-text">
            We are committed to providing clear and accurate information about
            our initiatives, impact, and financial management.
          </div>
        </div>
        <!-- values-box 3 -->
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
      <div class="impact-container">
        <div class="impact-box-left">
          <div class="left-side">
            <div class="left-header">
              <span class="header-text">292 learning resources</span>
            </div>
            <div class="left-paragraph">
              <span class="paragraph-text">distributed</span>
            </div>
            <div class="left-header">
              <span class="header-text">34 supporters</span>
            </div>
            <div class="left-paragraph">
              <span class="paragraph-text">promoting learning</span>
            </div>
            <div class="left-header">
              <span class="header-text">2 goals</span>
            </div>
            <div class="left-paragraph">
              <span class="paragraph-text">achieved</span>
            </div>
          </div>
          <div class="right-side">
            <div class="right-header">
              <span class="green-header-text">+20</span>
            </div>
            <div class="right-paragraph">
              <span class="green-paragraph-text">in the last 7 days</span>
            </div>
            <div class="right-header">
              <span class="green-header-text">+2</span>
            </div>
            <div class="right-paragraph">
              <span class="green-paragraph-text">in the last 30 days</span>
            </div>
            <div class="right-header">
              <span class="green-header-text">+1</span>
            </div>
            <div class="right-paragraph">
              <span class="green-paragraph-text">in the last 90 days</span>
            </div>
          </div>
        </div>
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

    <div class="container">
      <!-- Fundings Header -->
      <div class="header-container">
        <h1>Our</h1>
        <h1 class="header-main">Funding Commitment</h1>
      </div>
      <div class="fundings-chart-container" ref="chartRef"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
// import ApiEndPoints from "../services/apiEndPoints";

export default {
  data() {
    return {
      aboutData: [],
      pieChartData: {
        legend: [
          "Educational Programs",
          "Building Teaching Centres",
          "Scholarships Awarded",
          "School Supplies",
        ],
        seriesData: [102, 102, 300, 410],
      },
    };
  },
  mounted() {
    // Fetch data from API endpoint
    // ApiEndPoints.getAboutData()
    //   .then((response) => {
    //     this.aboutData = response.data;
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    axios
      .get("http://localhost:8080/about")
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    renderChart() {
      const chart = echarts.init(this.$refs.chartRef);
      const option = {
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
          data: this.pieChartData.legend,
        },
        series: [
          {
            type: "pie",
            radius: "70%",
            center: ["50%", "60%"],
            data: this.pieChartData.seriesData.map((value, index) => ({
              name: this.pieChartData.legend[index],
              value,
            })),
            label: {
              show: true,
              fontSize: 20,
              formatter: "${c}\n{d}%",
            },
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
      chart.setOption(option);
    },
  },
};
</script>

<style scoped>
.container {
  width: 85vw;
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
  font-size: 48px;
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
  width: 85vw;
  border-radius: 30px;
  object-fit: cover;
}

.values-box-container {
  width: 85vw;
  margin-top: 30px;
  display: flex;
  gap: 75px;
}

.values-box {
  width: calc(33.3%);
  border: 1px solid gray;
  border-radius: 30px;
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
  border-radius: 30px;
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
  font-size: 1.8rem;
  font-weight: bold;
}

.green-paragraph-text,
.paragraph-text {
  font-size: 1.5rem;
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
  background-color: white;
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
  width: 100%;
  height: 300px;
  margin-top: 30px;
  border-radius: 30px;
  border: 1px solid gray;
  padding: 20px;
}
</style>
