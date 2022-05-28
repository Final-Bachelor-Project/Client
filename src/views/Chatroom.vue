<template>
  <div>
    <div class="chatroom-header">
      <b-icon
        class="mr-4"
        icon="arrow-left"
        font-scale="2"
        @click="goToChats()"
      />
      <b-avatar :src="chat.user.profileImage" />
      <h4 class="mb-0 pl-2">
        {{ chat.user.username }}
      </h4>
    </div>
    <div
      v-show="messages.length > 0"
      id="messages"
      v-chat-scroll
      class="messages-container"
    >
      <Message
        v-for="message in messages"
        :key="message.id"
        class="mt-2"
        :message="message"
      />
    </div>
    <div class="chat-input-container">
      <b-form-textarea
        v-model="messageText"
        class="w-100"
        :class="{short: messageText.length < 30 && !messageText.includes('\n')}"
        max-rows="4"
      />
      <b-button
        v-if="messageText"
        variant="primary"
        pill
        class="px-2 py-1 ml-3"
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
        messageReceived(data) {
            this.messages.push(data)
        }
    },
    created: async function() {
        const chat = await this.$axios.get(`/api/chats/${this.$route.params.id}`)
        this.chat = chat.data
        this.$socket.emit('userJoined', {
            chatId: this.chat.id
        })
        const messages = await this.$axios.get(`/api/messages/chat/${this.$route.params.id}`)
        this.messages = messages.data

        this.$nextTick(() => {
            const container = this.$el.querySelector("#messages");
            container.scrollTop = container.scrollHeight;
            console.log(container.scrollTop);
            console.log(container.scrollHeight);
        })
    },
    methods: {
        sendMessage: function() {
            this.$socket.emit('newMessage', {
                chatId: this.chat.id,
                content: this.messageText,
                sentBy: JSON.parse(localStorage.loggedInUser)._id
            });
            this.messageText = ""
        },
        goToChats: function() {
            this.$router.push({path: '/chats'})
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
    overflow-y: scroll;
    margin-top: 4rem;
}

.chatroom-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 1rem;
    position: fixed;
    top: 0;
    width: 100%;
    background-color: white;
    margin-top: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
    z-index: 1;

}
</style>