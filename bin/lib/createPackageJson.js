function createPackageJson(config) {
  return JSON.stringify(config, null, 2)
}

export {
  createPackageJson
}
