<template>
  <div class="nav--fixed-top nav--background">
    <b-navbar>
      <b-navbar-brand>
        <Sidebar />
      </b-navbar-brand>

      <b-navbar-nav>
        <b-nav-text> 
          {{ currentRouteName }}
        </b-nav-text>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<script>
import Sidebar from "./Sidebar.vue"
export default {
    components: {
        Sidebar
    }, 
    computed: {
        currentRouteName() {
            return this.$route.name;
        }
    }
}
</script>
<style scoped>
.nav--background {
  background-color: var(--white);
}

.navbar {
  padding: 0;
}

.nav--fixed-top {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1030;
}
</style>