<template>
  <!-- Single Donation Box Container -->
  <div class="single-donation-box-container">
    <!-- Cause Name -->
    <div class="cause-name">
      <h3>{{ boxData.causename }}</h3>
    </div>
    <!-- Main Image -->
    <img :src="img_path" class="main-img" />
    <!-- Target and Supporters Information -->
    <div class="target-and-supporters">
      <!-- Target -->
      <div class="target">
        <img src="../assets/donations/target.png" alt="target" />
        <p class="target-count">
          {{
            getTargetNumberTextContent(boxData.targetsupplies, boxData.typename)
          }}
        </p>
      </div>
      <!-- Supporters -->
      <div class="supporter">
        <img src="../assets/donations/supporters.png" alt="supporters" />
        <p class="supporter-count">
          {{ getSupporterTextContent(boxData.totalsupporters) }}
        </p>
      </div>
    </div>
    <!-- Progress Bar -->
    <div class="progress-bar">
      <div class="progress" :style="{ width: getProgressWidth(boxData) }"></div>
    </div>
    <!-- Current and Percentage Information -->
    <div class="current-and-percentage">
      <!-- Current -->
      <div class="current">
        <p class="current-count">
          {{
            getTargetNumberTextContent(
              boxData.currentsupplies,
              boxData.typename
            )
          }}
        </p>
      </div>
      <!-- Percentage -->
      <div class="percentage">
        <p class="percentage-count">
          {{
            parseInt((boxData.currentsupplies / boxData.targetsupplies) * 100)
          }}%
        </p>
      </div>
    </div>
    <!-- Donate Button -->
    <button class="donate-btn">Donate Now</button>
  </div>
</template>

<script>
/**
 * DonationContainer.vue
 *
 * This Vue.js component represents a single donation box container that displays information about a specific cause
 * and allows users to make donations. It provides details such as the cause name, an image, target supplies, supporters,
 * donation progress, and a donate button.
 */
export default {
  props: {
    boxData: Object,
  },
  data() {
    return {
      img_path: "",
    };
  },
  mounted() {
    // Set the image path dynamically
    this.img_path = "images/donations/" + this.boxData.image_path;
  },
  methods: {
    // Helper function to format target number text
    getTargetNumberTextContent(targetNumber, typeName) {
      targetNumber = parseInt(targetNumber);
      if (typeName === "Infrastructure Development") {
        return `${targetNumber} centers`;
      } else if (typeName === "School Supplies") {
        return `${targetNumber} supplies`;
      } else if (typeName === "Scholarships") {
        return `${targetNumber} scholarships`;
      } else {
        return `${targetNumber} programs`;
      }
    },
    // Helper function to format supporter number text
    getSupporterTextContent(supporterNumber) {
      supporterNumber = parseInt(supporterNumber);
      if (supporterNumber === 1) {
        return `${supporterNumber} supporter`;
      }
      return `${supporterNumber} supporters`;
    },
    // Helper function to calculate progress width
    getProgressWidth(boxData) {
      const progress = parseInt(
        (boxData.currentsupplies / boxData.targetsupplies) * 100
      );
      return `${progress}%`;
    },
  },
};
</script>

<style scoped>
/* Scoped CSS Styles for the DonationContainer Component */
.single-donation-box-container {
  width: 325px;
  height: 400px;
  background-color: #f6f6f6;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cause-name {
  background-color: #f6f6f6;
}

.cause-name h3 {
  margin-top: 5px;
  padding: 5px;
  text-align: center;
  background-color: #f6f6f6;
}

.main-img {
  margin-top: 10px;
  border-radius: 20px;
  width: 305px;
  height: 150px;
  object-fit: cover;
}

.target-and-supporters {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  background-color: #f6f6f6;
}

.current-and-percentage {
  display: flex;
  margin-bottom: 10px;
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
  margin-left: 10px;
}

.target-count {
  background-color: #f6f6f6;
  margin-left: 5px;
  font-size: 0.8rem;
  color: #687781;
}

.current-count {
  background-color: #f6f6f6;
  margin-left: 5px;
  font-size: 1rem;
  font-weight: bold;
  color: #00a2e6;
}

.supporter-count {
  background-color: #f6f6f6;
  margin-left: 5px;
  margin-right: 10px;
  font-size: 0.8rem;
  color: #687781;
}

.percentage-count {
  background-color: #f6f6f6;
  margin-left: 5px;
  margin-right: 10px;
  font-size: 1rem;
  color: #687781;
}

img {
  width: 18px;
  height: 18px;
  color: #687781;
  background-color: #f6f6f6;
}

.progress-bar {
  width: 295px;
  height: 5px;
  margin-left: 5px;
  background-color: #d1d1d1;
  border-radius: 50px;
  margin-top: 10px;
}

.progress {
  height: 5px;
  border-radius: 50px;
  background-color: #00a2e6;
}

.donate-btn {
  background-color: #00a2e6;
  border: none;
  font-family: "Russo One";
  width: 300px;
  height: 50px;
  border-radius: 20px;
  margin-bottom: 10px;
  color: white;
  cursor: pointer;
}

.donate-btn:hover {
  background-color: #0056b3;
}
</style>
