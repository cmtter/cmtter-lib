'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _regeneratorRuntime = require('@babel/runtime/regenerator');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var pify = require('pify');
var glob = require('glob');
var path = require('path');
var rollup = require('rollup');
var copy = require('rollup-plugin-copy');
var createRollupConfig = require('./create-rollup-config');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var pify__default = /*#__PURE__*/_interopDefaultLegacy(pify);
var glob__default = /*#__PURE__*/_interopDefaultLegacy(glob);
var copy__default = /*#__PURE__*/_interopDefaultLegacy(copy);
var createRollupConfig__default = /*#__PURE__*/_interopDefaultLegacy(createRollupConfig);

var signale = require('signale');

var _require = require('../../utils/utils'),
    getExistFile = _require.getExistFile;

var _pglob = pify__default['default'](glob__default['default']); // es build


function buildEs(_x) {
  return _buildEs.apply(this, arguments);
} // cjs build


function _buildEs() {
  _buildEs = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee(files) {
    var args, rollupConfigs, i, _rollupConfigs$i, output, inputOption, bundle;

    return _regeneratorRuntime__default['default'].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            args = this.args;

            if (!(args.target && args.target !== 'es')) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            signale.await('构建es....');
            rollupConfigs = createRollupConfig__default['default']('es', files, this);
            i = 0;

          case 6:
            if (!(i < rollupConfigs.length)) {
              _context.next = 17;
              break;
            }

            _rollupConfigs$i = rollupConfigs[i], output = _rollupConfigs$i.output, inputOption = _objectWithoutProperties__default['default'](_rollupConfigs$i, ["output"]);
            _context.next = 10;
            return rollup.rollup(inputOption);

          case 10:
            bundle = _context.sent;
            _context.next = 13;
            return bundle.write(output);

          case 13:
            signale.success("[es]: ".concat(inputOption.input));

          case 14:
            i++;
            _context.next = 6;
            break;

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _buildEs.apply(this, arguments);
}

function buildLib(_x2) {
  return _buildLib.apply(this, arguments);
} // umd build


function _buildLib() {
  _buildLib = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee2(files) {
    var args, rollupConfigs, i, _rollupConfigs$i2, output, inputOption, bundle;

    return _regeneratorRuntime__default['default'].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            args = this.args;

            if (!(args.target && args.target !== 'cjs')) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return");

          case 3:
            signale.await('构建cjs....');
            rollupConfigs = createRollupConfig__default['default']('cjs', files, this);
            i = 0;

          case 6:
            if (!(i < rollupConfigs.length)) {
              _context2.next = 17;
              break;
            }

            _rollupConfigs$i2 = rollupConfigs[i], output = _rollupConfigs$i2.output, inputOption = _objectWithoutProperties__default['default'](_rollupConfigs$i2, ["output"]);
            _context2.next = 10;
            return rollup.rollup(inputOption);

          case 10:
            bundle = _context2.sent;
            _context2.next = 13;
            return bundle.write(output);

          case 13:
            signale.success("[cjs]: ".concat(inputOption.input));

          case 14:
            i++;
            _context2.next = 6;
            break;

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _buildLib.apply(this, arguments);
}

function buildDist(_x3) {
  return _buildDist.apply(this, arguments);
}

function _buildDist() {
  _buildDist = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee3(files) {
    var args, rollupConfigs, i, _rollupConfigs$i3, output, inputOption, bundle;

    return _regeneratorRuntime__default['default'].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            args = this.args;

            if (!(args.target && args.target !== 'umd')) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return");

          case 3:
            signale.await('构建umd....', files);
            rollupConfigs = createRollupConfig__default['default']('umd', files, this);
            i = 0;

          case 6:
            if (!(i < rollupConfigs.length)) {
              _context3.next = 17;
              break;
            }

            _rollupConfigs$i3 = rollupConfigs[i], output = _rollupConfigs$i3.output, inputOption = _objectWithoutProperties__default['default'](_rollupConfigs$i3, ["output"]);
            _context3.next = 10;
            return rollup.rollup(inputOption);

          case 10:
            bundle = _context3.sent;
            _context3.next = 13;
            return bundle.write(output);

          case 13:
            signale.success("[umd]: ".concat(inputOption.input));

          case 14:
            i++;
            _context3.next = 6;
            break;

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _buildDist.apply(this, arguments);
}

function copyAsserts(_x4) {
  return _copyAsserts.apply(this, arguments);
}

function _copyAsserts() {
  _copyAsserts = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee4(format) {
    var dir, useEnvs, args, cwd;
    return _regeneratorRuntime__default['default'].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            dir = {
              es: 'es',
              cjs: 'lib',
              umd: 'dist'
            };
            useEnvs = this.useEnvs, args = this.args, this.buildPaths, cwd = this.cwd;

            if (!(args.target && args.target !== format)) {
              _context4.next = 4;
              break;
            }

            return _context4.abrupt("return");

          case 4:
            signale.info('拷贝静态资源');

            if (!(useEnvs.assertGlobs && Array.isArray(useEnvs.assertGlobs))) {
              _context4.next = 8;
              break;
            }

            _context4.next = 8;
            return copy__default['default']({
              verbose: true,

              /**
               * 当flatten设置为false时,例如源文件为 root/a/b/c/d.tpl, 那么实际的导出目录是 ${dest}/a/b/c/d.tpl
               */
              flatten: false,
              targets: [{
                src: useEnvs.assertGlobs,
                dest: "".concat(dir[format]),
                cwd: cwd
              }]
            }).buildEnd();

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return _copyAsserts.apply(this, arguments);
}

function build() {
  return _build.apply(this, arguments);
}

function _build() {
  _build = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee5() {
    var buildPaths, i, buildPath, files, indexFile;
    return _regeneratorRuntime__default['default'].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            signale.time();
            buildPaths = this.buildPaths, this.args;
            i = 0;

          case 3:
            if (!(i < buildPaths.length)) {
              _context5.next = 30;
              break;
            }

            buildPath = buildPaths[i];
            _context5.next = 7;
            return _pglob('**/*.*(ts|js|jsx|tsx)', {
              cwd: buildPath,
              // ignore: ['**/*-env.*(ts|js)'],
              realpath: true
            });

          case 7:
            files = _context5.sent;

            if (files.length > 0) {
              _context5.next = 11;
              break;
            }

            signale.warn("\u6784\u5EFA".concat(buildPath, "[\u5FFD\u7565"), "\u672A\u53D1\u73B0\u4EFB\u4F55\u6587\u4EF6");
            return _context5.abrupt("continue", 27);

          case 11:
            _context5.next = 13;
            return buildEs.call(this, files);

          case 13:
            _context5.next = 15;
            return copyAsserts.call(this, 'es');

          case 15:
            _context5.next = 17;
            return buildLib.call(this, files);

          case 17:
            _context5.next = 19;
            return copyAsserts.call(this, 'cjs');

          case 19:
            // if src/index 不存在, 则忽略umd编译
            indexFile = getExistFile({
              cwd: buildPath,
              files: ['index.js', 'index.ts'],
              returnRelative: false
            });

            if (indexFile) {
              _context5.next = 23;
              break;
            }

            signale.warn('创建umd[忽略]', "\u56E0\u4E3A".concat(buildPath).concat(path.sep, "\u76EE\u5F55\u672A\u68C0\u6D4B\u5230index.js\u6216index.ts\u6587\u4EF6"));
            return _context5.abrupt("continue", 27);

          case 23:
            _context5.next = 25;
            return buildDist.call(this, [indexFile]);

          case 25:
            _context5.next = 27;
            return copyAsserts.call(this, 'umd');

          case 27:
            i++;
            _context5.next = 3;
            break;

          case 30:
            signale.timeEnd();
            signale.success('完成!');

          case 32:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));
  return _build.apply(this, arguments);
}

exports.default = build;
