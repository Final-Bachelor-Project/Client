<template>
  <div>
    <Navbar />
    <div class="grid-container">
      <div class="profile">
        <b-avatar
          size="5rem"
          :src="profile.profileImage"
        />
        <h4>{{ profile.username }}</h4>
        <b-row class="justify-content-between mt-5">
          <h5>Name: </h5>
          <p>{{ profile.firstName }} {{ profile.lastName }}</p>
        </b-row>
        <b-row class="justify-content-between">
          <h5>Location: </h5>
          <p>{{ profile.city }}, {{ profile.country }}</p>
        </b-row>
        <b-row class="justify-content-between">
          <h5>Date of birth: </h5>
          <p>{{ profile.dateOfBirth }}</p>
        </b-row>
        <b-button
          class="mt-5"
          variant="primary"
          @click="goToEditProfile"
        >
          Edit Profile
        </b-button>
      </div>
      <div class="profile-details">
        <h6>Bio: <span class="font-weight-light pl-2">{{ profile.bio }}</span></h6>
        <div class="pb-3 lists-grid">
          <div class="mt-3">
            <h4>Top artists</h4>
            <b-list-group-item
              v-for="(artist, index) in profile.artists.slice(0, 10)"
              :key="artist._id"
              class="music-element"
            >
              {{ index + 1 }}.
              <b-avatar
                :src="artist.image"
                class="mx-4"
              />
              {{ artist.name }}
            </b-list-group-item>
          </div>
          <div class="mt-3">
            <h4>Top tracks</h4>
            <b-list-group-item
              v-for="(track, index) in profile.tracks.slice(0, 10)"
              :key="track._id"
              class="music-element"
            >
              {{ index + 1 }}.
              <b-avatar
                :src="track.image"
                class="mx-4"
              />
              {{ track.name }}
            </b-list-group-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue"
export default {
    components: {
        Navbar
    },
    setup() {
        
    },
    computed: {
        profile() {
            return JSON.parse(localStorage.loggedInUser)
        },
        topGenres() {
            let genres = []
            const artists = this.profile.artists.slice(0, 10)
            for(const artist of artists) {
                genres.push(artist.genres)
            }
            const topGenres = genres.shift().filter(function(v) {
                return genres.every(function(a) {
                    console.log(a);
                    return a.indexOf(v) !== -1;
                });
            })
            return topGenres
        }
    },
    methods: {
        goToEditProfile: function() {
            this.$router.push({path: '/edit-profile'})
        }
    }
}
</script>
<style scoped>
.grid-container {
    margin-top: 4rem;
}

.profile {
    border-right: 1px solid var(--light-gray);
    text-align: center;
    padding: 2.5rem;
}

.profile-details {
    margin: 2rem;
}

.music-element {
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 0 1px 0px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 15%);
}

@media only screen and (min-width: 768px) {
    .lists-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 2rem;
    }
}

@media only screen and (min-width: 500px) {
    .grid-container {
        display: grid;
        grid-template-columns: 1fr 3fr;
    }

    .profile {
        height: 90vh;
    }

}


</style>