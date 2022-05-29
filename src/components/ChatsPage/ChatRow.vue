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
      <p
        v-if="chat.lastMessage"
        class="mb-0 message"
      >
        <span v-if="lastMessage.sentByLoggedInUser">You: </span>{{ lastMessage.content }}
      </p>
    </div>
    <div
      v-if="chat.lastMessage"
      class="ml-auto"
    >
      <p class="chat-date">
        {{ lastMessage.dateTime }}
      </p>
      <p />
    </div>
  </div>
</template>
<script>
import moment from 'moment'
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
                content: this.chat.lastMessage ? this.chat.lastMessage.content : '',
                sentByLoggedInUser: this.chat.lastMessage ? this.chat.lastMessage.sentBy == JSON.parse(localStorage.loggedInUser)._id : '',
                dateTime: this.formatDateTime()
            },
        }
    },
    methods: {
        isDateToday(datetime) {
            return moment().isSame(moment(datetime), 'day');
        },
        formatDateTime() {
            if(!this.chat.lastMessage) return ''
            return this.isDateToday(this.chat.lastMessage.dateTime) ? moment(this.chat.lastMessage.dateTime).format("hh:mm") : moment(this.chat.lastMessage.dateTime).format('MMM Do YY')
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