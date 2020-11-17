module.exports = {
  devServer: {
    proxy: 'http://localhost:8000',
  },
  publicPath: '/',
  transpileDependencies: ['vuetify'],
  outputDir: '../backend/public',
};
