<template>
  <div class="donation-table">
    <div class="table-container">
      <div class="table-header-row">
        <div class="table-header">Donation Information</div>
        <router-link :to="`/add-donation`">
          <button class="add-btn">Add Donation</button></router-link
        >
      </div>
      <delete-modal
        :visible="showDeleteModal"
        header="Delete Donation"
        message="Are you sure you want to delete this donation?"
        @confirm="deleteDonation"
        @cancel="cancelDelete"
      ></delete-modal>
      <table>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Cause</th>
          <th>Amount</th>
          <th>Time Donated</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        <tr v-for="donation in donationData" :key="donation.donationid">
          <td>{{ donation.donationid }}</td>
          <td>{{ donation.username }}</td>
          <td>{{ donation.causename }}</td>
          <td>{{ donation.amountdonated }}</td>
          <td>{{ getReadableDateTime(donation.donationtime) }}</td>
          <td>
            <router-link :to="`/update-donation/${donation.donationid}`">
              <button class="blue-btn">Edit</button></router-link
            >
          </td>
          <td>
            <button class="delete-btn" @click="confirmDelete(donation.donationid)">
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
      donationData: "",
      showDeleteModal: false,
      selectedDonation: null,
    };
  },
  created() {
    axios
      .get("http://localhost:8080/dashboard/donations")
      .then((response) => {
        this.donationData = response.data;
      })
      .catch((error) => {
        console.error("Error fetching profile data", error);
      });
  },
  methods: {
    confirmDelete(id) {
      this.selectedDonation = id;
      this.showDeleteModal = true;
    },
    deleteDonation() {
      if (this.selectedDonation) {
        // Send a POST request to delete the user using Axios or your preferred HTTP library
        axios
          .post(
            `http://localhost:8080/dashboard/donations/delete/${this.selectedDonation}`
          )
          .then((response) => {
            // Handle success, e.g., remove the user from the data
            this.donationData = this.donationData.filter(
              (donation) => donation.donationid !== this.selectedDonation
            );
            // Reset selection and hide the modal
            this.selectedDonation = null;
            this.showDeleteModal = false;
          })
          .catch((error) => {
            console.error("Error deleting user", error);
            // Handle error as needed
          });
      }
    },
    cancelDelete() {
      // Reset selection and hide the modal
      this.selectedDonation = null;
      this.showDeleteModal = false;
    },
    getReadableDateTime(dateTime) {
      const date = new Date(dateTime);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      return `${day}/${month + 1}/${year}`;
    },
  },
};
</script>

<style scoped>
.donation-table {
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
