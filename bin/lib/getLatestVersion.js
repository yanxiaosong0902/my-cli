import { exec } from 'child_process'
import ora from 'ora'

function getLatestVersion(packageName) {
  const promise = new Promise((resolve, reject) => {
    const spinner = ora('Check local version......').start()
    try {
      exec(`npm view ${packageName} version`, { encoding: 'utf-8' }, (error, stdout, stderr) => {
        if (error) {
          spinner.stop()
          reject(`Failed to get latest version of ${packageName}: ${error.message}`)
        }
        spinner.stop()
        resolve(stdout.trim())
      })
    } catch (error) {
      spinner.stop()
      reject(`Failed to get latest version of ${packageName}: ${error.message}`)
    }
  })
  return promise
}

export {
  getLatestVersion
}
