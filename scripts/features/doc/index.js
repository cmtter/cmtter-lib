import { join } from 'path';
import { existsSync, copyFileSync } from 'fs';
import rimraf from 'rimraf';
import { sync as mkdirp } from 'mkdirp';
import { fork } from 'child_process';
import signale from 'signale';

export default function () {
  const { cwd, src, args, mode } = this
  const doczTarget = join(cwd, '.docz')
  if (!existsSync(doczTarget)) {
    mkdirp(doczTarget)
  }

  copyFileSync(join(__dirname, 'doczrc.js'), join(cwd, '.docz/doczrc.js'))
  copyFileSync(join(__dirname, 'gatsby-node.custom.js'), join(cwd, 'gatsby-node.js'))
  //copyFileSync(join(__dirname, 'gatsby-config.custom.js'), join(cwd, 'gatsby-config.js'))
  //copyFileSync(join(__dirname, 'gatsby-config.custom.js'), join(cwd, '.docz/gatsby-config.custom.js'))
  process.chdir(cwd)
  process.env.SRC_PATH = src
  process.env.CMTTER_MODE = mode

  process.env.CMTTER_CLI_CWD = join(__dirname, '../../../')
  return new Promise((resolve, reject) => {
    const binPath = require.resolve('docz/bin/index.js');
    console.log('docz的命令脚本路径,', binPath);
    const params = [
      ((args._[1] === 'dev' || args._[1] === 'build') ? args._[1] : 'dev'),
      '--config', './docz/doczrc.js',
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
