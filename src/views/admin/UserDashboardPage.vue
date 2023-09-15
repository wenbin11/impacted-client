<template>
  <div class="user-table">
    <div class="table-container">
      <div class="table-header-row">
        <div class="table-header">User Information</div>
        <router-link :to="`/register`">
          <button class="add-btn">Add User</button></router-link
        >
      </div>
      <delete-modal
        :visible="showDeleteModal"
        header="Delete User"
        message="Are you sure you want to delete this user?"
        @confirm="deleteUser"
        @cancel="cancelDelete"
      ></delete-modal>
      <table>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date Joined</th>
          <th>Edit</th>
          <th>Reset Password</th>
          <th>Delete</th>
        </tr>
        <tr v-for="user in userData" :key="user.userid">
          <td>{{ user.userid }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ getReadableDateTime(user.date_joined) }}</td>
          <td>
            <router-link :to="`/update-profile/${user.userid}`">
              <button class="blue-btn">Edit</button></router-link
            >
          </td>
          <td>
            <router-link :to="`/reset-password/${user.userid}`"
              ><button class="red-btn">Reset Password</button></router-link
            >
          </td>
          <td>
            <button class="delete-btn" @click="confirmDelete(user.userid)">
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
      userData: "",
      showDeleteModal: false,
      selectedUser: null,
    };
  },
  created() {
    axios
      .get("http://localhost:8080/dashboard/users")
      .then((response) => {
        this.userData = response.data;
      })
      .catch((error) => {
        console.error("Error fetching profile data", error);
      });
  },
  methods: {
    getReadableDateTime(dateTime) {
      const date = new Date(dateTime);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      return `${day}/${month + 1}/${year}`;
    },
    confirmDelete(id) {
      this.selectedUser = id;
      this.showDeleteModal = true;
    },
    deleteUser() {
      if (this.selectedUser) {
        // Send a POST request to delete the user using axios
        axios
          .post(
            `http://localhost:8080/dashboard/users/delete/${this.selectedUser}`
          )
          .then((response) => {
            this.userData = this.userData.filter(
              (user) => user.userid !== this.selectedUser
            );
            // Reset selection and hide the modal
            this.selectedUser = null;
            this.showDeleteModal = false;
          })
          .catch((error) => {
            console.error("Error deleting user", error);
          });
      }
    },
    cancelDelete() {
      // Reset selection and hide the modal
      this.selectedUser = null;
      this.showDeleteModal = false;
    },
  },
};
</script>

<style scoped>
.user-table {
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
