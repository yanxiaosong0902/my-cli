import { Options } from '../options/options.js'
import webpackConfig from '../config/webpack/base.js'
import webpackProdConfig from '../config/webpack/prod.js'
import packageJson from'../config/json/base.js'
import eslintConfig from '../config/eslint/base.js'
import eslintWithTs from '../config/eslint/ts.js'
import babelConfig from '../config/babel/base.js'
import dependencies from '../config/json/webpack.js'
import { TS_RULE, LESS_RULE, LESS_MODULE_RULE, PROD_LESS_RULE, PROD_LESS_MODULE_RULE } from '../config/webpack/rules.js'
import { addReact, addTypescript, addReactTypes, addLess, addEslint } from './addDependency.js'
import bar from '../progress/index.js'
async function genWebpackConfig({ webframe, projectName, less, typescript, eslint }) {
  let packagejson = packageJson
  packagejson.name = projectName
  packagejson.description = projectName
  packagejson.devDependencies = dependencies.devDependencies
  packagejson.dependencies = dependencies.dependencies
  packageJson.scripts.dev = 'webpack server --no-cache'
  packageJson.scripts.build = 'rm -rf dist && webpack --config webpack.config.prod.js --no-cache'
  bar.tick(10)
  switch (webframe) {
    case Options.React:
      babelConfig.plugins.push('\'@babel/preset-react\'')
      packagejson = addReact(packagejson)
      webpackConfig.extensions.push('\'.jsx\'')
      webpackConfig.entry.push(typescript ? '\'./src/index.tsx\'' : '\'./src/index.jsx\'')
      if (less) {
        webpackConfig.rules.push(LESS_RULE, LESS_MODULE_RULE)
        webpackProdConfig.rules.push(PROD_LESS_RULE, PROD_LESS_MODULE_RULE)
        packagejson = addLess(packagejson)
      }
      if (typescript) {
        webpackConfig.extensions.push('\'.ts\'', '\'.tsx\'')
        webpackConfig.rules.push(TS_RULE)
        packagejson = addTypescript(packagejson)
        packagejson = addReactTypes(packagejson)
      }
      if (eslint) {
        packagejson = addEslint(packagejson, webframe, typescript)
        eslintConfig.jsPlugins.push({
          key: 'react',
          value: 'react',
          importer: 'eslint-plugin-react'
        }, {
          key: '\'react-hooks\'',
          value: 'reactHooks',
          importer: 'eslint-plugin-react-hooks'
        }, {
          key: '\'jsx-a11y\'',
          value: 'a11y',
          importer: 'eslint-plugin-jsx-a11y'
        })
        if (typescript) {
          eslintConfig.ts = eslintWithTs
        }
      }
      break
    default:
      break
  }
  bar.tick(10)
  return {
    webpackConfig,
    webpackProdConfig,
    packagejson,
    eslintConfig,
    babelConfig
  }
}

export {
  genWebpackConfig
}
