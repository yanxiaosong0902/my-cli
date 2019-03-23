/*eslint-disable*/
const path = require('path')
require('babel-polyfill')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyjsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  entry: {
    app: ['babel-polyfill', './src/index.js'],
    //vendor: ['axios']
  },
  mode: 'production',
  //devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin({
      filename: './css/style.css'
    }),
    new CleanWebpackPlugin(['dist'], {
      verbose: true
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor'
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  output: {
    filename: 'bundle-[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}
