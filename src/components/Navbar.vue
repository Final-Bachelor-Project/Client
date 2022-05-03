<template>
  <div>
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

</style>