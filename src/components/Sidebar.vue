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
      width="60%"
      shadow
      backdrop
    >
      <template #default="{ hide }">
        <div class="p-3">
          <nav class="mt-3">
            <b-nav vertical>
              <b-nav-item
                to="/"
                :active="isActive('Explore')"
                @click="hide"
              >
                Explore
              </b-nav-item>
              <b-nav-item
                to="/requests"
                :active="isActive('Pending requests')"
                @click="hide"
              >
                Pending requests
              </b-nav-item>
              <b-nav-item
                to="/connections"
                :active="isActive('Connections')"
                @click="hide"
              >
                My connections
              </b-nav-item>
              <b-nav-item
                @click="logout"
              >
                Logout
              </b-nav-item>
            </b-nav>
          </nav>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>
<script>
export default {
    methods: {
        isActive: function(name) {
            return name == this.$route.name
        },
        logout: async function() {
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
</style>