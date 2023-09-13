<template>
  <div class="edit-cause-page">
    <div class="header">Edit Cause</div>
    <form @submit.prevent="updateCause" class="update-form">
      <div class="form-group">
        <div v-if="updateError" class="error-message">
          Update Unsuccessful!
          <ul>
            <li v-for="(error, index) in message.errors" :key="index">
              {{ error.msg }}
            </li>
          </ul>
        </div>
        <label for="cause-name">Cause Name:</label>
        <input type="text" id="cause-name" v-model="newCauseName" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="description">Target Amount:</label>
          <input
            type="text"
            id="description"
            v-model="newTargetAmount"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="description">Current Amount Donated:</label>
          <input
            type="text"
            id="description"
            v-model="newCurrentAmount"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="description">Number of Supplies Per Dollar:</label>
          <input
            type="text"
            id="description"
            v-model="newSuppliesPerDollar"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="description">Type ID:</label>
          <input
            type="number"
            id="description"
            v-model="newTypeId"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="File-Name">File Name:</label>
          <input type="text" id="File-Name" v-model="newImgPath" required />
        </div>
      </div>
      <message-modal
        :visible="updateSuccess"
        header="Cause Updated"
        message="Your cause has been successfully updated."
        @confirm="redirectToCauseDashboard"
      ></message-modal>
      <button type="submit" class="update-btn">Save Changes</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import MessageModal from "../../components/MessageModal.vue";

export default {
  components: { MessageModal },
  data() {
    return {
      newCauseName: "",
      newTargetAmount: "",
      newCurrentAmount: "",
      newSuppliesPerDollar: "",
      newTypeId: "",
      newImgPath: "",
      updateSuccess: false,
      updateError: false,
      message: "",
    };
  },
  created() {
    const causeId = this.$route.params.causeId;

    axios
      .get(`http://localhost:8080/dashboard/get-cause/${causeId}`) // Replace with your API endpoint
      .then((response) => {
        console.log(response.data);
        // Populate the input fields with retrieved data
        this.newCauseName = response.data.causename;
        this.newTargetAmount = response.data.targetedamount;
        this.newCurrentAmount = response.data.currentamountdonated;
        this.newSuppliesPerDollar = response.data.suppliesdonatedperdollar;
        this.newTypeId = response.data.typeid;
        this.newImgPath = response.data.image_path;
      })
      .catch((error) => {
        console.error("Error fetching profile data", error);
      });
  },
  methods: {
    updateCause() {
      // Fetch the user's current profile data from the server
      const causeId = this.$route.params.causeId;
      // Create an object to send as the request payload
      const badgeData = {
        causeName: this.newCauseName,
        targetedAmount: this.newTargetAmount,
        currentAmountDonated: this.newCurrentAmount,
        suppliesDonatedPerDollar: this.newSuppliesPerDollar,
        typeId: this.newTypeId,
        image_path: this.image_path,
      };

      // Make a POST request to your backend update endpoint
      axios
        .post(
          `http://localhost:8080/dashboard/update-cause/${causeId}`,
          badgeData
        )
        .then((response) => {
          console.log(response.data);
          this.updateSuccess = true;
        })
        .catch((error) => {
          console.log("Update error", error.response.data);
          this.message = error.response.data;
          this.updateError = true;
        });
    },
    redirectToCauseDashboard() {
      this.updateSuccess = false;
      this.$router.push("/dashboard/causes");
    },
  },
};
</script>

<style scoped>
.edit-cause-page {
  width: 100vw;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header {
  font-size: 40px;
  font-weight: bold;
}

.error-message {
  color: #ee0000;
  font-size: 1rem;
}

.update-form {
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
}

.form-row {
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.update-btn {
  background-color: #00a2e6;
  font-weight: bold;
  font-size: 16px;
  width: 100%;
  max-width: 500px;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.update-btn:hover {
  background-color: #0056b3;
}
</style>
