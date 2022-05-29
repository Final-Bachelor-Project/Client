<template>
  <div>
    <b-card
      class="mb-3"
      body-class="connection-container"
      @click="openProfile"
    >
      <b-avatar
        :src="connection.profileImage"
        size="4rem"
      />
      <h5 class="mb-0 username">
        {{ connection.username }}
      </h5>
      <b-icon
        variant="info"
        class="mr-2 ml-auto"
        font-scale="2.5"
        icon="chat-dots"
        @click="goToChatroom"
      />
    </b-card>
    <UserProfileModal
      v-if="showProfileModal"
      :show-modal="showProfileModal"
      :user-id="connection._id"
      :score="connection.score"
      v-on="$listeners"
      @closeModal="closeModal"
    />
  </div>
</template>
<script>
import UserProfileModal from "../ExplorePage/UserProfileModal.vue"
export default {
    components: {
      UserProfileModal
    },
    props: ['connection'],
    data() {
      return {
        showProfileModal: false
      }
    },
    methods: {
      goToChatroom: async function() {
        const chat = await this.$axios.get(`api/chats/users/${this.connection._id}`)
        this.$router.push({path: `/chatroom/${chat.data._id}`})
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
.connection-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

.username {
    margin-left: 1.5rem;
    color: var(--primary);
}
</style>