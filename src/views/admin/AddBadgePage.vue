<template>
  <div class="add-type-page">
    <div class="header">Add Donation Type</div>
    <form @submit.prevent="createBadge" class="create-form">
      <div class="form-group">
        <div v-if="createError" class="error-message">
          Create Unsuccessful!
          <ul>
            <li v-for="(error, index) in message.errors" :key="index">
              {{ error.msg }}
            </li>
          </ul>
        </div>
        <label for="badge-name">Badge Name:</label>
        <input type="text" id="badge-name" v-model="badgeName" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="description">Description:</label>
          <input type="text" id="description" v-model="badgeDescription" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="File-Name">File Name:</label>
          <input type="text" id="File-Name" v-model="imgPath" required />
        </div>
      </div>
      <message-modal
        :visible="createSuccess"
        header="Badge Added"
        message="Your badge has been successfully added."
        @confirm="redirectToBadgeDashboard"
      ></message-modal>
      <button type="submit" class="add-btn">Create</button>
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
      badgeName: "",
      badgeDescription: "",
      imgPath: "",
      createSuccess: false,
      createError: false,
      message: "",
    };
  },
  methods: {
    createBadge() {
      // Create an object to send as the request payload
      const badgeData = {
        badgeName: this.badgeName,
        badgeDescription: this.badgeDescription,
        imgPath: this.imgPath,
      };

      // Make a POST request to your backend update endpoint
      axios
        .post(`http://localhost:8080/dashboard/add-badge`, badgeData)
        .then((response) => {
          console.log(response.data);
          this.createSuccess = true;
        })
        .catch((error) => {
          console.log("Update error", error.response.data);
          this.message = error.response.data;
          this.createError = true;
        });
    },
    redirectToBadgeDashboard() {
      this.createSuccess = false;
      this.$router.push("/dashboard/badges");
    },
  },
};
</script>

<style scoped>
.add-type-page {
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

.create-form {
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

.add-btn {
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

.add-btn:hover {
  background-color: #0056b3;
}
</style>
