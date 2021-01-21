const { join } = require('path')
const cwd = process.cwd()
export default () => {
  return {
    doc: {
      src: './src',
      files: ['src**/*.{md,markdown,mdx}']
    }
  }
}