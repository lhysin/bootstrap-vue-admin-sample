const path = require('path');

module.exports = {

  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
      },
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
  },
  chainWebpack (config) {
    if (process.env.NODE_ENV !== 'production') {
      config.devtool('cheap-modules-source-map');
    }

    // eslint-loader auto fix true.
    config.module.rule('eslint').use('eslint-loader').options({
      fix: true,
    });
  },
  pluginOptions: {
    moment: {
      locales: [
        'ko',
      ],
    },
    lintStyleOnBuild: true,
    stylelint: {
      fix: true,
    },
  },
};
