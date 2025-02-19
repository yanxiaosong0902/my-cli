const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  entry: ['./src/index.tsx', ],
  mode: 'development',
  module: {
    rules: [{
      test: /.(js|jsx)$/,
      exclude: /(node_modules)|(.ejs)/,
      use: ['babel-loader']
    }, {
      test: /.css$/,
      exclude: /(node_modules)|(.module.css)$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /(.module.css)$/,
      exclude: /node_modules/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[name]--[local]--[hash:base64:5]',
            namedExport: false // 为 true 时通过 import { className } from 或者 import * as from  导入
          }
        }
      }]
    }, {
      test: /.less$/,
      exclude: /(node_modules)|(.m.less)$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }, {
      test: /(.m.less)$/,
      exclude: /(node_modules)|([^(.m)].less$)/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[name]--[local]--[hash:base64:5]',
            namedExport: false
          }
        }
      }, 'less-loader']
    }, {
      test: /.(ts|tsx)$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }, ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'my app',
      template: './index.ejs'
    }),
  ],
  output: {
    filename: '[name]-[fullhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules', path.resolve(__dirname, 'node_modules')],
    extensions: ['.js', '.jsx', '.ts', '.tsx', ],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  devtool: 'inline-source-map',
}
