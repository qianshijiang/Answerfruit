'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

// const path = require('path')
//
// module.exports = {
//   dev: {
//
//     // Paths
//     assetsSubDirectory: 'static',
//     assetsPublicPath: '/',
//     proxyTable: {
//       '/fsdmvc': {
//         target: 'http://120.77.243.134/', // 接口的域名
//         // secure: false,  // 如果是https接口，需要配置这个参数
//         changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
//         pathRewrite: {
//           '^/fsdmvc': '/fsdmvc'
//         }
//       }
//     },
//
//     // Various Dev Server settings
//     host: 'localhost', // can be overwritten by process.env.HOST
//     port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
//     autoOpenBrowser: false,
//     errorOverlay: true,
//     notifyOnErrors: true,
//     poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
//
//
//     /**
//      * Source Maps
//      */
//
//     // https://webpack.js.org/configuration/devtool/#development
//     devtool: 'cheap-module-eval-source-map',
//
//     // If you have problems debugging vue-files in devtools,
//     // set this to false - it *may* help
//     // https://vue-loader.vuejs.org/en/options.html#cachebusting
//     cacheBusting: true,
//
//     cssSourceMap: true
//   },
//
//   build: {
//     // Template for index.html
//     index: path.resolve(__dirname, '../dist/index.html'),
//
//     // Paths
//     assetsRoot: path.resolve(__dirname, '../dist'),
//     assetsSubDirectory: 'static',
//     assetsPublicPath: '/',
//
//     /**
//      * Source Maps
//      */
//
//     productionSourceMap: true,
//     // https://webpack.js.org/configuration/devtool/#production
//     devtool: '#source-map',
//
//     // Gzip off by default as many popular static hosts such as
//     // Surge or Netlify already gzip all static assets for you.
//     // Before setting to `true`, make sure to:
//     // npm install --save-dev compression-webpack-plugin
//     productionGzip: false,
//     productionGzipExtensions: ['js', 'css'],
//
//     // Run the build command with an extra argument to
//     // View the bundle analyzer report after build finishes:
//     // `npm run build --report`
//     // Set to `true` or `false` to always turn it on or off
//     bundleAnalyzerReport: process.env.npm_config_report
//   }
// }

const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/Qrcode': {
        target: 'http://129.28.109.71:8888/', // 接口的域名
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/Qrcode': '/Qrcode'
        }
      }
    },

    // Various Dev Server settings
    host: '192.168.101.146', // can be overwritten by process.env.HOST
    port: 8888, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },
}
