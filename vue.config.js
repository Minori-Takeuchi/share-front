const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/sanctum": {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
