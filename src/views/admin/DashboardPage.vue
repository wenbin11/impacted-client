<template>
  <div class="dashboard-page">
    <div class="statistics-group">
      <div class="statistics-box">
        <div class="header-row">
          <div class="title">Total Donors:</div>
          <div class="value">{{ totalSupporters }}</div>
        </div>
        <div class="support-chart-container">
          <div class="supportChart" ref="supportChart"></div>
        </div>
      </div>
      <div class="statistics-box">
        <div class="header-row">
          <div class="title">Total Donations:</div>
          <div class="value">${{ totalAmount }}</div>
        </div>
        <div class="type-chart-container">
          <div class="typeChart" ref="typeChart"></div>
        </div>
      </div>
    </div>

    <div class="amount-chart-container">
      <div class="amountChart" ref="amountChart"></div>
    </div>

    <div class="table-container">
      <div class="table-header">Database Tables</div>
      <table>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
        <tr>
          <td>Users</td>
          <td>
            <router-link to="/dashboard/user"
              ><button class="blue-btn">Edit</button></router-link
            >
          </td>
        </tr>
        <tr>
          <td>Donation Types</td>
          <td>
            <router-link to="/dashboard/type"
              ><button class="blue-btn">Edit</button></router-link
            >
          </td>
        </tr>
        <tr>
          <td>Donations</td>
          <td>
            <router-link to="/dashboard/donation"
              ><button class="blue-btn">Edit</button></router-link
            >
          </td>
        </tr>
        <tr>
          <td>Educational Causes</td>
          <td>
            <router-link to="/dashboard/cause"
              ><button class="blue-btn">Edit</button></router-link
            >
          </td>
        </tr>
        <tr>
          <td>Badges</td>
          <td>
            <router-link to="/dashboard/badge"
              ><button class="blue-btn">Edit</button></router-link
            >
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";

export default {
  data() {
    return {
      donationData: "",
      supporterData: "",
      typeData: "",
      totalAmount: 0,
      totalSupporters: 0,
    };
  },
  created() {
    axios
      .get("http://localhost:8080/dashboard")
      .then((response) => {
        this.donationData = response.data.donations;
        this.supporterData = response.data.supporters;
        this.typeData = response.data.types;
        this.totalAmount = response.data.totalAmount.total;
        this.totalSupporters = response.data.totalUsers.total;

        this.renderLineChart();
        this.renderPieChart();
        this.renderStackedAreaChart();
      })
      .catch((error) => {
        console.error("Error fetching profile data", error);
      });
  },
  methods: {
    renderPieChart() {
      const chart = echarts.init(this.$refs.typeChart);
      const option = {
        // Configuration options for the chart.
        title: {
          left: 20,
          text: "Donations Overview (SGD)",
          textStyle: {
            fontSize: 20,
          },
        },
        legend: {
          right: 30,
          top: 40,
          textStyle: {
            fontSize: 12,
          },
          data: this.typeData.typeLegend,
        },
        series: [
          {
            type: "pie",
            radius: "60%",
            center: ["50%", "60%"],
            data: this.typeData.typeSeries.map((value, index) => ({
              // Configure pie chart series data.
              name: this.typeData.typeLegend[index],
              value,
            })),
            label: {
              show: true,
              fontSize: 16,
              // Configure label format
              formatter: "${c}\n{d}%",
            },
            // Apply emphasis to labels.
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: "bold",
              },
            },
          },
        ],
      };
      // Set the chart's configuration options and render it.
      chart.setOption(option);
    },
    renderLineChart() {
      const chart = echarts.init(this.$refs.supportChart);

      const formattedDates = this.supporterData.supportersDate.map((date) => {
        const dateString = new Date(date);
        const year = dateString.getFullYear();
        const month = String(dateString.getMonth() + 1).padStart(2, "0");
        const day = String(dateString.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
      });

      const seriesData = this.supporterData.supportersSeries.map((str) =>
        parseFloat(str)
      );

      const option = {
        // Configuration options for the chart.
        title: {
          left: 20,
          text: "Donor Growth Over Time",
          textStyle: {
            fontSize: 20,
          },
        },
        xAxis: {
          type: "category",
          data: formattedDates,
          axisLabel: {
            fontSize: 12,
          },
        },
        grid: {
          top: "20%",
        },
        yAxis: {
          type: "value",
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "#f0f0f0",
          textStyle: {
            fontSize: 15,
          },
        },
        series: [
          {
            data: seriesData,
            type: "line",
          },
        ],
      };
      // Set the chart's configuration options and render it.
      chart.setOption(option);
    },
    renderStackedAreaChart() {
      const chart = echarts.init(this.$refs.amountChart);

      const formattedDates = this.donationData.donationDate.map((date) => {
        const dateString = new Date(date);
        const year = dateString.getFullYear();
        const month = String(dateString.getMonth() + 1).padStart(2, "0");
        const day = String(dateString.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
      });

      const seriesData = this.donationData.donationSeries.map((str) =>
        parseFloat(str)
      );

      const option = {
        // Configuration options for the chart.
        title: {
          left: 20,
          top: 10,
          text: "Daily Donation Amount Trends",
          textStyle: {
            fontSize: 24,
          },
        },
        grid: {
          top: "20%",
        },
        xAxis: {
          type: "category",
          data: formattedDates,
          axisLabel: {
            fontSize: 15,
            rotate: 75,
          },
        },
        yAxis: {
          type: "value",
          name: "SGD ($)",
          nameLocation: "center",
          nameGap:  80,
          nameTextStyle: {
            fontSize: 16,
          },
          axisLabel: {
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "#f0f0f0",
          textStyle: {
            fontSize: 15,
          },
        },
        series: [
          {
            data: seriesData,
            type: "line",
            areaStyle: {},
            symbolSize: 7,
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
.dashboard-page {
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.statistics-group {
  width: 80vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.statistics-box {
  padding: 20px;
  border-radius: 10px;
  border: 1px solid black;
}

.header-row {
  display: flex;
  margin-bottom: 30px;
}

.title {
  margin-left: 20px;
  color: #687781;
  margin-top: 17.5px;
  font-size: 1.25rem;
}

.value {
  font-weight: bold;
  font-size: 3rem;
  text-align: center;
  margin-left: 20px;
}

.support-chart-container,
.type-chart-container {
  width: 35vw;
  height: 500px;
}

.supportChart,
.amountChart,
.typeChart {
  width: 100%;
  height: 100%;
}

.amount-chart-container {
  border: 1px solid black;
  width: 80vw;
  margin: 30px 0px;
  padding: 30px;
  border-radius: 10px;
}

.amountChart {
  width: 75vw;
  height: 700px;
}

.table-container {
  width: 80vw;
  margin: 30px 0px;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid black;
}

.table-header {
  font-size: 1.5rem;
  font-weight: bold;
}

table {
  margin: 20px auto;
  border-collapse: collapse;
}

tr,
th,
td {
  padding: 10px 200px;
}

th,
td {
  border: 1px solid #ccc;
  font-size: 1.5rem;
}

.blue-btn {
  background-color: #00a2e6;
  font-weight: bold;
  font-size: 16px;
  width: 100%;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.blue-btn:hover {
  background-color: #0056b3;
}
</style>
