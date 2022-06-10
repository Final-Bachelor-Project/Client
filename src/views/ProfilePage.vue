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
          id="edit-profile-btn"
          class="mt-5"
          variant="primary"
          @click="goToEditProfile"
        >
          Edit Profile
        </b-button>
      </div>
      <div class="profile-details">
        <h6>Bio: <span class="font-weight-light pl-2">{{ profile.bio }}</span></h6>
        <h6>
          Your top genres: 
          <b-badge
            v-for="genre in topGenres"
            :key="genre"
            pill
            variant="primary"
            class="ml-1"
          >
            {{ genre }}
          </b-badge>
        </h6>
        <div class="pb-4 lists-grid">
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
            const artists = this.profile.artists
            for(const artist of artists) {
                for(const genre of artist.genres) {
                    genres.push(genre)
                }
            }
            const countedGenres = {}
            for (const genre of genres) {
                if (countedGenres[genre]) {
                    countedGenres[genre] += 1;
                } else {
                    countedGenres[genre] = 1;
                }
            }

            const sortedGenresByCount = Object.entries(countedGenres).sort(([,a],[,b]) => b-a)
            const topGenres = sortedGenresByCount.slice(0, 3).map((genre) => {
                return genre[0]
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

    .profile {
        width: 25% !important;
    }

    .profile-details {
        left: 25% !important;
    }

}

@media only screen and (min-width: 600px) {
    .grid-container {
        display: grid;
    }

    .profile {
        width: 40%;
        height: 90vh;
        position: fixed;
    }

    .profile-details {
        overflow: scroll;
        right: 0;
        left: 40%;
        position: absolute;
    }
}


</style>