<template>
  <div class="chat-row">
    <b-avatar
      class="mr-3"
      size="3.5rem"
      :src="participant.profileImg"
    />
    <div>
      <h4 class="mb-0">
        {{ participant.username }}
      </h4>
      <p class="mb-0 message">
        <span v-if="lastMessage.sentByLoggedInUser">You: </span>{{ lastMessage.content }}
      </p>
    </div>
    <div class="ml-auto">
      <p class="chat-date">
        {{ lastMessage.date }}
      </p>
      <p />
    </div>
  </div>
</template>
<script>
export default {
    setup() {
        
    },
    props: [
        'chat'
    ],
    data() {
        return {
            participant: this.chat.participant,
            lastMessage: this.chat.lastMessage
        }
    }
}
</script>
<style scoped>
.chat-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 1.5rem;
}
.chat-date {
    font-size: 0.8rem;
    margin-bottom: 1.2rem;
}
.message {
    color: var(--gray);
}
</style>