import buildLib from './features/lib/build-lib'
import createrLib from './features/lib/creater'
import buildDoc from './features/doc/index'
const { existsSync } = require('fs');
const { join } = require('path');
const rimraf = require('rimraf');
const signale = require('signale')
class Service {
  constructor({ cwd, args, buildPaths, useEnvs, mode, pkg, src }) {
    this.cwd = cwd
    this.args = args
    this.buildPaths = buildPaths
    this.useEnvs = useEnvs
    this.mode = mode
    this.pkg = pkg
    this.src = src
  }

  async run(type) {
    switch (type) {
      case 'lib':
        rimraf.sync(join(this.cwd, 'es'));
        rimraf.sync(join(this.cwd, 'lib'));
        rimraf.sync(join(this.cwd, 'dist'));
        if (!existsSync(this.buildPaths[0])) {
          signale.fatal(new Error(`错误: ${this.buildPaths[0]} 目录不存在!!`))
          process.exit(1)
        }
        await buildLib.call(this)
        break;
      case 'lib-create':
        await createrLib({ dir: this.cwd })
        break;
      case 'doc':
        await buildDoc.call(this)
        break;
      case 'doc-build':
        await buildDoc.call(this)
        break;
      case 'doc-deploy':
        console.log('doc-deploy');
        break;
      case 'web':
        console.log('web');
        break;
      case 'web-build':
        console.log('web-build');
        break;
      default:
        break;
    }
  }
}

export {
  Service
}