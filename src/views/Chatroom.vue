<template>
  <div>
    <div />
    <div
      v-if="messages.lenght"
      class="messages-container"
    >
      <Message
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </div>
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
        @click="sendMessage"
      >
        <i class="bi bi-send" />
      </b-button>
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
            messages: [],
            chat: {},
        }
    },
    sockets:{
        socket(data) {
            console.log('socket', data);
        },
        io(data) {
            console.log('io', data);
        }
    },
    created: async function() {
        const chat = await this.$axios.get(`/api/chats/${this.$route.params.id}`)
        this.chat = chat.data
        this.$socket.emit('user-joined', {
            chatId: this.chat.id
        })
        const messages = await this.$axios.get(`/api/messages/chat/${this.$route.params.id}`)
        this.messages = messages
    },
    methods: {
        sendMessage: function() {
            // this.$socket.emit('newMessage', {
            //     room: this.getCurrentRoom,
            //     user: this.getUserData,
            //     admin: true,
            //     content: ''
            // })
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

.messages-container {
    bottom: 5rem;
    position: absolute;
    left: 0;
    width: -webkit-fill-available;
}
</style>