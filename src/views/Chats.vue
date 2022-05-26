<template>
  <div>
    <Navbar />
    <div class="chats-container">
      <div
        v-for="chat in chats"
        :key="chat.id"
        @click="goToChatroom(chat.id)"
      >
        <ChatRow
          :chat="chat"
        />
        <hr>
      </div>
    </div>
  </div>
</template>
<script>
import ChatRow from "../components/ChatsPage/ChatRow.vue"
import Navbar from "../components/Navbar.vue"
export default {
    components: {
        ChatRow,
        Navbar
    },
    data() {
        return {
            chats: []
        }
    },
    created: async function() {
        this.chats = await this.getChats()
    },
    methods: {
        goToChatroom: function(id) {
            this.$router.push({path: `/chatroom/${id}`})
        },
        getChats: async function() {
            return (await this.$axios.get(`api/chats`)).data
        }
    }
}
</script>
<style scoped>
.chats-container {
    margin-top: 6rem;
}
</style>