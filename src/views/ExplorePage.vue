<template>
  <div>
    <Sidebar />
  </div>
</template>
<script>
import Sidebar from "../components/Sidebar.vue";
export default {
    data() {
        return {
            users: []
        }
    },
    created: async function () {
        const users = (await this.$axios.get('api/users'));
        this.users = users;
    },
    methods: {
        
    },
    components: {
        Sidebar
    }
}
</script>
<style scoped>

</style>