'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var Mustache = require('mustache');
var path = require('path');
var prompt = require('prompt');
var pify = require('pify');
var fs = require('fs');
var glob = require('glob');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var Mustache__default = /*#__PURE__*/_interopDefaultLegacy(Mustache);
var prompt__default = /*#__PURE__*/_interopDefaultLegacy(prompt);
var pify__default = /*#__PURE__*/_interopDefaultLegacy(pify);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var glob__default = /*#__PURE__*/_interopDefaultLegacy(glob);

var signale = require('signale');

var _pglob = pify__default['default'](glob__default['default']);

function getUserInput() {
  return _getUserInput.apply(this, arguments);
}

function _getUserInput() {
  _getUserInput = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee() {
    var _yield$prompt$get, name;

    return _regeneratorRuntime__default['default'].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return prompt__default['default'].get({
              properties: {
                name: {
                  required: true,
                  pattern: /^[a-zA-Z\s\-]+$/,
                  message: '必须指定名称',
                  description: '请输入模块名称'
                }
              }
            });

          case 2:
            _yield$prompt$get = _context.sent;
            name = _yield$prompt$get.name;
            return _context.abrupt("return", {
              name: name
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getUserInput.apply(this, arguments);
}

function create(_x) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee2(_ref) {
    var dir, _yield$getUserInput, name, projectPath, fl1, fl2, allFiles;

    return _regeneratorRuntime__default['default'].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dir = _ref.dir;
            _context2.next = 3;
            return getUserInput();

          case 3:
            _yield$getUserInput = _context2.sent;
            name = _yield$getUserInput.name;
            projectPath = path.join(process.cwd, name);

            if (!fs__default['default'].existsSync(projectPath)) {
              _context2.next = 10;
              break;
            }

            signale.warn("".concat(projectPath, "\u76EE\u5F55\u5DF2\u7ECF\u5B58\u5728"));
            create({
              dir: dir
            });
            return _context2.abrupt("return");

          case 10:
            // 创建目录
            fs__default['default'].mkdirSync(projectPath);
            _context2.next = 14;
            return _pglob('**/*.*', {
              cwd: path.join(__dirname, 'templates'),
              realpath: true
            });

          case 14:
            fl1 = _context2.sent;
            _context2.next = 17;
            return _pglob('**/.*', {
              cwd: path.join(__dirname, 'templates'),
              realpath: true
            });

          case 17:
            fl2 = _context2.sent;
            allFiles = [].concat(_toConsumableArray__default['default'](fl1), _toConsumableArray__default['default'](fl2));
            console.log(allFiles);
            allFiles.forEach(function (file) {
              var tplContent = fs__default['default'].readFileSync(file, 'utf-8');
              var context = Mustache__default['default'].render(tplContent, {}); //const parse(file)

              fs__default['default'].writeFileSync(p + '/_config.js', configJsTplContent, 'utf-8');
            });

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _create.apply(this, arguments);
}

exports.default = create;
