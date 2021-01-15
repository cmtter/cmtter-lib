const yParser = require('yargs-parser');
const { existsSync } = require('fs');
const signale = require('signale');
const { join, sep } = require('path');
const rimraf = require('rimraf');
const { Service } = require('./index');
const { COMMAND_CLIS, ERROR_MESSAGES } = require('./utils/common')
const { getUseEnvs, getExistFile } = require('./utils/utils');
const cwd = process.cwd()

const babelRegister = require('./utils/babel-node-register');
(babelRegister.default || babelRegister)(cwd)

function formRunType(_args) {
  let type
  if (_args._[0] == 'lib' || _args._[0] == 'doc' || _args._[0] == 'web') {
    type = _args._[0]
  }
  if (_args._[1]) {
    type = `${type}-${_args._[1]}`
  }
  if (COMMAND_CLIS.indexOf(type) < 0) {
    signale.fatal(ERROR_MESSAGES.ERROR_NOTEXSIT_CLI)
    return null
  }
  return type
}

const args = yParser(process.argv.slice(2), {
  alias: {
    version: ['v'],
    help: ['h'],
  },
  boolean: ['version', 'help', 'autoinstall'],
})

// 版本
if (args.version) {
  signale.info('版本信息', require('../package.json').version)
  process.exit(1)
}

const type = formRunType(args)

if (!type) {
  process.exit(1)
}

signale.start(`cmtter-lib ${type}....`);
rimraf.sync(join(cwd, 'es'));
rimraf.sync(join(cwd, 'lib'));
rimraf.sync(join(cwd, 'dist'));
(async () => {
  const mode = args.mode || 'dev'
  const src = args.src || 'src'
  const buildPath = join(cwd, src)
  let useEnvs = await getUseEnvs(getExistFile({ cwd, files: [`${mode}-env.js`], returnRelative: false }), { mode, args });
  const pkg = existsSync(join(cwd, 'package.json')) ? require(join(cwd, 'package.json')) : {}
  const _s = new Service({ cwd, args, buildPaths: [buildPath], useEnvs, mode, pkg: (pkg.default || pkg), src });
  await _s.run(type)
})()

process.on('SIGINT', () => {
  process.exit(1)
});

/**
 * 导出一个空的,用于标记当前是 es module,否者会自定解析 const pkg = require(join(cwd, 'package.json'))
 */
export default function () { }