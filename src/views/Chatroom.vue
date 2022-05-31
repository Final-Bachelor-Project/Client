<template>
  <div class="grid-container">
    <Chats
      v-if="isBigScreen"
      :is-whole-screen="false"
      class="chats"
    />
    <div :class="isBigScreen ? 'position-relative' : ''">
      <div
        v-if="chat.user"
        class="chatroom-header"
      >
        <b-icon
          v-if="!isBigScreen"
          class="mr-4"
          icon="arrow-left"
          font-scale="2"
          @click="goToChats()"
        />
        <div @click="openProfile">
          <b-avatar :src="chat.user.profileImage" />
          <h4 class="mb-0 pl-2">
            {{ chat.user.username }}
          </h4>
        </div>
      </div>
      <div
        v-show="messages.length > 0"
        v-chat-scroll
        class="messages-container"
      >
        <Message
          v-for="message in messages"
          :key="message.id"
          :class="isBigScreen ? 'message--width' : ''"
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
          @keyup.enter="sendMessage"
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
    <UserProfileModal
      v-if="showProfileModal"
      :is-connection="true"
      :show-modal="showProfileModal"
      :user-id="chat.user._id"
      :score="chat.user.score"
      v-on="$listeners"
      @closeModal="closeModal"
    />
  </div>
</template>
<script>
import Message from "../components/ChatroomPage/Message.vue"
import UserProfileModal from "../components/ExplorePage/UserProfileModal.vue"
import Chats from "../views/Chats.vue"

export default {
    components: {
        Message,
        UserProfileModal,
        Chats
    },
    data() {
        return {
            messageText: "",
            messages: [],
            chat: {},
            showProfileModal: false,
            windowWidth: window.innerWidth
        }
    },
    sockets:{
        messageReceived(data) {
            this.messages.push(data)
        }
    },
    computed: {
        isBigScreen() {
            return this.windowWidth > 850
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
    },
    mounted() {
        window.onresize = () => {
            this.windowWidth = window.innerWidth
        }
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
        },
        openProfile: function() {
            this.showProfileModal = true
        },
        closeModal: function() {
            this.showProfileModal = false
        }
    }
}
</script>
<style scoped>
.chat-input-container {
    position: absolute;
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
    top: 5rem;
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
.chatroom-header div {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.chats {
    border-right: 1px solid var(--light-gray);

}

.chats::v-deep .chats-container{
    height: 85vh;
}

.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
}

.message--width {
    max-width: 25rem;
}
</style>