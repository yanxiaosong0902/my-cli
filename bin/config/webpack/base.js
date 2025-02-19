import { CSS_RULE, MODULE_CSS_RULE, JS_RULE } from './rules.js'
export default {
  entry: [],
  rules: [
    JS_RULE,
    CSS_RULE,
    MODULE_CSS_RULE
  ],
  plugins: [
    `new HtmlWebpackPlugin({
      title: 'my app',
      template: './index.ejs'
    })`
  ],
  extensions: ['\'.js\''],
}
