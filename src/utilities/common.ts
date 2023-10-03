const fs = require('fs')

// const initConsole = (isVerbose: boolean) => ({
//   ...console,
//   v: Object.keys(console).reduce(
//     (final, k) => ({
//       ...final,
//       ...(typeof console[k] === 'function' ? { [k]: (props) => isVerbose && console[k](props) } : { [k]: console[k] }),
//     }),
//     {}
//   ),
// })

const requireFile = (path: string) => {
  const fullPath = `${process.cwd()}/${path}`
  try {
    if (fs.existsSync(fullPath)) {
      return require(fullPath)
    }
  } catch (err) {
    console.error(err)
  }
  return {}
}

const txt = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
}

module.exports = {
  // initConsole,
  requireFile,
  txt,
}
