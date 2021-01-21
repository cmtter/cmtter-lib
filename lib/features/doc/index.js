'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var child_process = require('child_process');
var fs = require('fs');
require('rimraf');
var mkdirp = require('mkdirp');
require('signale');

function buildDoc () {
  var cwd = this.cwd,
      src = this.src,
      args = this.args,
      mode = this.mode;
  var doczTarget = path.join(cwd, '.docz');

  if (!fs.existsSync(doczTarget)) {
    mkdirp.sync(doczTarget);
  }

  fs.copyFileSync(path.join(__dirname, 'doczrc.js'), path.join(cwd, '.docz/doczrc.js'));
  fs.copyFileSync(path.join(__dirname, 'gatsby-node.custom.js'), path.join(cwd, 'gatsby-node.js')); //copyFileSync(join(__dirname, 'gatsby-config.custom.js'), join(cwd, 'gatsby-config.js'))
  //copyFileSync(join(__dirname, 'gatsby-config.custom.js'), join(cwd, '.docz/gatsby-config.custom.js'))

  process.chdir(cwd);
  process.env.SRC_PATH = src;
  process.env.CMTTER_MODE = mode;
  process.env.CMTTER_CLI_CWD = path.join(__dirname, '../../../');
  return new Promise(function (resolve, reject) {
    var binPath = require.resolve('docz/bin/index.js');

    console.log('docz的命令脚本路径,', binPath);
    var params = [args._[1] === 'dev' || args._[1] === 'build' ? args._[1] : 'dev', '--config', './docz/doczrc.js', '--port', '8888'];
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
