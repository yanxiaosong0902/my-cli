import { Options } from '../options/options.js'

function addTypescript(packagejson) {
  packagejson.devDependencies['ts-loader'] = '^9'
  packagejson.devDependencies['typescript'] = '^5'
  packagejson.devDependencies['@types/node'] = '^22'
  return packagejson
}

function addReact(packagejson) {
  packagejson.dependencies.react = '^19',
  packagejson.dependencies['react-dom'] = '^19'
  packagejson.devDependencies['@babel/preset-react'] = '^7'
  return packagejson
}

function addReactTypes(packagejson) {
  packagejson.devDependencies['@types/react'] = '^19'
  packagejson.devDependencies['@types/react-dom'] = '^19'
  return packagejson
}

function addLess(packagejson) {
  packagejson.devDependencies['less-loader'] = '^12'
  packagejson.devDependencies['less'] = '^4'
  return packagejson
}

function addEslint(packagejson, webframe, typescript) {
  packagejson.devDependencies['eslint'] = '^9'
  packagejson.devDependencies['@eslint/js'] = '^9'
  if (webframe === Options.React) {
    packagejson.devDependencies['eslint-plugin-react'] = '^7'
    packagejson.devDependencies['eslint-plugin-react-hooks'] = '^5'
    packagejson.devDependencies['eslint-plugin-jsx-a11y'] = '^6'
  }
  if (typescript) {
    packagejson.devDependencies['@typescript-eslint/parser'] = '^8'
    packagejson.devDependencies['@typescript-eslint/eslint-plugin'] = '^8'
  }
  return packagejson
}

export {
  addTypescript,
  addReact,
  addReactTypes,
  addLess,
  addEslint
}
