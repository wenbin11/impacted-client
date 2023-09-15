<template>
  <div class="success-page">
    <img src="/images/success.png" alt="success" />
    <div class="success-header">Payment Successful!</div>
    <div class="details-header">Transaction Details</div>
    <div class="container">
      <div class="left-side">
        <span class="details"> Transaction ID: </span>
        <span class="details"> Donation Cause: </span>
        <span class="details"> Amount: </span>
        <span class="details"> Timestamp: </span>
      </div>
      <div class="right-side">
        <span class="details">
          {{ donationData.donationid }}
        </span>
        <span class="details">
          {{ causeData.causename }}
        </span>
        <span class="details"> $ {{ causeData.currentamountdonated }} </span>
        <span class="details"> {{ time }} </span>
      </div>
    </div>
    <div class="thank-you-text">Have a Nice Day!</div>
    <blue-button buttonText="Back to Home" routeName="Home" />
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import BlueButton from "../components/BlueButton.vue";

/**
 * Component to render a payment success page
 */
export default {
  components: { BlueButton },
  data() {
    return {
      donationData: null,
      causeData: null,
      time: "",
    };
  },
  created() {
    const causeId = this.$route.query.causeId;
    const userId = this.$route.query.userId;
    const donationAmount = this.$route.query.donationAmount;

    // Send a GET request to fetch data from the backend.
    axios
      .get(
        `http://localhost:8080/success?causeId=${causeId}&userId=${userId}&donationAmount=${donationAmount}`
      )
      .then((response) => {
        [this.donationData, this.causeData] = response.data;
        const timestamp = this.donationData.donationtime;
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formattedDate = `${year}-${month}-${day}`;
        this.time = formattedDate;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.success-page {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  margin-top: 100px;
  width: 100px;
  height: 100px;
}

.success-header {
  margin-top: 10px;
  color: #4bae4f;
  font-size: 2.5rem;
}

.details-header {
  margin-top: 20px;
  font-size: 1.5rem;
  font-weight: bold;
}

.container {
  border: 1px solid #c3c3c3;
  margin-top: 30px;
  border-radius: 20px;
  width: 50vw;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
}

.left-side,
.right-side {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.left-side {
  text-align: left;
}

.right-side {
  text-align: right;
}

.details {
  margin-top: 5px;
  margin-bottom: 5px;
  font-weight: bold;
}

.thank-you-text {
  margin-top: 20px;
  color: #687781;
  font-size: 1.2rem;
}
</style>
