import buildLib from './features/lib/build-lib'

class Service {
  constructor({ cwd, args, buildPaths, useEnvs, mode }) {
    this.cwd = cwd
    this.args = args
    this.buildPaths = buildPaths
    this.useEnvs = useEnvs
    this.mode = mode
  }

  async run(type) {
    switch (type) {
      case 'lib':
        await buildLib.call(this)
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