const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: "./example/Router-base-exam.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(xml)$/,
        use: [
          'xml-loader'
        ]
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output',
      template: path.resolve(__dirname, '../index.html'),
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:8000' }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
