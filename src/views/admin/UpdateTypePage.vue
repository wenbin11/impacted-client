<template>
  <div class="edit-type-page">
    <div class="header">Edit Donation Type</div>
    <form @submit.prevent="updateType" class="update-form">
      <div class="form-group">
        <div v-if="updateError" class="error-message">
          Update Unsuccessful!
          <ul>
            <li v-for="(error, index) in message.errors" :key="index">
              {{ error.msg }}
            </li>
          </ul>
        </div>
        <label for="type-name">Type Name:</label>
        <input type="text" id="type-name" v-model="editedTypeName" />
      </div>
      <message-modal
        :visible="updateSuccess"
        header="Donation Type Updated"
        message="Your donation type has been successfully updated."
        @confirm="redirectToTypeDashboard"
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
      editedTypeName: "",
      updateSuccess: false,
      updateError: false,
      message: "",
    };
  },
  created() {
    const typeId = this.$route.params.typeId;

    axios
      .get(`http://localhost:8080/dashboard/get-type/${typeId}`) // Replace with your API endpoint
      .then((response) => {
        console.log(response.data);
        // Populate the input fields with retrieved data
        this.editedTypeName = response.data.typename;
      })
      .catch((error) => {
        console.error("Error fetching profile data", error);
      });
  },
  methods: {
    updateType() {
      // Fetch the user's current profile data from the server
      const typeId = this.$route.params.typeId;
      // Create an object to send as the request payload
      const typeData = {
        typeName: this.editedTypeName,
      };

      // Make a POST request to your backend update endpoint
      axios
        .post(
          `http://localhost:8080/dashboard/update-type/${typeId}`,
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
    redirectToTypeDashboard() {
      this.updateSuccess = false;
      this.$router.push("/dashboard/type");
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
