module.exports = {
    devServer: {
        // proxy: {
        //     target: 'http://localhost:3080',
        //     changeOrigin: true
        // }
        proxy: 'http://localhost:3080'
    }
}