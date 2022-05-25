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
        <div class="shared-music text-center">
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
          <b-list-group>
            <b-list-group-item
              v-for="track in tracks"
              :key="track.name"
              class="music-list-item"
            >
              <b-avatar :src="track.image" />
              {{ track.name }}
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
            tracks: [{name: "This is song 1", image: "https://i.scdn.co/image/ab67616d0000b2735e6f3b66721a47e39fac4274"}, 
            {name: "This is song 2", image: "https://i.scdn.co/image/ab67616d0000b2732160e9ab66ab8c6dffc2e89f"}, 
            {name: "This is song 3", image: "https://i.scdn.co/image/ab67616d0000b2739e1cfc756886ac782e363d79"},
            {name: "This is song 4", image: "https://i.scdn.co/image/ab67616d0000b27392b32435efed601fc8f1045d"},
            {name: "This is song 5", image: "https://i.scdn.co/image/ab67616d0000b2739c4f5071aa00f38f58422c67"}],
            areTracksShown: true,
            areArtistsShows: false
        }
    },
    computed: {
      age() {
        //return this.user.dateOfBirth
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
      showTracks: function() {
        this.areTracksShown = true
        this.areArtistsShows = false
      },
      showArtists: function() {
        this.areTracksShown = false
        this.areArtistsShows = true
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
    background-color: rgb(94, 114, 235, 0.06);
}

.buttons {
  width: -webkit-fill-available;
}
</style>