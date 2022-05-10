<template>
  <b-card
    class="mb-3"
    body-class="connection-container"
  >
    <b-avatar
      :src="connection.profileImage"
      size="4rem"
    />
     
    <h5 class="mb-0 username">
      {{ connection.username }}
    </h5>
    <b-icon
      variant="info"
      class="mr-2 ml-auto"
      font-scale="2.5"
      icon="chat-dots"
    />
  </b-card>
</template>
<script>
export default {
    props: ['connection']
}
</script>
<style scoped>
.connection-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

.username {
    margin-left: 1.5rem;
    color: var(--primary);
}
</style>