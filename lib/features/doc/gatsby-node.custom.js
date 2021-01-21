'use strict';

var fs = require('fs');
var path = require('path');
require('lodash');

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

exports.onCreateWebpackConfig = function (args) {
  if (useConfig.gatsby && useConfig.gatsby.onCreateWebpackConfig) {
    useConfig.gatsby.onCreateWebpackConfig(args);
  }
};

exports.onCreateBabelConfig = function (args) {
  if (useConfig.gatsby && useConfig.gatsby.onCreateBabelConfig) {
    useConfig.gatsby.onCreateBabelConfig(args);
  }
};
