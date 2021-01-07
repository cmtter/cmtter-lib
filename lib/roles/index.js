'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var workHander = require('./work/work-hander.js');

function workEs(a) {
  return workHander['default'](a) + '-';
}

exports.workHander = workHander['default'];
exports.workEs = workEs;
