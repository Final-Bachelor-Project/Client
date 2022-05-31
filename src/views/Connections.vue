<template>
  <div>
    <Navbar />
    <div
      v-if="connections && connections.length > 0"
      class="connections-container"
    >
      <Connection
        v-for="connection in connections"
        :key="connection.id"
        :connection="connection"
      />
    </div>
    <div
      v-else
      class="text-center connections-container"
    >
      <h4>You have no connections</h4>
    </div>
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue"
import Connection from "../components/ConnectionsPage/Connection.vue"
export default {
    components: {
        Navbar,
        Connection
    },
    data() {
        return {
            connections: []
        }
    },
    created: async function() {
        await this.getConnections()
    },
    methods: {
        getConnections: async function() {
            try{
                const connections = await this.$axios.get('api/users/current/connections');
                this.connections = connections.data
            } catch(error) {
                if(error.response.status === 404) {
                    this.connections = []
                }
            }
        },
    }
}
</script>
<style scoped>
.connections-container {
    margin: 0.8rem;
    margin-top: 5.5rem;
}
</style>