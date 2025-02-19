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
      }
    }
  }]
}`

const CSS_RULE =
`{
  test: /\.css$/,
  exclude: /(node_modules)|(\.module\.css)$/,
  use: ['style-loader', 'css-loader']
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
      }
    }
  }, 'less-loader']
}`

/** xx.less but not xx.m.less */
const LESS_RULE = 
`{
  test: /\.less$/,
  exclude: /(node_modules)|(\.m\.less)$/,
  use: ['style-loader', 'css-loader', 'less-loader']
}`

const FILE_RULE = 
`{
  test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/,
  use: ['file-loader']
}`

const TS_RULE = 
`{
  test: /\.(ts|tsx)$/,
  use: 'ts-loader',
  exclude: /node_modules/
}`

export {
  JS_RULE,
  MODULE_CSS_RULE,
  CSS_RULE,
  LESS_MODULE_RULE,
  LESS_RULE,
  FILE_RULE,
  TS_RULE
}
