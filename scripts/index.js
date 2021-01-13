import buildLib from './features/lib/build-lib'
import createrLib from './features/lib/creater'
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
        // 创建模板
        if (this.args._[1] === 'create') {
          await createrLib({
            dir: this.cwd
          })
        } else {
          await buildLib.call(this)
        }

        break;
      case 'lib-react':
        console.log('lib-react');
        break;
      case 'lib-vue':
        console.log('lib-vue');
        break;
      default:
        console.log('default');
        break;
    }
  }
}

export {
  Service
}