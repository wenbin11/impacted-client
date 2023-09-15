<template>
  <div class="payment-error-page">
    <img src="/images/error.png" alt="error" />
    <div class="error-header">Oops! Something Went Wrong.</div>
    <div class="details-header">Payment Was Cancelled.</div>
    <div class="thank-you-text">Try Again Below.</div>
    <router-link :to="'/cause/' + this.causeId">
      <button class="error-btn">Try Again</button>
    </router-link>
  </div>
</template>

<script>
/** Component to display payment error message page  */
export default {
  data() {
    return {
      causeId: null,
    };
  },
  created() {
    this.causeId = this.$route.query.causeId;
  },
};
</script>

<style scoped>
.payment-error-page {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  margin-top: 100px;
  width: 100px;
  height: 100px;
}

.error-header {
  color: #ed2f2f;
  margin-top: 10px;
  font-size: 2rem;
}

.details-header {
  margin-top: 20px;
  font-size: 1.5rem;
}

.thank-you-text {
  margin-top: 20px;
  color: #687781;
  font-size: 1.2rem;
}

button {
  background-color: #00a2e6;
  color: white;
  border: none;
  font-size: 14px;
  padding: 14px 18px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
  font-weight: bold;
}

button:hover {
  background-color: #0056b3;
}
</style>
