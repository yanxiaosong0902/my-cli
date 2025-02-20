import fs from 'fs-extra'
import { createWebpackConfig } from '../createWebpackConfig.js'
import { createPackageJson } from '../createPackageJson.js'
import { createBabelConfig } from '../createBabelConfig.js'
import { createEslintConfig } from '../createEslintConfig.js'
import shell from 'shelljs'
import { dirname, resolve } from 'path'
import { beautify } from '../beautify.js'
import { Options } from '../../options/options.js'
import { fileURLToPath } from 'url'
import { createWebpackProdConfig } from '../createWebpackProdConfig.js'
import bar from '../../progress/index.js'

// 获取当前模块的路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function wait(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export async function writeWebpackFile(config, options) {
  const { webframe, projectName, typescript } = options
  const webpackConfig = beautify(createWebpackConfig(config.webpackConfig))
  const webpackProdConfig = beautify(createWebpackProdConfig(config.webpackProdConfig))
  const packageJson = createPackageJson(config.packagejson)
  const babelConfig = beautify(createBabelConfig(config.babelConfig))
  const eslintConfig = beautify(createEslintConfig(config.eslintConfig))
  bar.tick(10)
  fs.mkdirSync(`./${projectName}_temp`, {
    recursive: true
  })
  bar.tick(10)
  const workSpace = process.cwd()
  shell.cd(`./${projectName}_temp`)
  const virtualWorkspace = process.cwd()
  await wait(1000)
  bar.tick(10)
  const works = [
    fs.promises.writeFile('./webpack.config.js', webpackConfig),
    fs.promises.writeFile('./webpack.config.prod.js', webpackProdConfig),
    fs.promises.writeFile('./package.json', packageJson),
    fs.promises.writeFile('./babel.config.js', babelConfig),
    fs.promises.writeFile('./eslint.config.mjs', eslintConfig)
  ]
  try {
    await Promise.all(works)
    bar.tick(10)
    await wait(1000)
    fs.cpSync(resolve(__dirname, '../../config/ejs/index.ejs'), `${virtualWorkspace}/index.ejs`)
    bar.tick(10)
    if (webframe === Options.React) {
      if (typescript) {
        fs.copySync(resolve(__dirname, '../..//template/react-with-ts'), virtualWorkspace)
      } else {
        fs.copySync(resolve(__dirname, '../../template/react'), virtualWorkspace)
      }
    }
    fs.mkdirSync(`${workSpace}/${projectName}`, {
      recursive: true
    })
    fs.copySync(resolve('./'), `${workSpace}/${projectName}`)
    shell.cd(workSpace)
    shell.exec(`rm -rf ${resolve(virtualWorkspace)}`)
    bar.tick(100)
    console.log(`Enter ${projectName} And  RUN \`npm install\` to install dependencies`)
    console.log('Then RUN `npm run dev` to start the project')
  } catch (error) {
    shell.exec(`rm -rf ${resolve(virtualWorkspace)}`)
    console.error('project create failed', error)
    process.exit(1)
  }
}
