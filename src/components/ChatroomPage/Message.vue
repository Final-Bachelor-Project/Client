<template>
  <div class="message">
    <p>{{ message.content }}</p>
  </div>
</template>
<script>
export default {
    props: [
        'message'
    ],
    setup() {
        
    },
}
</script>
<style scoped>

</style>