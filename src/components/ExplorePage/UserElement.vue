<template>
  <div>
    <b-card
      :img-src="user.profileImage"
      img-alt="Image"
      img-top
      body-class="card-body-container"
      class="img-container"
      img-height="70%"
      @click="openProfile"
    >
      <b-badge
        class="score"
        variant="primary"
      >
        {{ user.score }}% Match
      </b-badge>

      <h6>{{ user.username }}</h6>
      <b-button
        pill
        size="sm"
        variant="primary"
        @click="sendRequest"
      >
        <b-icon icon="person-plus" />
      </b-button>
    </b-card>
    <UserProfileModal
      v-if="showProfileModal"
      :show-modal="showProfileModal"
      :user-id="user._id"
      :score="user.score"
      v-on="$listeners"
      @closeModal="closeModal"
    />
  </div>
</template>
<script>
import UserProfileModal from "./UserProfileModal.vue"
export default {
    components: {
      UserProfileModal
    },
    props: [
        'user'
    ],
    data() {
      return {
        showProfileModal: false
      }
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
        openProfile: function() {
          this.showProfileModal = true
        },
        closeModal: function() {
          this.showProfileModal = false
        }
    }
}
</script>
<style scoped>
.img-container {
    width: 10.8rem;
    height: 16rem;
    position: relative;
}

.img-container img {
    object-fit: cover;
    border-top-left-radius: 0.6rem !important;
    border-top-right-radius: 0.6rem !important;
}

.card-body-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

h6{
    margin-bottom: 0;
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
</style>