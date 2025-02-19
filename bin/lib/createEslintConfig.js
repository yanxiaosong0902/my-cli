import fs from 'fs-extra'
import ejs from 'ejs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

// 获取当前模块的路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function createEslintConfig(config) {
  const templatePath = resolve(__dirname, '../config/ejs/eslint.config.ejs')
  const template = fs.readFileSync(templatePath, 'UTF-8')
  const fileContent = ejs.render(template, config, {
    rmWhitespace: true
  })
  return fileContent
}

export {
  createEslintConfig
}
