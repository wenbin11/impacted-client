<template>
  <div class="payment-page">
    <div class="header">{{ causeData.causename }}</div>
    <div class="containers">
      <!-- Left Container -->
      <div class="left-container">
        <!-- Main Image -->
        <img :src="img_path" class="main-img" />
        <!-- Target and Supporters Information -->
        <div class="target-and-supporters">
          <!-- Target -->
          <div class="target">
            <img src="../assets/donations/target.png" alt="target" />
            <p class="target-count">
              {{ parseInt(causeData.targetsupplies) }}
              {{ getSupplyType(causeData.typename) }}
            </p>
          </div>
          <!-- Supporters -->
          <div class="supporter">
            <img src="../assets/donations/supporters.png" alt="supporters" />
            <p class="supporter-count">
              {{ getSupporterTextContent(causeData.totalsupporters) }}
            </p>
          </div>
        </div>
        <!-- Progress Bar -->
        <div class="progress-bar">
          <div
            class="progress"
            :style="{ width: getProgressWidth(causeData) }"
          ></div>
        </div>
        <!-- Current and Percentage Information -->
        <div class="current-and-percentage">
          <!-- Current -->
          <div class="current">
            <p class="current-count">
              {{ parseInt(causeData.currentsupplies) }}
              {{ getSupplyType(causeData.typename) }}
            </p>
          </div>
          <!-- Percentage -->
          <div class="percentage">
            <p class="percentage-count">
              {{
                parseInt(
                  (causeData.currentsupplies / causeData.targetsupplies) * 100
                )
              }}%
            </p>
          </div>
        </div>
      </div>
      <div class="right-container">
        <div class="donate-title">Donate</div>
        <div class="donation-amount">SGD {{ donationAmount.toFixed(2) }}</div>
        <div class="supply-count">
          {{ supplyCount }} {{ getSupplyType(causeData.typename) }}
        </div>

        <div class="button-row-1">
          <button
            class="amount-btn"
            :class="{ 'selected-btn': selectedAmount === 10 }"
            @click="updateDonationAmountAndSupplyCount(singleSupplyAmount, 10)"
          >
            SGD {{ singleSupplyAmount }}
          </button>
          <button
            class="amount-btn"
            :class="{ 'selected-btn': selectedAmount === 25 }"
            @click="updateDonationAmountAndSupplyCount(tenSupplyAmount, 25)"
          >
            SGD {{ tenSupplyAmount }}
          </button>
          <button
            class="amount-btn"
            :class="{ 'selected-btn': selectedAmount === 50 }"
            @click="updateDonationAmountAndSupplyCount(fiftySupplyAmount, 50)"
          >
            SGD {{ fiftySupplyAmount }}
          </button>
        </div>

        <div class="button-row-2">
          <button
            class="amount-btn"
            :class="{ 'selected-btn': selectedAmount === 100 }"
            @click="
              updateDonationAmountAndSupplyCount(hundredSupplyAmount, 100)
            "
          >
            SGD {{ hundredSupplyAmount }}
          </button>
          <input
            type="text"
            v-model="customAmount"
            @input="onCustomAmountInput"
            placeholder="Enter amount"
          />
        </div>

        <!-- Trigger Stripe Checkout -->
        <button @click="openStripeCheckout" class="stripe-checkout-button">
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

export default {
  data() {
    return {
      causeData: [],
      selectedAmount: 0,
      donationAmount: 0,
      supplyCount: 0,
      img_path: "",
      stripe: null,
    };
  },
  computed: {
    singleSupplyAmount() {
      const amount = (10 / this.causeData.suppliesdonatedperdollar).toFixed(2);
      return (Math.round(amount * 10) / 10).toFixed(2);
    },
    tenSupplyAmount() {
      const amount = (25 / this.causeData.suppliesdonatedperdollar).toFixed(2);
      return (Math.round(amount * 10) / 10).toFixed(2);
    },
    fiftySupplyAmount() {
      const amount = (50 / this.causeData.suppliesdonatedperdollar).toFixed(2);
      return (Math.round(amount * 10) / 10).toFixed(2);
    },
    hundredSupplyAmount() {
      const amount = (100 / this.causeData.suppliesdonatedperdollar).toFixed(2);
      return (Math.round(amount * 10) / 10).toFixed(2);
    },
  },
  created() {
    const causeId = this.$route.params.causeid;
    console.log(this.$store.state.currentUser);
    axios
      .get(`http://localhost:8080/cause/${causeId}`)
      .then((response) => {
        this.causeData = response.data;
        this.img_path = "/images/donations/" + this.causeData.image_path;
        this.updateDonationAmountAndSupplyCount(this.tenSupplyAmount, 25);
        this.selectedAmount = 25;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async mounted() {
    this.stripe = await loadStripe(
      "pk_test_51NoPdMEP2bjB1IECzVWAR2HX0OExX2M6y46HThmx9t1ORlev6kcBmI5Qf5QBWdQE5P3bErFsghAo0Ui5qTv64pqg006hnyFp9w"
    );
  },
  methods: {
    async openStripeCheckout() {
      // Check if stripe is defined and donationAmount is greater than 0
      if (!this.stripe || this.donationAmount <= 0) {
        return;
      }

      try {
        const { sessionId } = await this.createStripeCheckoutSession();
        if (!sessionId) {
          console.error("Error with Session Id:", error);
          return;
        }

        // Redirect the user to the Stripe Checkout page
        const { error } = await this.stripe.redirectToCheckout({
          sessionId,
        });

        if (error) {
          console.error("Error redirecting to Stripe Checkout:", error);
        }
      } catch (error) {
        console.error("Error opening Stripe Checkout:", error);
      }
    },
    async createStripeCheckoutSession() {
      try {
        console.log(this.$store.state.currentUser);
        const response = await axios.post(
          `http://localhost:8080/cause/${this.$route.params.causeid}/checkout`,
          {
            causeName: this.causeData.causename,
            donationAmount: this.donationAmount,
            userId: this.$store.state.currentUser,
            causeId: this.$route.params.causeid,
          }
        );

        return response.data;
      } catch (error) {
        console.error("Error creating Stripe Checkout session:", error);
        return { error: "Failed to create Stripe Checkout session." };
      }
    },
    // function to format target number text
    getSupplyType(typeName) {
      if (typeName === "Infrastructure Development") {
        return "centers";
      } else if (typeName === "School Supplies") {
        return "supplies";
      } else if (typeName === "Scholarships") {
        return "scholarships";
      } else {
        return "programs";
      }
    },
    // function to format supporter number text
    getSupporterTextContent(supporterNumber) {
      supporterNumber = parseInt(supporterNumber);
      if (supporterNumber === 1) {
        return `${supporterNumber} supporter`;
      }
      return `${supporterNumber} supporters`;
    },
    // function to calculate progress width
    getProgressWidth(causeData) {
      const progress = parseInt(
        (causeData.currentsupplies / causeData.targetsupplies) * 100
      );
      return `${progress}%`;
    },
    updateDonationAmountAndSupplyCount(amount, supply) {
      this.donationAmount = parseFloat(amount);
      this.selectedAmount = supply;
      this.supplyCount = supply;
    },
    updateCustomDonation() {
      this.donationAmount = parseFloat(this.customAmount);
      this.supplyCount = Math.floor(
        this.causeData.suppliesdonatedperdollar * this.customAmount
      );
    },
    onCustomAmountInput(event) {
      const regex = /^[0-9]*(\.[0-9]*)?$/;
      const inputValue = event.target.value;

      if (regex.test(inputValue)) {
        event.target.value = parseFloat(event.target.value).toFixed(2);
        // Update the customAmount if the input is valid
        this.customAmount = inputValue;
        this.updateCustomDonation();
      } else {
        // Clear the input if it's not valid (non-numeric characters)
        event.target.value = 0;
        this.donationAmount = parseFloat(0);
      }
    },
  },
};
</script>

<style scoped>
.payment-page {
  width: 85vw;
  margin: 50px auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header {
  font-size: 2.5rem;
  font-weight: bold;
}

.containers {
  width: 70vw;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 50px;
}

.left-container {
  flex: 0 0 calc(50% - 20px);
  height: 550px;
  background-color: #f6f6f6;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.main-img {
  border-radius: 20px;
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.target-and-supporters {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  background-color: #f6f6f6;
}

.current-and-percentage {
  display: flex;
  margin-bottom: 30px;
  justify-content: space-between;
  margin-top: 10px;
  background-color: #f6f6f6;
}

.target,
.supporter,
.percentage,
.current {
  display: flex;
  background-color: #f6f6f6;
}

.target,
.current {
  margin-left: 50px;
}

.target-count {
  background-color: #f6f6f6;
  margin-left: 10px;
  color: #687781;
}

.current-count {
  background-color: #f6f6f6;
  font-size: 1.2rem;
  font-weight: bold;
  color: #00a2e6;
}

.supporter-count {
  background-color: #f6f6f6;
  margin-left: 10px;
  margin-right: 50px;
  color: #687781;
}

.percentage-count {
  background-color: #f6f6f6;
  margin-right: 50px;
  font-size: 1rem;
  color: #687781;
}

img {
  width: 25px;
  height: 25px;
  color: #687781;
  background-color: #f6f6f6;
}

.progress-bar {
  width: 552px;
  height: 7.5px;
  margin-left: 50px;
  margin-right: 50px;
  background-color: #d1d1d1;
  border-radius: 50px;
  margin-top: 10px;
}

.progress {
  height: 7.5px;
  border-radius: 50px;
  background-color: #00a2e6;
}

.right-container {
  flex: 0 0 calc(50% - 20px);
  height: 550px;
  background-color: #f6f6f6;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
}

.donate-title {
  background-color: #f6f6f6;
  margin-top: 30px;
  font-weight: bold;
  font-size: 1.5rem;
}

.donation-amount {
  margin-top: 10px;
  background-color: #f6f6f6;
  color: #00a2e6;
  font-size: 3rem;
  font-weight: bold;
}

.supply-count {
  margin-top: 10px;
  background-color: #f6f6f6;
  color: #6c757d;
  font-size: 1.25rem;
}

.button-row-1,
.button-row-2 {
  background-color: #f6f6f6;
  margin: 10px 30px;
  display: flex;
  justify-content: space-between;
}

.button-row-1 {
  margin-top: 75px;
}

.amount-btn {
  width: 190px;
  background-color: #f6f6f6;
  border: 1px solid #c3c3c3;
  padding: 15px 0px;
  font-size: 1.2rem;
  border-radius: 10px;
  cursor: pointer;
}

.amount-btn:hover {
  background-color: #00a2e6;
  color: white;
  border: none;
}

.selected-btn {
  background-color: #00a2e6;
  color: white;
  border: none;
  width: 190px;
  border: 1px solid #c3c3c3;
  padding: 15px 0px;
  font-size: 1.2rem;
  border-radius: 10px;
  cursor: pointer;
}

input {
  flex: 2;
  background-color: #f6f6f6;
  border: 1px solid #c3c3c3;
  font-size: 1.2rem;
  border-radius: 10px;
  padding: 0px 10px;
  margin-left: 10px;
}

.stripe-checkout-button {
  /* Your custom styles here */
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 80px;
  background-color: #00a2e6;
  color: white;
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.stripe-checkout-button:hover {
  background-color: #0056b3;
}
</style>
