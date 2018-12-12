'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})

// 'use strict'
// const merge = require('webpack-merge')
// const prodEnv = require('./prod.env')
//
// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"',
//   DUMMY: true,
//   HOST: '"http://fsd.xiamokj.com"',
//   // HOST: '"http://192.168.0.109:8088/admin"',
//
// })
