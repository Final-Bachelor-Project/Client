<template>
  <div>
    <Navbar />
    <div class="users-container">
      <UserElement
        v-for="user in users"
        :key="user.id"
        :user="user"
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

/* .users-container div {
    margin: 0.5rem;
} */

</style>