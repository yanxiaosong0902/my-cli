import fs from 'fs-extra'
import { createWebpackConfig } from '../createWebpackConfig.js'
import { createPackageJson } from '../createPackageJson.js'
import { createBabelConfig } from '../createBabelConfig.js'
import { createEslintConfig } from '../createEslintConfig.js'
import shell from 'shelljs'
import path, { dirname, resolve } from 'path'
import { beautify } from '../beautify.js'
import { Options } from '../../options/options.js'
import { fileURLToPath } from 'url'

// 获取当前模块的路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function writeWebpackFile(config, options) {
  const { webframe, projectName, typescript } = options
  const webpackConfig = beautify(createWebpackConfig(config.webpackConfig))
  const packageJson = createPackageJson(config.packagejson)
  const babelConfig = beautify(createBabelConfig(config.babelConfig))
  const eslintConfig = beautify(createEslintConfig(config.eslintConfig))
  fs.mkdirSync(`./${projectName}`, {
    recursive: true
  })
  shell.cd(`./${projectName}`)
  const workSpace = process.cwd()
  const works = [
    fs.promises.writeFile('./webpack.config.js', webpackConfig),
    fs.promises.writeFile('./package.json', packageJson),
    fs.promises.writeFile('./babel.config.js', babelConfig),
    fs.promises.writeFile('./eslint.config.mjs', eslintConfig)
  ]
  try {
    await Promise.all(works)
    fs.cpSync(resolve(__dirname, '../../config/ejs/index.ejs'), `${workSpace}/index.ejs`)
    if (webframe === Options.React) {
      if (typescript) {
        fs.copySync(resolve(__dirname, '../..//template/react-with-ts'), workSpace)
      } else {
        fs.copySync(resolve(__dirname, '../../template/react'), workSpace)
      }
    }
    console.log('done')
  } catch (error) {
    console.error('project create failed', error)
    process.exit(1)
  }
}
