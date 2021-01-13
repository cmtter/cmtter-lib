'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _createForOfIteratorHelper = require('@babel/runtime/helpers/createForOfIteratorHelper');
var fs = require('fs');
var path = require('path');
var lodash = require('lodash');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _createForOfIteratorHelper__default = /*#__PURE__*/_interopDefaultLegacy(_createForOfIteratorHelper);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

var defaultEnvFile = path__default['default'].resolve(__dirname, '../default-env.js');
function getExistFile(_ref) {
  var cwd = _ref.cwd,
      files = _ref.files,
      returnRelative = _ref.returnRelative;

  var _iterator = _createForOfIteratorHelper__default['default'](files),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var file = _step.value;
      var absFilePath = path.join(cwd, file);

      if (fs.existsSync(absFilePath)) {
        return returnRelative ? file : absFilePath;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
function getUseEnvs(userEnvFile, _ref2) {
  var mode = _ref2.mode,
      args = _ref2.args;

  function testDefault(obj) {
    return obj.default || obj;
  }

  return [defaultEnvFile].concat(_toConsumableArray__default['default'](userEnvFile ? [userEnvFile] : [])).map(function (_file) {
    return testDefault(require(_file));
  }).reduce(function (memo, v) {
    lodash.merge(memo, v instanceof Function ? v(mode, args) || {} : v);
    return memo;
  }, {});
}

exports.getExistFile = getExistFile;
exports.getUseEnvs = getUseEnvs;
