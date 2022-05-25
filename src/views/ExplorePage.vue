<template>
  <div>
    <Navbar />
    <div class="matches-header">
      <h4>Your suggestions</h4>
      <h6>based on your Spotify top artists and tracks</h6>
    </div>
    <div class="users-container">
      <UserElement
        v-for="user in users"
        :key="user.id"
        :user="user"
        @requestSent="requestSent"
      />
    </div>
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";
import UserElement from "../components/ExplorePage/UserElement.vue"
export default {
    components: {
        Navbar,
        UserElement
    },
    data() {
        return {
            users: []
        }
    },
    created: async function () {
        const currentUser = (await this.$axios.get('/api/users/current', {withCredentials: true})).data.user
        localStorage.loggedInUserId = currentUser.id
        await this.getUsers()
    },
    methods: {
        makeToast(username) {
            this.$bvToast.toast('', {
                title: `Request sent to ${username}`,
                variant: 'success',
                toaster: 'b-toaster-top-center',
                solid: true
            })
        },
        getUsers: async function() {
            const users = (await this.$axios.get('api/users'));
            this.users = users.data;
        },
        requestSent: async function() {
            await this.getUsers();
            this.makeToast()
        }
    }
}
</script>
<style scoped>
.users-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 0.8rem;
    /* margin-top: 5.5rem; */
}

.matches-header {
    margin-top: 5.5rem;
    text-align: center;
    padding-bottom: 1rem;
}

.matches-header h4 {
    color: var(--primary);
}

</style>