<template>
  <div class="donation-page">
    <div class="container">
      <div class="header-container">
        <h1>Choose Where To</h1>
        <h1 class="header-main">Donate</h1>
      </div>
    </div>
    <div class="donation-box-container">
      <div v-for="(box, index) in donationData" :key="index">
        <donation-container :boxData="box" />
      </div>
    </div>
  </div>
</template>

<script>
import DonationContainer from "../components/DonationContainer.vue";
import axios from "axios";

export default {
  components: { DonationContainer },
  data() {
    return {
      donationData: [],
    };
  },
  created() {
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

.donation-box-container {
  width: 90vw;
  margin: 70px auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 35px;
}
</style>
