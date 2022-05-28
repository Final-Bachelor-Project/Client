<template>
  <div class="chat-row">
    <b-avatar
      class="mr-3"
      size="3.5rem"
      :src="user.profileImage"
    />
    <div class="w-50">
      <h4 class="mb-0">
        {{ user.username }}
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
            user: this.chat.user,
            lastMessage: {
                content: this.chat.lastMessage.content,
                sentByLoggedInUser: this.chat.lastMessage.sentBy == JSON.parse(localStorage.loggedInUser)._id
            },
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
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis; 
}
</style>