import { existsSync } from 'fs';
import { join } from 'path';
import { merge } from 'lodash';
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

exports.onCreateWebpackConfig = args => {
  if (useConfig.gatsby && useConfig.gatsby.onCreateWebpackConfig) {
    useConfig.gatsby.onCreateWebpackConfig(args)
  }
}

exports.onCreateBabelConfig = (args) => {
  if (useConfig.gatsby && useConfig.gatsby.onCreateBabelConfig) {
    useConfig.gatsby.onCreateBabelConfig(args)
  }
}