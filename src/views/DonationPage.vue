<template>
  <!-- Donation Page Container -->
  <div class="donation-page">
    <!-- Page Content Container -->
    <div class="content-container">
      <!-- Header Container -->
      <div class="header-container">
        <!-- Page Title -->
        <h1>Choose Where To</h1>
        <h1 class="header-main">Donate</h1>
      </div>
    </div>
    <!-- Donation Box Container -->
    <div class="donation-boxes-container">
      <!-- Iterate through Donation Options -->
      <div v-for="(box, index) in donationData" :key="index">
        <!-- Donation Container Component -->
        <donation-container :boxData="box" />
      </div>
    </div>
  </div>
</template>

<script>
import DonationContainer from "../components/DonationContainer.vue";
import axios from "axios";

/**
 * The DonationPage component represents a page where users can choose where to make donations.
 */
export default {
  components: { DonationContainer },
  data() {
    return {
      donationData: [],
    };
  },
  created() {
    // Fetch donation options data from the backend API
    axios
      .get("http://localhost:8080/donation")
      .then((response) => {
        this.donationData = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.content-container {
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
  font-size: 2.5rem;
}

.header-main {
  margin-left: 10px;
  color: #00a2e6;
  font-weight: bold;
}

.donation-boxes-container {
  width: 90vw;
  margin: 70px auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}
</style>
