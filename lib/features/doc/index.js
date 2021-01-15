'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var child_process = require('child_process');
require('signale');

var rimraf = require('rimraf');
function buildDoc () {
  var cwd = this.cwd,
      src = this.src,
      args = this.args;
  var doczTarget = path.join(cwd, '.docz');

  if (!fs.existsSync(doczTarget)) {
    rimraf.sync(doczTarget);
  }

  mkdirp.sync(doczTarget);
  process.chdir(cwd);
  process.env.SRC_PATH = src;
  return new Promise(function (resolve, reject) {
    var binPath = require.resolve('docz/bin/index.js');

    var params = [args._[1] === 'dev' || args._[1] === 'build' ? args._[1] : 'dev', '--config', path.join(__dirname, 'doczrc.js'), '--port', '8888'];
    var child = child_process.fork(binPath, [].concat(params), {
      cwd: cwd,
      env: process.env
    });
    child.on('exit', function (code) {
      if (code === 1) {
        reject(new Error('文档构建失败'));
      } else {
        resolve();
      }
    });
  });
}

exports.default = buildDoc;
