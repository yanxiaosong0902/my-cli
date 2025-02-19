declare module '*.module.css' {
  const cssModuleExport: { [key: string]: string }
  export default cssModuleExport
}

declare module '*.m.less' {
  const cssModuleExport: {
    [className: string]: string
  }
  export = cssModuleExport
}

/** less (without css-module) */
declare module '*.less' {
  const lessExport: undefined
  export = lessExport
}
