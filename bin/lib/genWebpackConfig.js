import { Options } from '../options/options.js'
import _webpackConfig from '../config/webpack/base.js'
import _webpackProdConfig from '../config/webpack/prod.js'
import _packagejson from'../config/json/base.js'
import eslintConfig from '../config/eslint/base.js'
import eslintWithTs from '../config/eslint/ts.js'
import babelConfig from '../config/babel/base.js'
import dependencies from '../config/json/webpack.js'
import { TS_RULE, LESS_RULE, LESS_MODULE_RULE, PROD_LESS_RULE, PROD_LESS_MODULE_RULE } from '../config/webpack/rules.js'
import { addReact, addTypescript, addReactTypes, addLess, addEslint, addCss } from './addDependency.js'
import bar from '../progress/index.js'

function initTypescript(webpackConfig, webpackProdConfig, packagejson, webframe) {
  webpackConfig.extensions.push('\'.ts\'')
  webpackProdConfig.extensions.push('\'.ts\'')
  webpackConfig.rules.push(TS_RULE)
  webpackProdConfig.rules.push(TS_RULE)
  packagejson = addTypescript(packagejson)
  if (webframe === Options.React) {
    webpackConfig.extensions.push('\'.tsx\'')
    webpackProdConfig.extensions.push('\'.tsx\'')
    packagejson = addReactTypes(packagejson)
  }
  return {
    webpackConfig,
    webpackProdConfig,
    packagejson
  }
}

async function genWebpackConfig(options) {
  const { webframe, projectName, less, typescript, eslint } = options
  let packagejson = _packagejson
  let webpackConfig = _webpackConfig
  let webpackProdConfig = _webpackProdConfig
  packagejson.name = projectName
  packagejson.description = projectName
  packagejson.devDependencies = dependencies.devDependencies
  packagejson.dependencies = dependencies.dependencies
  packagejson.scripts.dev = 'webpack server --no-cache'
  packagejson.scripts.build = 'rm -rf dist && webpack --config webpack.config.prod.js --no-cache'
  bar.tick(10)
  switch (webframe) {
    case Options.React:
      packagejson = addCss(packagejson)
      babelConfig.plugins.push('\'@babel/preset-react\'')
      packagejson = addReact(packagejson)
      webpackConfig.extensions.push('\'.jsx\'')
      webpackProdConfig.extensions.push('\'.jsx\'')
      webpackConfig.entry.push(typescript ? '\'./src/index.tsx\'' : '\'./src/index.jsx\'')
      webpackProdConfig.entry.push(typescript ? '\'./src/index.tsx\'' : '\'./src/index.jsx\'')
      if (less) {
        webpackConfig.rules.push(LESS_RULE, LESS_MODULE_RULE)
        webpackProdConfig.rules.push(PROD_LESS_RULE, PROD_LESS_MODULE_RULE)
        packagejson = addLess(packagejson)
      }
      if (typescript) {
        const reuslt = initTypescript(webpackConfig, webpackProdConfig, packagejson, webframe)
        webpackConfig = reuslt.webpackConfig
        webpackProdConfig = reuslt.webpackProdConfig
        packagejson = reuslt.packagejson
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
    case Options.None:
      webpackConfig.entry.push(typescript ? '\'./src/index.ts\'' : '\'./src/index.js\'')
      webpackProdConfig.entry.push(typescript ? '\'./src/index.ts\'' : '\'./src/index.js\'')
      if (typescript) {
        const reuslt = initTypescript(webpackConfig, webpackProdConfig, packagejson, webframe)
        webpackConfig = reuslt.webpackConfig
        webpackProdConfig = reuslt.webpackProdConfig
        packagejson = reuslt.packagejson
      }
      if (eslint) {
        packagejson = addEslint(packagejson, webframe, typescript)
        if (typescript) {
          eslintConfig.ts = eslintWithTs
        }
      }
      break
    default:
      break
  }
  bar.tick(10)
  packagejson.dependencies = Object.keys(packagejson.dependencies).sort().reduce((obj, key) => {
    obj[key] = packagejson.dependencies[key]
    return obj
  }
  , {})
  packagejson.devDependencies = Object.keys(packagejson.devDependencies).sort().reduce((obj, key) => {
    obj[key] = packagejson.devDependencies[key]
    return obj
  }
  , {})
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
