const { existsSync } = require('fs');
const { join } = require('path');
const { merge } = require('lodash');
const cwd = process.cwd()
function testDefault(mod) {
  return mod.default || mod
}

function registerBabel() {
  testDefault(require(join(process.env.CMTTER_CLI_CWD, 'lib/utils/babel-node-register.js')))();
}
function getUseConfig() {
  const { getUseEnvs } = require(join(process.env.CMTTER_CLI_CWD, 'lib/utils/utils'))
  let _cwd = cwd
  if (cwd.endsWith('.docz')) {
    _cwd = _cwd.substring(0, cwd.length - '.docz'.length)
  }
  const useConfigPath = join(_cwd, `${process.env.CMTTER_MODE}-env.js`)
  return getUseEnvs(existsSync(useConfigPath) ? useConfigPath : null, { mode: process.env.CMTTER_MODE, args: {} })
}

registerBabel()
const useConfig = getUseConfig()
const config = merge({
  src: '/' + (process.env.SRC_PATH || 'src'),
  files: ['/' + (process.env.SRC_PATH || 'src') + '/**/*.{md,markdown,mdx}'],
  title: 'cmtter-lib doc',
  dest: '/docs'
}, (useConfig.doc || {}))

export default config