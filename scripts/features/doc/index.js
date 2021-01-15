import { join } from 'path';
import { existsSync } from 'fs';
const rimraf = require('rimraf');
import { sync as mkdirp } from 'mkdirp';
import { fork } from 'child_process';
import signale from 'signale';

export default function () {
  const { cwd, src, args } = this
  const doczTarget = join(cwd, '.docz')
  if (!existsSync(doczTarget)) {
    rimraf.sync(doczTarget);
  }
  mkdirp(doczTarget)

  process.chdir(cwd)

  process.env.SRC_PATH = src

  return new Promise((resolve, reject) => {
    const binPath = require.resolve('docz/bin/index.js');
    const params = [
      ((args._[1] === 'dev' || args._[1] === 'build') ? args._[1] : 'dev'),
      '--config', join(__dirname, 'doczrc.js'),
      '--port', '8888'
    ]
    const child = fork(binPath, [...params], {
      cwd,
      env: process.env
    })

    child.on('exit', code => {
      if (code === 1) {
        reject(new Error('文档构建失败'));
      } else {
        resolve();
      }
    });
  })
}
