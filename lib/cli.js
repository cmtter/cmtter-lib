'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _regeneratorRuntime = require('@babel/runtime/regenerator');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);

var yParser = require('yargs-parser');

var _require = require('fs'),
    existsSync = _require.existsSync;

var signale = require('signale');

var _require2 = require('path'),
    join = _require2.join,
    sep = _require2.sep;

var rimraf = require('rimraf');

var _require3 = require('./index'),
    Service = _require3.Service;

var _require4 = require('./utils/common'),
    COMMAND_CLIS = _require4.COMMAND_CLIS,
    ERROR_MESSAGES = _require4.ERROR_MESSAGES;

var _require5 = require('./utils/utils'),
    getUseEnvs = _require5.getUseEnvs,
    getExistFile = _require5.getExistFile;

var cwd = process.cwd(); // rimraf.sync(join(cwd, 'es'));
// rimraf.sync(join(cwd, 'lib'));
// rimraf.sync(join(cwd, 'dist'));

function formRunType(_args) {
  var type;

  if (_args._[0] == 'lib' || _args._[0] == 'doc' || _args._[0] == 'web') {
    type = _args._[0];
  }

  if (_args._[1] == 'react' || _args._[1] === 'vue') {
    type = "".concat(type, "-").concat(_args._[1]);
  }

  if (COMMAND_CLIS.indexOf(type) < 0) {
    signale.fatal(ERROR_MESSAGES.ERROR_NOTEXSIT_CLI);
    return null;
  }

  return type;
}

var args = yParser(process.argv.slice(2), {
  alias: {
    version: ['v'],
    help: ['h']
  },
  boolean: ['version', 'help', 'autoinstall']
}); // 版本

if (args.version) {
  signale.info('版本信息', require('../package.json').version);
  process.exit(1);
}

var type = formRunType(args);

if (!type) {
  process.exit(1);
}

signale.start("cmtter-lib ".concat(type, "...."));

_asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee() {
  var mode, src, buildPath, useEnvs, pkg, _s;

  return _regeneratorRuntime__default['default'].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          mode = args.mode || 'dev';
          src = args.src || 'src';
          buildPath = join(cwd, src);
          _context.next = 5;
          return getUseEnvs(getExistFile({
            cwd: cwd,
            files: ["".concat(mode, "-env.js")],
            returnRelative: false
          }), {
            mode: mode,
            args: args
          });

        case 5:
          useEnvs = _context.sent;
          pkg = require(join(cwd, 'package.json'));

          if (!existsSync(buildPath)) {
            signale.fatal(new Error("\u9519\u8BEF: ".concat(buildPath, " \u76EE\u5F55\u4E0D\u5B58\u5728!!")));
            process.exit(1);
          }

          _s = new Service({
            cwd: cwd,
            args: args,
            buildPaths: [buildPath],
            useEnvs: useEnvs,
            mode: mode,
            pkg: pkg.default || pkg,
            src: src
          });
          _context.next = 11;
          return _s.run(type);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();

process.on('SIGINT', function () {
  process.exit(1);
});
/**
 * 导出一个空的,用于标记当前是 es module,否者会自定解析 const pkg = require(join(cwd, 'package.json'))
 */

function cli () {}

exports.default = cli;
