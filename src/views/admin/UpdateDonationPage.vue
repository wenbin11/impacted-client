<template>
  <div class="edit-type-page">
    <div class="header">Edit Donation</div>
    <form @submit.prevent="updateDonation" class="update-form">
      <div class="form-group">
        <div v-if="updateError" class="error-message">
          Update Unsuccessful!
          <ul>
            <li v-for="(error, index) in message.errors" :key="index">
              {{ error.msg }}
            </li>
          </ul>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="description">Amount Donated:</label>
            <input
              type="text"
              id="description"
              v-model="editedAmountDonated"
              required
            />
          </div>
        </div>
        <message-modal
          :visible="updateSuccess"
          header="Donation Updated"
          message="Your donation has been successfully updated."
          @confirm="redirectToDonationDashboard"
        ></message-modal>
        <button type="submit" class="update-btn">Save Changes</button>
      </div>
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
      editedAmountDonated: "",
      updateSuccess: false,
      updateError: false,
      message: "",
    };
  },
  created() {
    const donationId = this.$route.params.donationId;

    axios
      .get(`http://localhost:8080/dashboard/get-donation/${donationId}`)
      .then((response) => {
        console.log(response.data);
        // Update data with retrieved data
        this.editedAmountDonated = response.data[0].amountdonated;
      })
      .catch((error) => {
        console.error("Error fetching profile data", error);
      });
  },
  methods: {
    updateDonation() {
      const donationId = this.$route.params.donationId;
      // Create an object to send as the request payload
      const typeData = {
        amountDonated: this.editedAmountDonated,
      };

      // Make a POST request to backend update endpoint
      axios
        .post(
          `http://localhost:8080/dashboard/update-donation/${donationId}`,
          typeData
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
    redirectToDonationDashboard() {
      this.updateSuccess = false;
      this.$router.push("/dashboard/donations");
    },
  },
};
</script>

<style scoped>
.edit-type-page {
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
