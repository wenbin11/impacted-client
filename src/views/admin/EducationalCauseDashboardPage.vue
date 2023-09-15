<template>
  <div class="education-cause-table">
    <div class="table-container">
      <div class="table-header-row">
        <div class="table-header">Educational Cause Information</div>
        <router-link :to="`/add-cause`">
          <button class="add-btn">Add Cause</button></router-link
        >
      </div>
      <delete-modal
        :visible="showDeleteModal"
        header="Delete Educational Cause"
        message="Are you sure you want to delete this educational cause?"
        @confirm="deleteEducationalCause"
        @cancel="cancelDelete"
      ></delete-modal>
      <table>
        <tr>
          <th>ID</th>
          <th>Cause Name</th>
          <th>Target</th>
          <th>Current Amount</th>
          <th>Supplies Per Dollar</th>
          <th>Type Name</th>
          <th>Image</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        <tr v-for="cause in causeData" :key="cause.causeid">
          <td>{{ cause.causeid }}</td>
          <td>{{ cause.causename }}</td>
          <td>SGD {{ cause.targetedamount }}</td>
          <td>SGD {{ cause.currentamountdonated }}</td>
          <td>{{ cause.suppliesdonatedperdollar }}</td>
          <td>{{ cause.typename }}</td>
          <td>{{ cause.image_path }}</td>
          <td>
            <router-link :to="`/update-cause/${cause.causeid}`">
              <button class="blue-btn">Edit</button></router-link
            >
          </td>
          <td>
            <button class="delete-btn" @click="confirmDelete(cause.causeid)">
              Delete
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import DeleteModal from "../../components/DeleteModal.vue";

export default {
  components: { DeleteModal },
  data() {
    return {
      causeData: "",
      showDeleteModal: false,
      selectedCause: null,
    };
  },
  created() {
    axios
      .get("http://localhost:8080/dashboard/causes")
      .then((response) => {
        this.causeData = response.data;
      })
      .catch((error) => {
        console.error("Error fetching profile data", error);
      });
  },
  methods: {
    confirmDelete(id) {
      this.selectedCause = id;
      this.showDeleteModal = true;
    },
    deleteEducationalCause() {
      if (this.selectedCause) {
        // Send a POST request to delete the user using axios
        axios
          .post(
            `http://localhost:8080/dashboard/causes/delete/${this.selectedCause}`
          )
          .then((response) => {
            this.causeData = this.causeData.filter(
              (cause) => cause.causeid !== this.selectedCause
            );
            // Reset selection and hide the modal
            this.selectedCause = null;
            this.showDeleteModal = false;
          })
          .catch((error) => {
            console.error("Error deleting user", error);
          });
      }
    },
    cancelDelete() {
      // Reset selection and hide the modal
      this.selectedCause = null;
      this.showDeleteModal = false;
    },
  },
};
</script>

<style scoped>
.education-cause-table {
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table-container {
  width: 85vw;
  margin: 30px 0px;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid black;
}

.table-header-row {
  display: flex;
}

.table-header {
  font-size: 2rem;
  font-weight: bold;
}

table {
  margin: 20px auto;
  border-collapse: collapse;
}

tr,
th,
td {
  text-align: center;
  padding: 10px 20px;
}

th,
td {
  border: 1px solid #ccc;
  font-size: 1.2rem;
}

.add-btn {
  margin-left: 20px;
  background-color: #008000;
  font-weight: bold;
  font-size: 20px;
  width: 100%;
  color: white;
  border: none;
  padding: 10px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #006400;
}

.blue-btn {
  background-color: #00a2e6;
  font-weight: bold;
  font-size: 14px;
  width: 100%;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.blue-btn:hover {
  background-color: #0056b3;
}

.red-btn {
  background-color: #cc0000;
  font-weight: bold;
  font-size: 14px;
  width: 100%;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.red-btn:hover {
  background-color: #b20000;
}

.delete-btn {
  background-color: #ff0000;
  font-weight: bold;
  font-size: 14px;
  width: 100%;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #b20000;
}
</style>
