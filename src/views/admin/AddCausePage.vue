<template>
  <div class="add-cause-page">
    <div class="header">Add Educational Cause</div>
    <form @submit.prevent="createCause" class="create-form">
      <div class="form-group">
        <div v-if="createError" class="error-message">
          Create Unsuccessful!
          <ul>
            <li v-for="(error, index) in message.errors" :key="index">
              {{ error.msg }}
            </li>
          </ul>
        </div>
        <label for="cause-name">Cause Name:</label>
        <input type="text" id="cause-name" v-model="causeName" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="description">Target Amount:</label>
          <input type="number" id="description" v-model="targetAmount" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="description">Number of Supplies Per Dollar:</label>
          <input type="number" id="description" v-model="suppliesPerDollar" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="description">Type ID:</label>
          <input type="number" id="description" v-model="typeId" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="File-Name">Image Name:</label>
          <input type="text" id="File-Name" v-model="imgPath" required />
        </div>
      </div>
      <message-modal
        :visible="createSuccess"
        header="Cause Added"
        message="Your cause has been successfully added."
        @confirm="redirectToCauseDashboard"
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
      causeName: "",
      targetAmount: 0,
      suppliesPerDollar: 0,
      typeId: 0,
      imgPath: "",
      createSuccess: false,
      createError: false,
      message: "",
    };
  },
  methods: {
    createCause() {
      // Create an object to send as the request payload
      const causeData = {
        causeName: this.causeName,
        targetAmount: this.targetAmount,
        suppliesPerDollar: this.suppliesPerDollar,
        typeId: this.typeId,
        imgPath: this.imgPath,
      };

      // Make a POST request to your backend update endpoint
      axios
        .post(`http://localhost:8080/dashboard/add-cause`, causeData)
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
    redirectToCauseDashboard() {
      this.createSuccess = false;
      this.$router.push("/dashboard/causes");
    },
  },
};
</script>

<style scoped>
.add-cause-page {
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
