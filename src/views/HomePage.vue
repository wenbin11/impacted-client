<template>
  <div class="main">
    <!-- Banner Container -->
    <div class="banner-container">
      <!-- Image to fill banner container -->
      <img src="../assets/landing/banner.jpg" class="banner" />
      <!-- Text overlay on banner image -->
      <div class="overlay">
        <div class="overlay-content">
          <!-- Banner Header -->
          <h1 class="banner-header">Transforming Lives Through Learning!</h1>
          <!-- Banner Body Text -->
          <p class="banner-body-text">
            Join us in making a difference today by donating to ImpactEd and
            empowering children worldwide with the gift of education.
          </p>
          <!-- Button -->
          <blue-button buttonText="Donate Now" routeName="Donation" />
        </div>
      </div>
    </div>

    <!-- Mission Container -->
    <div class="mission-container">
      <!-- Mission Header -->
      <div class="mission-header-container">
        <h1>Our</h1>
        <h1 class="mission-text">Mission</h1>
      </div>
      <!-- Mission Body-Text -->
      <p class="mission-body-text">
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
      <!-- Button -->
      <blue-button buttonText="Learn More" routeName="About" />
    </div>
  </div>
</template>

<script>
import BlueButton from "../components/BlueButton.vue";

/**
 * HomePage View Component
 *
 * Component containing a banner and
 * the mission
 */
export default {
  components: { BlueButton },
};
</script>

<style>
.banner-container {
  position: relative;
  width: 100%;
  max-width: 100vw;
  display: inline-block;
}

.banner {
  display: block;
  width: 100%;
  height: 350px;
  object-fit: cover;
}

/* Linear gradient overlay */
.banner-container::before {
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

.overlay,
.overlay-content,
.banner-header,
.banner-body-text {
  background-color: black;
}

.overlay {
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

.banner-header {
  font-family: "Russo-One";
  margin-bottom: 20px;
}

.mission-container {
  width: 85vw;
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

.mission-text {
  margin-left: 10px;
  color: #00a2e6;
  font-weight: bold;
}

.mission-body-text {
  margin-top: 10px;
  font-size: 1.25rem;
  line-height: 2rem;
}
</style>
