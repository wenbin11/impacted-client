<template>
  <div class="add-badge-page">
    <div class="header">Add a Donation Type</div>
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
        <label for="type-name">Type Name:</label>
        <input type="text" id="type-name" v-model="typeName" />
      </div>
      <message-modal
        :visible="createSuccess"
        header="Donation Type Added"
        message="Your donation type has been successfully added."
        @confirm="redirectToTypeDashboard"
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
      typeName: "",
      createSuccess: false,
      createError: false,
      message: "",
    };
  },
  methods: {
    createBadge() {
      // Create an object to send as the request payload
      const typeData = {
        typeName: this.typeName,
      };

      // Make a POST request to backend endpoint
      axios
        .post(`http://localhost:8080/dashboard/add-type`, typeData)
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
    redirectToTypeDashboard() {
      this.createSuccess = false;
      this.$router.push("/dashboard/types");
    },
  },
};
</script>

<style scoped>
.add-badge-page {
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
