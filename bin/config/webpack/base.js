import { CSS_RULE, MODULE_CSS_RULE, JS_RULE, FILE_RULE } from './rules.js'
export default {
  entry: [],
  rules: [
    JS_RULE,
    CSS_RULE,
    MODULE_CSS_RULE,
    FILE_RULE,
  ],
  plugins: [
    `new HtmlWebpackPlugin({
      title: 'my app',
      template: './index.ejs'
    })`
  ],
  extensions: ['\'.js\''],
}
