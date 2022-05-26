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
            chats: [
                {participant: {profileImg: "https://i.scdn.co/image/ab6775700000ee857271df232529e4ad92fa03ed", username: "username"}, lastMessage: {sentByLoggedInUser: false, content: "message content", date: "2022-05-25"}},
                {participant: {profileImg: "https://cdn.shopify.com/s/files/1/1566/2889/articles/PORTADA-TC.jpg?v=1625573349", username: "username 2"}, lastMessage: {sentByLoggedInUser: true, content: "message content", date: "2022-05-25"}}
                ]
        }
    },
    methods: {
        goToChatroom: function(id) {
            //this.$router.push({path: `/chatroom/${id}`})
            this.$router.push({path: `/chatroom`})
        }
    }
}
</script>
<style scoped>
.chats-container {
    margin-top: 6rem;
}
</style>