<template>
  <div
    class="message"
    :class="sentByLoggedInUser ? 'message-current-user' : 'message-user'"
  >
    <p class="mb-0">
      {{ message.content }}
    </p>
  </div>
</template>
<script>
export default {
    props: [
        'message'
    ],
    setup() {
        
    },
    computed: {
        sentByLoggedInUser() {
            return this.message.sentBy == localStorage.loggedInUser._id
        }
    }
}
</script>
<style scoped>
.message {
    width: 10rem;
    padding: 0.8rem;
    border-radius: 0.5rem;
    font-weight: 600;
}
.message-current-user {
    margin-left: auto;
    margin-right: 1rem;
    background-color: var(--primary);
    border-bottom-right-radius: 0;
    color: var(--white);
}
.message-user {
    margin-right: auto;
    margin-left: 1rem;
    background-color: var(--light-gray);
    border-bottom-left-radius: 0;
    color: black;
}
</style>