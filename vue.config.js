const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = {
    //配置路径别名
    publicPath: "./",
    lintOnSave:false,
    configureWebpack: {
      resolve: {
        alias: {
          assets: "@/assets",
          components: "@/components",
          network: "@network",
          utils: "@/utils",
          views: "@/views",
          router:"@/router",
          store:"@/store"
        },
      },
      plugins: [
        ComponentsPlugin({
          resolvers: [VantResolver()],
        }),
      ],
    },
    devServer:{
      open:true
    }
  }