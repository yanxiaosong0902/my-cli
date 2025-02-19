import jsBeautify from 'js-beautify'
function beautify(file) {
  const options = {
    indent_size: 2,
    end_with_newline: true,
    preserve_newlines: false
  }
  return jsBeautify(file, options)
}

export {
  beautify
}
