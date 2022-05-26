<template>
  <div>
    <Navbar />
    <div
      v-if="requests.length"
      class="requests-container"
    >
      <Request
        v-for="request in requests"
        :key="request._id"
        :request="request"
        @update="updateRequestStatus"
      />
    </div>
    <div
      v-else
      class="text-center mt-4"
    >
      <h4>
        You have no pending requests
      </h4>
    </div>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import Request from '../components/RequestsPage/Request.vue'
export default {
    components: { Navbar, Request },
    data() {
        return {
            requests: [],
        }
    },
    created: async function () {
        await this.getRequests()
    },
    methods: {
        getRequests: async function() {
            try{
                const requests = await this.$axios.get('api/requests');
                this.requests = requests.data
            } catch(error) {
                if(error.response.status === 404) {
                    this.requests = []
                }
            }
        },
        updateRequestStatus: async function(data) {
            try {
                const request = await this.$axios({
                    method: 'PUT',
                    url: `api/requests/${data.id}`,
                    data: {
                        status: data.status
                    }
                });
                if(request.status == 200) {
                    await this.getRequests()
                }
            } catch(error) {
                console.log(error);
            }
            
        },
    }
}
</script>
<style scoped>
.requests-container {
    margin: 0.8rem;
    margin-top: 5.5rem;
}
</style>