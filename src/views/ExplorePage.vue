<template>
  <div>
    <Navbar />
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
    gap: 0.5rem;
    margin: 0.8rem;
}

</style>