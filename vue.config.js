module.exports = {
    devServer: {
        port: 8080,
        proxy: {
            '^/api': {
                target: process.env.VUE_APP_API_URL,
                changeOrigin: true
            }
        }
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.sass$/,
                    use: [
                        "vue-style-loader",
                        "css-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                indentedSyntax: true,
                                sassOptions: {
                                    indentedSyntax: true
                                }
                            }
                        }
                    ]
                }
            ]
        }
    }
}