<template>
  <div class="img-container">
    <b-img
      :src="user.profileImage"
      rounded
      class="user-image"
    />
    <div class="user-info">
      <h6>
        {{ user.username }}
      </h6>
    </div>
  </div>
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
    created: function() {
        console.log(this.user);
    }
}
</script>
<style scoped>
.img-container {
    width: 11rem;
    height: 14rem;
    position: relative;
}
.user-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.6rem !important;
}

.user-info {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding-top: 0.2rem;
    color: var(--white);
    background-color: rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 0.6rem;
    border-bottom-left-radius: 0.6rem;
}

.user-info h6 {
    font-weight: 800;
}
</style>