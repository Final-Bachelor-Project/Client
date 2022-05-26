<template>
  <b-modal
    v-model="showProfileModal"
    dialog-class="modal--full-screen"
    content-class="modal--no-border"
    header-class="modal-header--no-border"
    body-class="modal-body--no-padding"
    hide-footer
  >
    <div>
      <div class="image-container">
        <img
          class="profile-img"
          :src="user.profileImage"
        >
      </div>
      <div class="body mx-4 mt-2">
        <div class="personal-data">
          <div>
            <h5 class="pt-1 m-0">
              {{ user.username }}, {{ age }}
            </h5>
            <p class="mb-0">
              {{ user.city }}, {{ user.country }}
            </p>
          </div>
          <b-button
            pill
            size="sm"
            variant="primary"
            @click="sendRequest"
          >
            <b-icon icon="person-plus" />
          </b-button>
        </div>
        <div class="bio my-4 text-center">
          <h4>About {{ user.username }}</h4>
          <p>{{ user.bio }}</p>
        </div>
        <div class="shared-music text-center mb-4">
          <h4>Top music you share</h4>
          <b-button-group class="buttons">
            <b-button
              :variant="areTracksShown ? 'primary' : 'outline-primary'"
              @click="showTracks"
            >
              Tracks 
            </b-button>
            <b-button
              :variant="areArtistsShown ? 'primary' : 'outline-primary'"
              @click="showArtists"
            >
              Artists
            </b-button>
          </b-button-group>
          <b-list-group
            v-if="areTracksShown && tracks.length > 0"
            class="top-list"
          >
            <b-list-group-item
              v-for="track in tracks"
              :key="track.id"
              class="music-list-item"
            >
              <b-avatar :src="track.image" />
              {{ track.name }}
            </b-list-group-item>
          </b-list-group>
          <b-list-group v-if="areTracksShown && tracks.length == 0">
            <b-list-group-item>
              You don't have any common tracks
            </b-list-group-item>
          </b-list-group>
          <b-list-group
            v-if="areArtistsShown && artists.length > 0"
            class="top-list"
          >
            <b-list-group-item
              v-for="artist in artists"
              :key="artist.id"
              class="music-list-item"
            >
              <b-avatar :src="artist.image" />
              {{ artist.name }}
            </b-list-group-item>
          </b-list-group>
          <b-list-group v-if="areArtistsShown && artists.length == 0">
            <b-list-group-item>
              You don't have any common artists
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
    </div>
  </b-modal>
</template>
<script>
export default {
    props: [
        'showModal',
        'userId',
        'score'
    ],
    data() {
        return {
            showProfileModal: this.showModal,
            user: {},
            tracks: [],
            artists: [],
            areTracksShown: true,
            areArtistsShown: false
        }
    },
    computed: {
      age() {
        const today = new Date();
        const birthDate = new Date(this.user.dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
      }
    },
    watch: {
        showModal() {
            this.showProfileModal = this.showModal
        },
        showProfileModal(newValue, oldValue) {
            if(oldValue && !newValue) {
                this.$emit('closeModal')
            }
        }
    },
    created: async function() {
        this.user = (await this.$axios.get(`api/users/${this.userId}`)).data;
        this.tracks = await this.getCommonTracks()
        this.artists = await this.getCommonArtists()
    },
    methods: {
        sendRequest: async function() {
            const request = await this.$axios({
                method: 'POST',
                url: 'api/requests',
                data: {
                    receiverId: this.user._id
                }
            });
            if(request.status == 200) {
                this.$emit('requestSent', this.user.username)
            }
        },
        getCommonTracks: async function() {
          return (await this.$axios.get(`api/users/tracks/common/${this.user._id}`)).data
        },
        getCommonArtists: async function() {
          return (await this.$axios.get(`api/users/artists/common/${this.user._id}`)).data
        },
        showTracks: function() {
          this.areTracksShown = true
          this.areArtistsShown = false
        },
        showArtists: function() {
          this.areTracksShown = false
          this.areArtistsShown = true
        }
    }
}
</script>
<style scoped>
.profile-img {
    width: -webkit-fill-available;
    height: 30vh;
    object-fit: cover;
}

.img-container {
    width: 12rem;
    height: 16rem;
    margin-right: auto;
    margin-left: auto;
    border: 3px solid var(--primary);
}

.img-container img {
    object-fit: cover;
    border-radius: 0.6rem !important;
    height: 15.7rem;
}

.score {
    position: absolute;
    right: 10%;
    right: 0;
    left: 0;
    margin-right: auto;
    margin-left: auto;
    top: 0%;
    width: 5.5rem;
    height: 1.5rem;
    border-bottom-right-radius: 25%;
    border-bottom-left-radius: 25%;
    padding: 0.3rem;
}

.personal-data {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.personal-data button {
    padding-top: 0;
    margin-top: 0.4rem;
    margin-bottom: 0.5rem;
    font-size: 1rem;
}

.music-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    box-shadow: 0 1px 0px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 15%);
}

.buttons {
  width: -webkit-fill-available;
}

.buttons button {
    box-shadow: 0 1px 0px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 15%);
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

.top-list {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>