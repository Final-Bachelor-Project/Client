<template>
  <div>
    <Navbar :is-whole-screen="isWholeScreen" />
    <div
      v-if="chats.length > 0"
      class="chats-container"
    >
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
    <div
      v-else
      class="text-center chats-container"
    >
      <h4>You have no chats</h4>
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
    props: {
        isWholeScreen: {
            default: true,
            type: Boolean
        }
    },
    data() {
        return {
            chats: []
        }
    },
    created: async function() {
        await this.getChats()
    },
    methods: {
        goToChatroom: function(id) {
            this.$router.push({path: `/chatroom/${id}`})
        },
        getChats: async function() {
            try{
                const chats = await this.$axios.get(`/api/chats`);
                this.chats = chats.data
            } catch(error) {
                if(error.response.status === 404) {
                    this.chats = []
                }
            }
        }
    }
}
</script>
<style scoped>
.chats-container {
    margin-top: 6rem;
}
</style>