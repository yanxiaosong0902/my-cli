import inquirer from 'inquirer'
import { WebFrameOptions, ESLintOptions, LessOptions, TypeScriptOptions, BundlerOptions, Options } from '../options/options.js'
import { genWebpackConfig } from './genWebpackConfig.js'
import { writeWebpackFile } from './webpack/writeWebpackFile.js'
import bar from '../progress/index.js'
import { createVueProject } from './createVueProject.js'

function parseOption(option) {
  return option === Options.Yes ? true : false
}

export async function createWebProject(projectName) {

  const webframeQuestions = [{
    type: 'list',
    name: 'webframe',
    message: 'which web frame do you need ?',
    choices: WebFrameOptions
  }]
  const { webframe } = await inquirer.prompt(webframeQuestions)

  if (webframe === Options.Vue) {
    createVueProject(projectName)
    return
  }

  const questions = [{
    type: 'list',
    name: 'bundler',
    message: 'which bundler do you need ?',
    choices: BundlerOptions
  }]
  const { bundler } = await inquirer.prompt(questions)

  const typescriptQuestions = [{
    type: 'list',
    name: 'typescript',
    message: 'do you need typescript ?',
    choices: TypeScriptOptions
  }]
  const { typescript } = await inquirer.prompt(typescriptQuestions)

  const eslintQuestions = [{
    type: 'list',
    name: 'eslint',
    message: 'do you need eslint ?',
    choices: ESLintOptions
  }]
  const { eslint } = await inquirer.prompt(eslintQuestions)

  let less = Options.No

  if (webframe !== Options.None) {
    const LessQuestions = [{
      type: 'list',
      name: 'less',
      message: 'do you need less ?',
      choices: LessOptions
    }]
    less = await inquirer.prompt(LessQuestions)
  }

  const options = {
    projectName,
    webframe,
    less: parseOption(less),
    typescript: parseOption(typescript),
    eslint: parseOption(eslint)
  }

  bar.tick(10)

  let config = null
  switch (bundler) {
    case Options.Webpack:
      config = await genWebpackConfig(options)
      writeWebpackFile(config, options)
      break
    default:
      break
  }
}
