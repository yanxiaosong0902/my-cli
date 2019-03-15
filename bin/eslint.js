module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  'extends': [
    'eslint:recommended',
    //'plugin:vue/recommended'
  ],
  globals: {
    //'vue': true,
    //'React': true
  },
  plugins: [
    'html',
    //'react'
  ],
  'parser': 'babel-eslint',
  //"extends": "standard",
  'parserOptions': {
    'ecmaVersion': 2015,
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true,
      'arrowFunctions': true,
      'classes': true,
      'modules': true,
      'defaultParams': true
    },
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2,
      {SwitchCase: 1}
    ],
    'linebreak-style': [
      'error',
      'windows'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'eqeqeq': 2,
    'space-before-function-paren': [0, 'always'], //函数定义时括号前面要不要有空格
    'comma-spacing': 2, //逗号前后的空格
    'no-console': 0,
    'no-debugger': 0,
    'space-in-parens': [2, 'never'], //小括号里面要不要有空格
    'space-infix-ops': 2, //中缀操作符周围要不要有空格
    'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }], //对象字面量中冒号的前后空格
    'brace-style': [2, '1tbs'], //大括号风格
    'generator-star-spacing': 2, //生成器函数*的前后空格
    'arrow-parens': 2, //箭头函数用小括号括起来
    'arrow-spacing': 2, //=>的前/后括号
    'keyword-spacing': 2, //关键字后面是否要空一格
    'space-before-blocks': [2, 'always'], //不以新行开始的块{前面要不要有空格
    'no-multiple-empty-lines': [2, {'max': 1}], //空行最多不能超过2行
  }
};
