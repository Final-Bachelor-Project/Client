<template>
  <div>
    <a
      v-b-toggle.sidebar
      class="sidebar-icon"
    >
      <b-icon
        class="m-4"
        scale="2.2"
        icon="justify"
      />
    </a>
    <b-sidebar
      id="sidebar"
      no-header
      
      shadow
      backdrop
    >
      <template #default="{ hide }">
        <div class="p-3">
          <div class="profile-link">
            <b-avatar
              size="4rem"
              :src="loggedInUser.profileImage"
            />
            <h4 class="mb-0 pl-2">
              {{ loggedInUser.username }}
            </h4>
          </div>
          <hr>
          <nav class="mt-3">
            <b-nav vertical>
              <b-nav-item
                to="/"
                :active="isActive('Explore')"
                @click="hide"
              >
                <b-icon
                  class="pr-2"
                  icon="music-note-list"
                />
                Explore
              </b-nav-item>
              <b-nav-item
                to="/profile"
                :active="isActive('Profile')"
                @click="hide"
              >
                <b-icon
                  class="pr-2"
                  icon="person-fill"
                />
                Profile
              </b-nav-item>
              <b-nav-item
                to="/requests"
                :active="isActive('Pending requests')"
                @click="hide"
              >
                <b-icon
                  class="pr-2"
                  icon="person-plus-fill"
                />
                Pending requests
              </b-nav-item>
              <b-nav-item
                to="/connections"
                :active="isActive('Connections')"
                @click="hide"
              >
                <b-icon
                  class="pr-2"
                  icon="people-fill"
                />
                My connections
              </b-nav-item>
              <b-nav-item
                to="/chats"
                :active="isActive('Chats')"
                @click="hide"
              >
                <b-icon
                  class="pr-2"
                  icon="chat-text-fill"
                />
                Chats
              </b-nav-item>
            </b-nav>
            <div
              class="logout"
              @click="logout"
            >
              <hr>
              <a class="m-3">
                <b-icon
                  class="pr-2"
                  icon="box-arrow-left"
                />
                Logout
              </a>
            </div>
          </nav>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>
<script>
export default {
    computed: {
      loggedInUser() {
        return JSON.parse(localStorage.loggedInUser)
      }
    },
    methods: {
        isActive: function(name) {
            return name == this.$route.name
        },
        logout: async function() {
          localStorage.removeItem('loggedInUser')
          await this.$axios.post('/api/auth/logout')
          this.$router.push({path: '/login'})
        }
    }
}
</script>
<style scoped>
.sidebar-icon {
    color: var(--black-default);
}
.sidebar-icon:hover {
    color: var(--primary);
}
.profile-link{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
}

a {
  color: var(--black-default);
  display: flex;
  flex-direction: row;
  align-items: center;
}

.active {
  color: var(--primary);
}

.logout {
  bottom: 0;
  position: absolute;
  width: 90%;
}
</style>