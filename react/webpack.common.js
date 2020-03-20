const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: '[name].[hash].js',
    path: path.resolve('./dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ['/node_modules'],
        use: [
          {
            loader: 'babel-loader',
            query: { compact: false },
          },
          {
            loader: 'eslint-loader',
            query: { compact: false },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebPackPlugin({ template: './public/index.html' }),
    new ErrorOverlayPlugin(),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{ from: 'assets/images', to: 'assets/images' }]),
  ],
}
