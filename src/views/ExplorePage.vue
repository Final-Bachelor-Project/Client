<template>
  <div>
    <Navbar />
    <div class="users-container">
      <UserElement
        v-for="user in users"
        :key="user.id"
        :user="user"
        @requestSent="makeToast"
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
        const users = (await this.$axios.get('api/users'));
        this.users = users.data;
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
    }
}
</script>
<style scoped>
.users-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin: 0.5rem;
}

</style>