<template>
  <div class="single-donation-box-container">
    <div class="cause-name">
      <h3>{{ boxData.causename }}</h3>
    </div>
    <img :src="img_path" class="main-img" />
    <div class="target-and-supporters">
      <div class="target">
        <img src="../assets/donations/target.png" alt="target" />
        <p class="target-count">
          {{
            getTargetNumberTextContent(boxData.targetsupplies, boxData.typename)
          }}
        </p>
      </div>
      <div class="supporter">
        <img src="../assets/donations/supporters.png" alt="supporters" />
        <p class="supporter-count">
          {{ getSupporterTextContent(boxData.totalsupporters) }}
        </p>
      </div>
    </div>
    <div class="progress-bar">
      <div class="progress" :style="{ width: getProgressWidth(boxData) }"></div>
    </div>
    <div class="current-and-percentage">
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
      <div class="percentage">
        <p class="percentage-count">
          {{
            parseInt((boxData.currentsupplies / boxData.targetsupplies) * 100)
          }}%
        </p>
      </div>
    </div>
    <button class="donate-btn">Donate Now</button>
  </div>
</template>

<script>
export default {
  props: {
    boxData: Object,
  },
  data() {
    return {
      img_path: "images/donations/",
      publicPath: process.env.BASE_URL,
    };
  },
  mounted() {
    console.log(this.boxData.image_path);
    this.img_path = "images/donations/" + this.boxData.image_path;
    console.log(this.boxData);
  },
  methods: {
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
    getSupporterTextContent(supporterNumber) {
      supporterNumber = parseInt(supporterNumber);
      if (supporterNumber === 1) {
        return `${supporterNumber} supporter`;
      }
      return `${supporterNumber} supporters`;
    },
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
.single-donation-box-container {
  width: 300px;
  height: 400px;
  background-color: #f6f6f6;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
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
  width: 280px;
  height: 150px;
  object-fit: cover;
}

.target-and-supporters {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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
  width: 270px;
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
  width: 275px;
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
