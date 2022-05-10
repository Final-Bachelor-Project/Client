<template>
  <b-card
    class="mb-3"
    body-class="request-container"
  >
    <b-avatar
      :src="request.user.profileImage"
      size="4rem"
    />
    <div class="request-info">
      <h5 class="mb-0">
        {{ request.user.username }}
      </h5>
      <p class="mb-0">
        {{ timeSince() }}
      </p>
    </div>
    <div class="request-buttons">
      <b-icon
        variant="secondary"
        class="mr-2"
        font-scale="2.5"
        icon="x-circle"
        @click="updateRequest('rejected')"
      />
      <b-icon
        variant="success"
        font-scale="2.5"
        icon="check-circle"
        @click="updateRequest('accepted')"
      />
    </div>
  </b-card>
</template>
<script>
export default {
    props: [
        'request'
    ],
    methods: {
        updateRequest(status) {
            this.$emit('update', {id: this.request.request._id, status: status})
        },
        timeSince() {
            const seconds = Math.floor((new Date() - new Date(this.request.request.createdAt)) / 1000);
            let interval = seconds / 31536000;

            if (interval > 1) {
                return Math.floor(interval) + " years ago";
            }
            interval = seconds / 2592000;
            if (interval > 1) {
                return Math.floor(interval) + " months ago";
            }
            interval = seconds / 86400;
            if (interval > 1) {
                return Math.floor(interval) + " days ago";
            }
            interval = seconds / 3600;
            if (interval > 1) {
                return Math.floor(interval) + " hours ago";
            }
            interval = seconds / 60;
            if (interval > 1) {
                return Math.floor(interval) + " minutes ago";
            }
            return Math.floor(seconds) + " seconds ago";
            }
        }
}
</script>
<style scoped>
.request-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

.request-info {
    margin-left: 1.5rem;
}

.request-info h5{
    color: var(--primary);
}

.request-buttons {
    margin-left: auto;
}
</style>