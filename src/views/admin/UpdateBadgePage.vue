<template>
  <div class="edit-badge-page">
    <div class="header">Edit Badge</div>
    <form @submit.prevent="updateBadge" class="update-form">
      <div class="form-group">
        <div v-if="updateError" class="error-message">
          Update Unsuccessful!
          <ul>
            <li v-for="(error, index) in message.errors" :key="index">
              {{ error.msg }}
            </li>
          </ul>
        </div>
        <label for="badge-name">Badge Name:</label>
        <input type="text" id="badge-name" v-model="newBadgeName" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="description">Description:</label>
          <input
            type="text"
            id="description"
            v-model="newBadgeDescription"
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
        header="Badge Updated"
        message="Your badge has been successfully updated."
        @confirm="redirectToBadgeDashboard"
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
      newBadgeName: "",
      newBadgeDescription: "",
      newImgPath: "",
      updateSuccess: false,
      updateError: false,
      message: "",
    };
  },
  created() {
    const badgeId = this.$route.params.badgeId;

    axios
      .get(`http://localhost:8080/dashboard/get-badge/${badgeId}`) // Replace with your API endpoint
      .then((response) => {
        console.log(response.data);
        // Populate the input fields with retrieved data
        this.newBadgeName = response.data.badgename;
        this.newBadgeDescription = response.data.badgedescription;
        this.newImgPath = response.data.img_path;
      })
      .catch((error) => {
        console.error("Error fetching profile data", error);
      });
  },
  methods: {
    updateBadge() {
      // Fetch the user's current profile data from the server
      const badgeId = this.$route.params.badgeId;
      // Create an object to send as the request payload
      const badgeData = {
        newBadgeName: this.newBadgeName,
        newBadgeDescription: this.newBadgeDescription,
        newImgPath: this.newImgPath,
      };

      // Make a POST request to your backend update endpoint
      axios
        .post(
          `http://localhost:8080/dashboard/update-badge/${badgeId}`,
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
    redirectToBadgeDashboard() {
      this.updateSuccess = false;
      this.$router.push("/dashboard/badges");
    },
  },
};
</script>

<style scoped>
.edit-badge-page {
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
