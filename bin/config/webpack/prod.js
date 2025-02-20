import { PROD_CSS_RULE, PROD_MODULE_CSS_RULE, JS_RULE, FILE_RULE } from './rules.js'
export default {
  entry: [],
  rules: [
    JS_RULE,
    PROD_CSS_RULE,
    PROD_MODULE_CSS_RULE,
    FILE_RULE,
  ],
  plugins: [
    `new HtmlWebpackPlugin({
      title: 'my app',
      template: './index.ejs'
    })`,
    `new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    })`
  ],
  extensions: ['\'.js\''],
}
