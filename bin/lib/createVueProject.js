import { execSync } from 'child_process'

export function createVueProject() {
  execSync('npm create vue@latest', { stdio: 'inherit' })
}
