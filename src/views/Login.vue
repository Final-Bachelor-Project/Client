<template>
  <div class="text-center login-page-wrap">
    <img
      class="logo-img"
      src="../assets/icons/tune-buddy-logo-white.svg"
      alt="Logo"
    >
    <div class="mb-5">
      <p id="app-text">
        Connect with people that share your taste in music
      </p>
      <b-button
        variant="spotify-green"
        class="mt-4 spotify-login-btn"
        href="/api/login"
      >
        <img
          class="spotify-logo"
          src="../assets/icons/spotify-white-fill.png"
          alt="spotify logo"
        >
        Login with Spotify
      </b-button>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>
<style scoped>

.logo-img {
    width: 100%;
    position: relative;
}

.spotify-login-btn {
    font-size: 1.2rem;
    padding-left: 4rem;
    padding-right: 4rem;
    position: relative;
}

.spotify-logo {
    height: 2rem;
    width: 2rem;
    margin-right: 0.2rem;
}

.login-page-wrap {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding-right: 2rem;
    padding-left: 2rem;
    position: relative; 
    background-image: url("../assets/images/concert-crowd.jpg");
    background-size: cover;
}

.login-page-wrap:before {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.6);
}

#app-text {
    color: var(--white);
    position: relative;
}

@media only screen and (min-width: 600px) {
    .logo-img {
        width: 80%;
    }
}
@media only screen and (min-width: 768px) {
    .logo-img {
        width: 60%;
    }
}
@media only screen and (min-width: 992px) {
    .logo-img {
        width: 50%;
    }
}
@media only screen and (min-width: 1200px) {
    .logo-img {
        width: 40%;
    }
}

</style>
