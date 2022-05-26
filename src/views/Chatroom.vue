<template>
  <div>
    <div class="chat-input-container">
      <b-form-textarea
        v-model="messageText"
        :class="{short: messageText.length < 30 && !messageText.includes('\n')}"
        max-rows="4"
      />
      <b-button
        variant="primary"
        pill
        class="px-2 py-1"
      >
        <i class="bi bi-send" />
      </b-button>
    </div>
    <div class="messages-container">
      <Message
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </div>
  </div>
</template>
<script>
import Message from "../components/ChatroomPage/Message.vue"
export default {
    components: {
        Message
    },
    data() {
        return {
            messageText: "",
            messages: [
                {sentByLoggedInUser: true, content: "this is a message", dateTime: 1653553755000},
                {sentByLoggedInUser: false, content: "this is a another message", dateTime: 1653554115000},
                {sentByLoggedInUser: true, content: "one more message", dateTime: 1653554715000},
                {sentByLoggedInUser: false, content: "another one here", dateTime: 1653555315000}
                ]
        }
    }
}
</script>
<style scoped>
.chat-input-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
}
.chat-input-container textarea {
    border-radius: 2rem;
    width: 18rem;
}
.short {
    max-height: 38px;
}

.short:not(:focus) {
    max-height: 38px;
}

.message-container {
    bottom: 0;
}
</style>