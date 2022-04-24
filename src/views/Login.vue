<template>
  <div class="text-center m-4">
    <img
      class="mt-4 logo-img"
      src="https://bcan.org/wp-content/uploads/2021/08/Color-Spotify-Logo.jpg"
      alt="Spotify logo"
    >
    <h1 class="pt-4">
      {{ name }}
    </h1>
    <b-button
      class="mt-4 spotify-login-btn"
      @click="loginWithSpotify"
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
            name: "Our app"
        }
    },
    methods: {
        loginWithSpotify: async function () {
            console.log('here');
            await this.$http.get("http://localhost:3080/login")
        }
    }
}
</script>
<style scoped>
.logo-img {
    width: -webkit-fill-available;
}

.spotify-login-btn {
    background-color: var(--spotify-green);
}

.spotify-logo {
    height: 2rem;
    width: 2rem;
    margin-right: 0.5rem;
}

</style>
