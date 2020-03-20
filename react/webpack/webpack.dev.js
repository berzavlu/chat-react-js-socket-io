const merge = require('webpack-merge')
const common = require('../webpack.common')

require('dotenv').config()

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    host: 'localhost',
    https: true,
    port: process.env.PORT,
    open: true,
    hot: true,
    // overlay: true,
    historyApiFallback: true,
    stats: 'errors-only',
  },
})
