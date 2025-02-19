const packageJson = {
  'name': 'myApp',
  'version': '1.0.0',
  'description': 'myApp',
  'scripts': {
    'test': 'echo "Error: no test specified" && exit 1',
    'lint': 'eslint --ignore-pattern \'./node_modules/\' --ext .ts,.tsx ./',
    'dev': 'webpack server --no-cache',
    'build': 'rm -rf ./dist && webpack --config webpack.prod.config.js --no-cache'
  },
  'author': '',
  'license': 'ISC',
  'devDependecies': {

  },
  'dependencies': {

  },
  'engines': {
    'node': '>= 20.0.0'
  }
}

export default packageJson
