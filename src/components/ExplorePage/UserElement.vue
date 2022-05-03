<template>
  <b-card
    :img-src="user.profileImage"
    img-alt="Image"
    img-top
    body-class="card-body-container"
    class="img-container"
    img-height="70%"
  >
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
</template>
<script>
export default {
    props: [
        'user'
    ],
    data() {
        return {

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

        }
    }
}
</script>
<style scoped>
.img-container {
    width: 11rem;
    height: 16rem;
    position: relative;
    border-radius: 0.6rem !important;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 15%);
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
</style>