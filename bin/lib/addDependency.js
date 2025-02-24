import { Options } from '../options/options.js'

export function addTypescript(packagejson) {
  packagejson.devDependencies['ts-loader'] = '^9'
  packagejson.devDependencies['typescript'] = '^5'
  packagejson.devDependencies['@types/node'] = '^22'
  return packagejson
}

export function addReact(packagejson) {
  packagejson.dependencies.react = '^19',
  packagejson.dependencies['react-dom'] = '^19'
  packagejson.devDependencies['@babel/preset-react'] = '^7'
  return packagejson
}

export function addReactTypes(packagejson) {
  packagejson.devDependencies['@types/react'] = '^19'
  packagejson.devDependencies['@types/react-dom'] = '^19'
  return packagejson
}

export function addCss(packagejson) {
  packagejson.devDependencies['css-loader'] = '^7'
  packagejson.devDependencies['style-loader'] = '^4'
  packagejson.devDependencies['mini-css-extract-plugin'] = '^2'
  packagejson.devDependencies['postcss'] = '^8'
  packagejson.devDependencies['postcss-import'] = '^16'
  packagejson.devDependencies['postcss-loader'] = '^8'
  packagejson.devDependencies['postcss-preset-env'] = '^10'
  return packagejson
}

export function addLess(packagejson) {
  packagejson.devDependencies['less-loader'] = '^12'
  packagejson.devDependencies['less'] = '^4'
  return packagejson
}

export function addEslint(packagejson, webframe, typescript) {
  packagejson.devDependencies['eslint'] = '^9'
  packagejson.devDependencies['@eslint/js'] = '^9'
  packagejson.devDependencies['globals'] = '^16'
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
