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
                to="/explore"
                active
                @click="hide"
              >
                Explore
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