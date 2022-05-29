<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>

export default {
  name: 'App',
  sockets: {
    connect: function () {
      console.log('socket connected')
    }
  },
}
</script>

<style lang="scss">
@import './assets/css/global.css';
@import './assets/scss/custom.scss';
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--black-default);
}
</style>
