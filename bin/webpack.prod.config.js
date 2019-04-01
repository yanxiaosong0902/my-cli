/*eslint-disable*/
const path = require('path')
require('babel-polyfill')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyjsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
  entry: {
    app: ['babel-polyfill', './src/index.js'],
    //vendor: ['axios']
  },
  mode: 'production',
  //devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      verbose: true
    }),
    new MiniCssExtractPlugin({
      filename: './css/style.css'
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
    },
    minimizer: [
      new UglifyjsPlugin(),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  output: {
    filename: 'bundle-[hash].js',
    path: path.resolve(__dirname, './dist'),
    //libraryTarget: 'umd',
    //umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
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
