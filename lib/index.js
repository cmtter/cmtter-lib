'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _regeneratorRuntime = require('@babel/runtime/regenerator');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var buildLib = require('./features/lib/build-lib.js');
var creater = require('./features/lib/creater.js');
var index = require('./features/doc/index.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);

var _require = require('fs'),
    existsSync = _require.existsSync;

var _require2 = require('path'),
    join = _require2.join;

var rimraf = require('rimraf');

var signale = require('signale');

var Service = /*#__PURE__*/function () {
  function Service(_ref) {
    var cwd = _ref.cwd,
        args = _ref.args,
        buildPaths = _ref.buildPaths,
        useEnvs = _ref.useEnvs,
        mode = _ref.mode,
        pkg = _ref.pkg,
        src = _ref.src;

    _classCallCheck__default['default'](this, Service);

    this.cwd = cwd;
    this.args = args;
    this.buildPaths = buildPaths;
    this.useEnvs = useEnvs;
    this.mode = mode;
    this.pkg = pkg;
    this.src = src;
  }

  _createClass__default['default'](Service, [{
    key: "run",
    value: function () {
      var _run = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee(type) {
        return _regeneratorRuntime__default['default'].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = type;
                _context.next = _context.t0 === 'lib' ? 3 : _context.t0 === 'lib-create' ? 10 : _context.t0 === 'doc' ? 13 : _context.t0 === 'doc-build' ? 16 : _context.t0 === 'doc-deploy' ? 19 : _context.t0 === 'web' ? 21 : _context.t0 === 'web-build' ? 23 : 25;
                break;

              case 3:
                rimraf.sync(join(this.cwd, 'es'));
                rimraf.sync(join(this.cwd, 'lib'));
                rimraf.sync(join(this.cwd, 'dist'));

                if (!existsSync(this.buildPaths[0])) {
                  signale.fatal(new Error("\u9519\u8BEF: ".concat(this.buildPaths[0], " \u76EE\u5F55\u4E0D\u5B58\u5728!!")));
                  process.exit(1);
                }

                _context.next = 9;
                return buildLib['default'].call(this);

              case 9:
                return _context.abrupt("break", 26);

              case 10:
                _context.next = 12;
                return creater['default']({
                  dir: this.cwd
                });

              case 12:
                return _context.abrupt("break", 26);

              case 13:
                _context.next = 15;
                return index['default'].call(this);

              case 15:
                return _context.abrupt("break", 26);

              case 16:
                _context.next = 18;
                return index['default'].call(this);

              case 18:
                return _context.abrupt("break", 26);

              case 19:
                console.log('doc-deploy');
                return _context.abrupt("break", 26);

              case 21:
                console.log('web');
                return _context.abrupt("break", 26);

              case 23:
                console.log('web-build');
                return _context.abrupt("break", 26);

              case 25:
                return _context.abrupt("break", 26);

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run(_x) {
        return _run.apply(this, arguments);
      }

      return run;
    }()
  }]);

  return Service;
}();

exports.Service = Service;
