#!/usr/bin/env node
require('../scripts/utils/babel-node-register')(process.cwd())
const yParser = require('yargs-parser');
const signale = require('signale');
const { join } = require('path');
const rimraf = require('rimraf');
const { Service } = require('../scripts/index');
const { COMMAND_CLIS, ERROR_MESSAGES } = require('../scripts/utils/common')
const { getBuildPaths, getUseEnvs } = require('../scripts/utils/utils');
const { await } = require('signale');

const cwd = process.cwd()

rimraf.sync(join(cwd, 'es'));
rimraf.sync(join(cwd, 'lib'));
rimraf.sync(join(cwd, 'dist'));

function formRunType(_args) {
  let type
  if (_args._[0] == 'lib' || _args._[0] == 'doc' || _args._[0] == 'web') {
    type = _args._[0]
  }
  if (_args._[1] == 'react' || _args._[1] === 'vue') {
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
  boolean: ['version', 'help'],
})
const type = formRunType(args)
if (!type) {
  process.exit(1)
}

signale.start(`cmtter-lib ${type}....`);
(async () => {
  const buildPaths = getBuildPaths(cwd)
  const useEnvs = await getUseEnvs(cwd)
  const mode = args.mode || 'dev'

  if (!buildPaths) {
    signale.fatal(ERROR_MESSAGES.ERROR_PROJECT_DIR_CLI)
    process.exit(1)
  }
  const _s = new Service({ cwd, args, buildPaths, useEnvs, mode });
  await _s.run(type)
})()

process.on('SIGINT', () => {
  process.exit(1)
});