<template>
  <div class="text-center m-4">
    <img
      class="mt-4 logo-img"
      src="https://bcan.org/wp-content/uploads/2021/08/Color-Spotify-Logo.jpg"
      alt="Spotify logo"
    >
    <h1 class="pt-4">
      TuneBuddy
    </h1>
    <b-button
      variant="spotify-green"
      class="mt-4 spotify-login-btn"
      href="/api/login"
    >
      <img
        class="spotify-logo"
        src="../assets/spotify.png"
        alt=""
      >
      Login with Spotify
    </b-button>
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
    width: -webkit-fill-available;
}

.spotify-login-btn {
    font-weight: bold;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
}

.spotify-logo {
    height: 2rem;
    width: 2rem;
    margin-right: 0.2rem;
}

</style>
