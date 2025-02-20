#!/usr/bin/env node

import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import chalk from 'chalk'
import inquirer from 'inquirer'
import program from 'commander'
import fs from 'fs-extra'
import { createWebProject } from './lib/createWebProject.js'
import { ProjectTypeOptions, Options } from './options/options.js'
import { getLatestVersion } from './lib/getLatestVersion.js'

// 获取当前模块的路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// let tool = ''
// let eslint = true
// program
//   .version('2.0.0', '-v, --version')
//   .parse(process.argv)
// program
//   .command('create <projectName>')
//   .description('list files in current working directory')
//   .option('-a, --all', 'Whether to display hidden files')
//   .action(async function(projectName) {
//     let choices = ['webpack', 'gulp', 'vite']
//     let questions = [{
//       type: 'list',
//       name: 'bundler',
//       message: 'which bundler do you need ?',
//       choices
//     }]
//     let tool_option = await inquirer.prompt(questions)
//     tool = tool_option['bundler']
//     let eslint_choices = ['yes', 'no']
//     let eslint_questions = [{
//       type: 'list',
//       name: 'eslint',
//       message: 'Do you need use eslint for your code?',
//       choices: eslint_choices
//     }]
//     let eslint_option = await inquirer.prompt(eslint_questions)
//     eslint = eslint_option['eslint']
//     fs.mkdirSync(`./${projectName}`, {recursive: true})
//     shell.cd(`./${projectName}`)
//     if (tool === 'webpack') {
//       let webpack_json = require(__dirname + '/package_template.js')
//       webpack_json.name = projectName
//       if (eslint) {
//         webpack_json.devDependencies.eslint = '^5.10.0'
//         webpack_json.devDependencies['babel-eslint'] = '^10.0.1'
//         webpack_json.devDependencies['eslint-plugin-html'] = '^5.0.0'
//         webpack_json.devDependencies['eslint-plugin-jsx-a11y'] = '^6.1.2'
//         fs.readFile(__dirname + '/eslint.js', 'UTF-8', (err, data) => {
//           if (err) {
//             throw err
//           } else {
//             fs.writeFile('./.eslintrc.js', data, (err) => {
//               if (err) throw err
//             })
//           }
//         })
//       }
//       fs.copyFile(__dirname + '/.babelrc', './.babelrc', (err) => {
//         if (err) throw err
//       })
//       fs.copyFile(__dirname + '/postcss.config.js', './postcss.config.js', (err) => {
//         if (err) throw err
//       })
//       //fs.mkdirSync('src/assets', {recursive: true})
//       fs.mkdirSync('src')
//       fs.mkdirSync('src/assets')
//       fs.writeFile('./src/index.js', 'import "./assets/reset.css"', (err) => {
//         if (err) throw err
//       })
//       fs.copyFile(__dirname + '/reset.css', './src/assets/reset.css', (err) => {
//         if (err) throw err
//       })
//       fs.copyFile(__dirname + '/webpack_html.html', './index.html', (err) => {
//         if (err) throw err
//       })
//       fs.copyFile(__dirname + '/webpack.dev.config.js', './webpack.dev.config.js', (err) => {
//         if (err) throw err
//       })
//       fs.copyFile(__dirname + '/webpack.prod.config.js', './webpack.prod.config.js', (err) => {
//         if (err) throw err
//       })
//       webpack_json = JSON.stringify(webpack_json, null, 2)
//       fs.writeFile('./package.json', webpack_json, (err) => {
//         if (err) throw err
//         shell.exec('npm install', (err) => {
//           if (err) {
//             throw err
//           } else {
//             shell.exec('npm run dev')
//           }
//         })
//       })
//     } else {
//       let gulp_json = require(__dirname + '/gulp_template.js')
//       gulp_json.name = projectName
//       if (eslint) {
//         gulp_json.devDependencies.eslint = '^5.10.0'
//         gulp_json.devDependencies['babel-eslint'] = '^10.0.1'
//         gulp_json.devDependencies['eslint-plugin-html'] = '^5.0.0'
//         gulp_json.devDependencies['eslint-plugin-jsx-a11y'] = '^6.1.2'
//         fs.readFile(__dirname + '/eslint.js', 'UTF-8', (err, data) => {
//           if (err) {
//             throw err
//           } else {
//             fs.writeFile('./.eslintrc.js', data, (err) => {
//               if (err) throw err
//             })
//           }
//         })
//       }
//       gulp_json = JSON.stringify(gulp_json, null, 2)
//       shell.mkdir('-p', ['app/css', 'app/scss', 'app/js', 'app/lib', 'app/img'])
//       fs.writeFile('./app/index.js', 'console.log(123)', (err) => {
//         if (err) throw err
//       })
//       shell.cp(__dirname + '/gulp_html.html', 'app/index.html')
//       shell.cp(__dirname + '/reset.css', 'app/scss/reset.scss')
//       fs.writeFile('./package.json', gulp_json, (err) => {
//         if (err) throw err
//         try {
//           fs.copyFile(__dirname + '/gulp.js', './gulpfile.js', (err) => {
//             if (err) throw err
//             shell.exec('npm install', (err) => {
//               if (err) {
//                 throw err
//               } else {
//                 shell.exec('gulp')
//               }
//             })
//           })
//         } catch (e) {
//           console.log(e);
//         }
//       })
//     }
//   })
// program
//   .command('list')
//   .description('list files in current working directory') //给出list这个命令的描述
//   .option('-a, --all', 'Whether to display hidden files') //设置list这个命令的参数
//   .action(function(options) { //list命令的实现体
//     //获取当前运行目录下的文件信息
//     fs.readdir(process.cwd(), function (err, files) {
//       var list = files;
//       if (!options.all) { //检查用户是否给了--all或者-a的参数，如果没有，则过滤掉那些以.开头的文件
//         list = files.filter(function (file) {
//           return file.indexOf('.') !== 0;
//         });
//       }
//       console.log(list.join('\n\r')); //控制台将所有文件名打印出来
//     });
//   })
// program.parse(process.argv)


async function main() {
  const PackageJSONPath = resolve(__dirname, '../package.json')
  const CliName = 'keith-cli'
  const packageJson = fs.readFileSync(PackageJSONPath, {
    encoding: 'utf-8'
  })
  const packageJsonObj = JSON.parse(packageJson)
  const latestVersion = await getLatestVersion(CliName)
  const currentNodeVersion = process.version
  if (currentNodeVersion.split('.')[0].replace(/[^\d]/g, '') < 20) {
    console.log(chalk.red('Node.js version must be greater than ') + chalk.green('v20,') + chalk.red('current version is ') + chalk.yellow(`${currentNodeVersion}`))
    process.exit(1)
  }
  if (latestVersion.replaceAll('.', '') >  packageJsonObj.version.replaceAll('.', '')) {
    console.log(chalk.yellow(`New version （${latestVersion}） of ${CliName} is available. Run npm install -g ${CliName} to update.`))
  }
  console.log('Start to create project......')
  program
    .name(CliName)
    .version(packageJsonObj.version, '-v, --version')

  program
    .command('create <projectName>')
    .description('create a new project')
    .action(async function(projectName) {

      if (fs.existsSync(`./${projectName}`)) {
        console.error(`${projectName} already exists, please change the project name`)
        process.exit(1)
      }

      const projectTypeQuestions = [{
        type: 'list',
        name: 'projectType',
        message: 'which project type do you need ?',
        choices: ProjectTypeOptions
      }]
      const { projectType } = await inquirer.prompt(projectTypeQuestions)

      switch (projectType) {
        case Options.Web:
          createWebProject(projectName)
          break
        case Options.Node:
          break
        default:
          break
      }
    })

  program.parse(process.argv)
}

main()
