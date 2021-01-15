'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var require$$0 = require('@babel/register');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

var babelNodeRegister = function (rootPath) {
  require$$0__default['default']({
    presets: [require.resolve('@umijs/babel-preset-umi/node')],
    ignore: [/node_modules/],
    only: [function (filePath) {
      return filePath.startsWith(rootPath);
    }],
    extensions: ['.jsx', '.js', '.ts', '.tsx'],
    babelrc: false,
    cache: false
  });
};

exports.default = babelNodeRegister;
