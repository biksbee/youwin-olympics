// vue.config.js
module.exports = {
  configureWebpack: {
    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
    },
  }
}