import { execSync } from 'child_process'

function getLatestVersion(packageName) {
  try {
    const version = execSync(`npm view ${packageName} version`, { encoding: 'utf-8' }).trim()
    return version
  } catch (error) {
    console.error(`Failed to get latest version of ${packageName}: ${error.message}`)
    process.exit(1)
  }
}

export {
  getLatestVersion
}
