'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _regeneratorRuntime = require('@babel/runtime/regenerator');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var buildLib = require('./features/lib/build-lib');
var createrLib = require('./features/lib/creater');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var buildLib__default = /*#__PURE__*/_interopDefaultLegacy(buildLib);
var createrLib__default = /*#__PURE__*/_interopDefaultLegacy(createrLib);

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
                _context.next = _context.t0 === 'lib' ? 3 : _context.t0 === 'lib-react' ? 11 : _context.t0 === 'lib-vue' ? 13 : 15;
                break;

              case 3:
                if (!(this.args._[1] === 'create')) {
                  _context.next = 8;
                  break;
                }

                _context.next = 6;
                return createrLib__default['default']({
                  dir: this.cwd
                });

              case 6:
                _context.next = 10;
                break;

              case 8:
                _context.next = 10;
                return buildLib__default['default'].call(this);

              case 10:
                return _context.abrupt("break", 17);

              case 11:
                console.log('lib-react');
                return _context.abrupt("break", 17);

              case 13:
                console.log('lib-vue');
                return _context.abrupt("break", 17);

              case 15:
                console.log('default');
                return _context.abrupt("break", 17);

              case 17:
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
