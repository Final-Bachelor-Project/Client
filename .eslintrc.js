module.exports = {
    extends: [
        "plugin:vue/essential",
        "plugin:vue/recommended",
        "plugin:vue/strongly-recommended",
        //"eslint:recommended"
    ],
    rules: {
        'vue/no-unused-vars': 'error'
    },
    parser: "vue-eslint-parser",
}