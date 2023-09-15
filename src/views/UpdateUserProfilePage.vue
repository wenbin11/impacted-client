<template>
  <div class="edit-profile-page">
    <div class="header">Edit Profile</div>
    <form @submit.prevent="updateProfile" class="update-form">
      <div class="form-group">
        <div v-if="updateError" class="error-message">
          Update Unsuccessful!
          <ul>
            <li v-for="(error, index) in message.errors" :key="index">
              {{ error.msg }}
            </li>
          </ul>
        </div>
        <label for="first-name">First Name:</label>
        <input type="text" id="first-name" v-model="editedFirstName" />
      </div>
      <div class="form-group">
        <label for="last-name">Last Name:</label>
        <input type="text" id="last-name" v-model="editedLastName" />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="editedEmail" />
      </div>
      <message-modal
        :visible="updateSuccess"
        header="Profile Updated"
        message="Your profile has been successfully updated."
        @confirm="redirectToProfile"
      ></message-modal>
      <button type="submit" class="update-btn">Save Changes</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import MessageModal from "../components/MessageModal.vue";

export default {
  components: { MessageModal },
  data() {
    return {
      editedFirstName: "",
      editedLastName: "",
      editedEmail: "",
      password: "",
      updateSuccess: false,
      updateError: false,
      message: "",
    };
  },
  created() {
    // Fetch the user's current profile data from the server
    const userId = this.$route.params.userId;

    axios
      .get(`http://localhost:8080/get-profile/${userId}`)
      .then((response) => {
        // Update data with retrieved data
        this.editedFirstName = response.data.firstname;
        this.editedLastName = response.data.lastname;
        this.editedEmail = response.data.email;
      })
      .catch((error) => {
        console.error("Error fetching profile data", error);
      });
  },
  methods: {
    updateProfile() {
      const userId = this.$store.state.currentUser;
      // Create an object to send as the request payload
      const userData = {
        email: this.editedEmail,
        fname: this.editedFirstName,
        lname: this.editedLastName,
      };

      // Make a POST request to backend update endpoint
      axios
        .post(`http://localhost:8080/update-profile/${userId}`, userData)
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
    redirectToProfile() {
      this.updateSuccess = false;
      this.$router.push("/profile");
    },
  },
};
</script>

<style scoped>
.edit-profile-page {
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
