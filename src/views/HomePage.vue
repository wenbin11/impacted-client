<template>
  <!-- Home Page Container -->
  <div class="home-page">
    <!-- Banner Section -->
    <div class="banner-section">
      <!-- Banner Image -->
      <img src="../assets/landing/banner.jpg" class="banner-image" />
      <!-- Banner Overlay -->
      <div class="banner-overlay">
        <!-- Overlay Content -->
        <div class="overlay-content">
          <!-- Banner Header -->
          <h1 class="banner-title">Transforming Lives Through Learning!</h1>
          <!-- Banner Body Text -->
          <p class="banner-text">
            Join us in making a difference today by donating to ImpactEd and
            empowering children worldwide with the gift of education.
          </p>
          <!-- Donate Button -->
          <blue-button buttonText="Donate Now" routeName="Donation" />
        </div>
      </div>
    </div>

    <!-- Mission Section -->
    <div class="mission-section">
      <!-- Mission Header Container -->
      <div class="mission-header-container">
        <!-- Mission Header -->
        <h1>Our</h1>
        <h1 class="mission-heading">Mission</h1>
      </div>
      <!-- Mission Body Text -->
      <p class="mission-description">
        At ImpactEd, our mission is to bridge the education gap and create a
        better future for all. We believe that education is a fundamental right
        that empowers individuals and transforms communities. We are committed
        to providing a platform that connects passionate individuals with
        education-related causes, enabling them to make a meaningful impact
        through their contributions. By fostering transparency, trust, and
        collaboration, we strive to ensure that every child has access to
        quality education, unlocking their potential and paving the way for a
        brighter tomorrow. Together, let's shape a world where education knows
        no boundaries and every learner has the opportunity to thrive.
      </p>
      <!-- Learn More Button -->
      <blue-button buttonText="Learn More" routeName="About" />
    </div>
  </div>
</template>

<script>
import BlueButton from "../components/BlueButton.vue";

/**
 * LandingPage Component
 *
 * The LandingPage component represents the landing page of the ImpactEd website.
 *
 * It features a banner with an overlay text and a call to action button, as well as a section
 * describing ImpactEd's mission with another call to action button.
 */
export default {
  components: { BlueButton },
};
</script>

<style scoped>
.home-page {
  background-color: #f0f0f0;
}

/* Banner Section Styles */
.banner-section {
  position: relative;
  width: 100%;
  max-width: 100vw;
  display: inline-block;
}

.banner-image {
  display: block;
  width: 100%;
  height: 350px;
  object-fit: cover;
}

/* Linear gradient overlay */
.banner-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 40vw;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 70%,
    rgba(0, 0, 0, 0) 100%
  );
  pointer-events: none;
}

.banner-overlay,
.overlay-content,
.banner-title,
.banner-text,
.banner-section a {
  background-color: black;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 50px;
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay-content {
  text-align: center;
  color: white;
  padding: 20px;
}

.banner-title {
  font-family: "Russo-One";
  margin-bottom: 20px;
}

/* Mission Section Styles */
.mission-section {
  width: 90vw;
  margin: 20px auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mission-header-container {
  display: flex;
  justify-content: center;
}

.mission-heading {
  margin-left: 10px;
  color: #00a2e6;
  font-weight: bold;
}

.mission-description {
  margin-top: 10px;
  font-size: 1.25rem;
  line-height: 2rem;
}
</style>
