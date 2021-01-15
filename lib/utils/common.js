'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 可用命令
 */
var COMMAND_CLIS = ['lib', 'lib-create', 'doc', 'doc-deploy', 'web', 'web-build'];
/**
 * 错误信息
 */

var ERROR_MESSAGES = {
  ERROR_NOTEXSIT_CLI: new Error("\n\u811A\u672C\u9519\u8BEF!!!!\n\u8BF7\u8FD0\u884C\u4EE5\u4E0B\u547D\u4EE4:\ncmtter-lib lib\ncmtter-lib lib create\ncmtter-lib doc\ncmtter-lib doc deploy\ncmtter-lib web build\n")
};

exports.COMMAND_CLIS = COMMAND_CLIS;
exports.ERROR_MESSAGES = ERROR_MESSAGES;
