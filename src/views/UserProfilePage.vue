<template>
  <div class="user-profile-page">
    <img src="/images/profile.png" alt="profile" />
    <div class="username">{{ firstName }} {{ lastName }} </div>
    <div class="profile-info-container">
      <div class="header">Profile Information</div>
      <hr />
      <div class="form-row">
        <div class="form-group">
          <label for="first-name">First Name:</label>
          <input type="text" id="first-name" v-model="firstName" disabled />
        </div>
        <div class="form-group">
          <label for="last-name">Last Name:</label>
          <input type="text" id="last-name" v-model="lastName" disabled />
        </div>
      </div>
      <!-- Email -->
      <div class="form-row">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" disabled />
        </div>
      </div>

      <div class="form-row">
        <router-link :to="`update-profile/${$store.state.currentUser}`">
        <button class="blue-btn">Edit Profile</button>
        </router-link>
        <router-link :to="`reset-password/${$store.state.currentUser}`">
        <button class="red-btn">Reset Password</button>
        </router-link>
      </div>
    </div>

    <div class="past-donations-container">
      <div class="header">Past Donations</div>
      <hr />
      <template v-if="this.pastDonationInfo.length">
        <table>
          <tr>
            <th>Transaction ID</th>
            <th>Campaign</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
          <tr v-for="(donation, index) in pastDonationInfo" :key="index">
            <td>{{ donation.donationid }}</td>
            <td>{{ donation.causename }}</td>
            <td>SGD {{ donation.amountdonated }}</td>
            <td>{{ getReadableDateTime(donation.donationtime) }}</td>
            
          </tr>
        </table>
      </template>
      <template v-else>
        <div class="no-data">No donations were found!</div>
        <router-link to="/Donation">
          <button class="blue-btn">Make a Donation</button>
        </router-link>
      </template>
    </div>

    <div class="badge-container">
      <div class="header">Achievements</div>
      <hr />
      <template v-if="this.badgeInfo.length">
        <div v-for="(badge, index) in badgeInfo" :key="index">
          <div class="badge-wrapper">
            <div class="badge-info">
              <ul>
                <li class="badge-name">{{ badge.badgename }}</li>
                <li class="badge-date">
                  {{ getReadableDateTime(badge.achievementtime) }}
                </li>
                <li class="badge-info">{{ badge.badgedescription }}</li>
              </ul>
            </div>
            <img
              :src="`/images/badges/${badge.img_path}`"
              alt="badge"
              class="badge-img"
            />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="no-data">No badges achieved!</div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      userInfo: "",
      pastDonationInfo: "",
      badgeInfo: "",
      img_path: "",
    };
  },
  created() {
    // Fetch profile data from the backend API
    const userId = this.$store.state.currentUser;
    axios
      .get(`http://localhost:8080/profile?userId=${userId}`)
      .then((response) => {
        this.badgeInfo = response.data.badgeInfo;
        this.pastDonationInfo = response.data.pastDonations;
        this.userInfo = response.data.userInfo;
        this.firstName = this.userInfo.firstname;
        this.lastName = this.userInfo.lastname;
        this.email = this.userInfo.email;
      })
      .catch((err) => {
        console.log(err);
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
  },
};
</script>

<style scoped>
.user-profile-page {
  margin-top: 70px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  width: 150px;
  height: 150px;
}

.username {
  margin-top: 20px;
  font-weight: bold;
  font-size: 2.5rem;
}

.profile-info-container,
.past-donations-container,
.badge-container {
  width: 70vw;
  border-radius: 30px;
  margin: 50px 0px;
  padding: 0px 30px;
  border: 1px solid gray;
}

.header {
  margin: 20px 0px;
  font-weight: bold;
  font-size: 2.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

label {
  margin-top: 30px;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 1.25rem;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.25rem;
}

table {
  margin: 20px 0px;
  text-align: center;
}

th {
  font-size: 1.5rem;
}

td,
th {
  padding: 10px 30px;
}

.no-data {
  margin: 25px 0px;
  font-size: 2rem;
  text-align: center;
  color: #687781;
}

.badge-wrapper {
  display: flex;
  justify-content: center;
  margin: 25px 0px;
}

.badge-info {
  flex: 7;
}

ul li {
  list-style: none;
}

.badge-name {
  margin-top: 20px;
  font-size: 1.75rem;
  font-weight: bold;
}

.badge-date {
  margin-top: 5px;
  font-size: 1rem;
  color: #687781;
}

.badge-info {
  margin-top: 5px;
  font-size: 1rem;
}

.badge-img {
  flex: 1;
}

.blue-btn {
  background-color: #00a2e6;
  font-weight: bold;
  font-size: 16px;
  width: 100%;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin-top: 30px;
  margin-bottom: 20px;
  cursor: pointer;
}

.blue-btn:hover {
  background-color: #0056b3;
}

.red-btn {
  background-color: #cc0000;
  font-weight: bold;
  font-size: 16px;
  width: 100%;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 30px;
}

.red-btn:hover {
  background-color: #b20000;
}
</style>
