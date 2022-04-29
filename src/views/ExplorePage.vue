<template>
    <div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            users: []
        }
    },
    created: async function () {
        const users = (await this.$axios.get('api/users'));
        this.users = users;
    },
    methods: {
    }
}
</script>
<style scoped>

</style>