'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');
var path = require('path');
var lodash = require('lodash');

var cwd = process.cwd();

function testDefault(mod) {
  return mod.default || mod;
}

function registerBabel() {
  testDefault(require(path.join(process.env.CMTTER_CLI_CWD, 'lib/utils/babel-node-register.js')))();
}

function getUseConfig() {
  var _require = require(path.join(process.env.CMTTER_CLI_CWD, 'lib/utils/utils')),
      getUseEnvs = _require.getUseEnvs;

  var _cwd = cwd;

  if (cwd.endsWith('.docz')) {
    _cwd = _cwd.substring(0, cwd.length - '.docz'.length);
  }

  var useConfigPath = path.join(_cwd, "".concat(process.env.CMTTER_MODE, "-env.js"));
  return getUseEnvs(fs.existsSync(useConfigPath) ? useConfigPath : null, {
    mode: process.env.CMTTER_MODE,
    args: {}
  });
}

registerBabel();
var useConfig = getUseConfig();
var config = lodash.merge({
  src: '/' + (process.env.SRC_PATH || 'src'),
  files: ['/' + (process.env.SRC_PATH || 'src') + '/**/*.{md,markdown,mdx}'],
  title: 'cmtter-lib doc',
  dest: '/docs'
}, useConfig.doc || {});

exports.default = config;
