module.exports = {
  'name': 'webpack-tool',
  'version': '1.0.0',
  'description': '',
  'sideEffects': false,
  'dependencies': {},
  'devDependencies': {
    '@babel/core': '^7.3.4',
    '@babel/plugin-transform-runtime': '^7.3.4',
    '@babel/preset-env': '^7.3.4',
    '@babel/runtime': '^7.3.4',
    'babel-loader': '^8.0.0-beta.0',
    'babel-polyfill': '^6.26.0',
    'clean-webpack-plugin': '^1.0.1',
    'css-loader': '^2.1.0',
    'extract-text-webpack-plugin': '^4.0.0-beta.0',
    'file-loader': '^3.0.1',
    'html-webpack-plugin': '^3.2.0',
    'node-sass': '^4.11.0',
    'sass-loader': '^7.1.0',
    'style-loader': '^0.23.1',
    'uglifyjs-webpack-plugin': '^2.1.1',
    'url-loader': '^1.1.2',
    'webpack': '^4.29.5',
    'webpack-cli': '^3.2.3',
    'webpack-dev-server': '^3.1.14'
  },
  'scripts': {
    'test': 'echo \'Error: no test specified\' && exit 1',
    'build': 'webpack --config webpack.prod.config.js --mode=production',
    'dev': 'webpack-dev-server --open --config webpack.dev.config.js --mode=development'
  },
  'keywords': [],
  'author': '',
  'license': 'ISC'
}