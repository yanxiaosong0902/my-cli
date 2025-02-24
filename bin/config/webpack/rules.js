/* eslint-disable */

const JS_RULE =
`{
  test: /\.(js|jsx)$/,
  exclude: /(node_modules)|(.ejs)/,
  use: ['babel-loader']
}`

const MODULE_CSS_RULE =
`{
  test: /(\.module\.css)$/,
  exclude: /node_modules/,
  use: ['style-loader', {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: '[name]--[local]--[hash:base64:5]',
        namedExport: false // 为 true 时通过 import { className } from 或者 import * as from  导入
      },
    }
  }]
}`

const PROD_MODULE_CSS_RULE =
`{
  test: /(\.module\.css)$/,
  exclude: /node_modules/,
  use: [MiniCssExtractPlugin.loader, {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: '[name]--[local]--[hash:base64:5]',
        namedExport: false
      },
      importLoaders: 1
    }
  }, 'postcss-loader']
}`

const CSS_RULE =
`{
  test: /\.css$/,
  exclude: /(node_modules)|(\.module\.css)$/,
  use: ['style-loader', 'css-loader']
}`

const PROD_CSS_RULE =
`{
  test: /\.css$/,
  exclude: /(node_modules)|(\.module\.css)$/,
  use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
}`

/** xx.m.less but not xx.less */
const LESS_MODULE_RULE =
`{
  test: /(\.m\.less)$/,
  exclude: /(node_modules)|([^(.m)]\.less$)/,
  use: ['style-loader', {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: '[name]--[local]--[hash:base64:5]',
        namedExport: false
      },
      importLoaders: 2
    }
  }, 'less-loader']
}`

const PROD_LESS_MODULE_RULE =
`{
  test: /(\.m\.less)$/,
  exclude: /(node_modules)|([^(.m)]\.less$)/,
  use: [MiniCssExtractPlugin.loader, {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: '[name]--[local]--[hash:base64:5]',
        namedExport: false
      },
      importLoaders: 2
    }
  },'postcss-loader', 'less-loader']
}`

/** xx.less but not xx.m.less */
const LESS_RULE = 
`{
  test: /\.less$/,
  exclude: /(node_modules)|(\.m\.less)$/,
  use: ['style-loader', 'css-loader', 'less-loader']
}`

const PROD_LESS_RULE = 
`{
  test: /\.less$/,
  exclude: /(node_modules)|(\.m\.less)$/,
  use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
}`

const TS_RULE = 
`{
  test: /\.(ts|tsx)$/,
  use: ['babel-loader', 'ts-loader'],
  exclude: /node_modules/
}`

const FILE_RULE =
`{
  test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/,
  type: 'asset/resource',
  generator: {
    filename: 'assets/[name].[contenthash][ext]'
  }
}`

export {
  JS_RULE,
  MODULE_CSS_RULE,
  CSS_RULE,
  LESS_MODULE_RULE,
  LESS_RULE,
  FILE_RULE,
  TS_RULE,
  PROD_CSS_RULE,
  PROD_MODULE_CSS_RULE,
  PROD_LESS_MODULE_RULE,
  PROD_LESS_RULE
}
