import pify from 'pify'
import glob from "glob";
import { sep } from 'path';
import { rollup } from 'rollup';
import copy from 'rollup-plugin-copy';
import createRollupConfig from './create-rollup-config'
const signale = require('signale');
const { getExistFile } = require('../../utils/utils');

const _pglob = pify(glob)

// es build
async function buildEs(files) {
  const { args } = this
  if (args.target && args.target !== 'es') {
    return
  }
  signale.await('构建es....')
  const rollupConfigs = createRollupConfig('es', files, this)
  for (let i = 0; i < rollupConfigs.length; i++) {
    const { output, ...inputOption } = rollupConfigs[i];
    const bundle = await rollup(inputOption)
    await bundle.write(output);
    signale.success(`[es]: ${inputOption.input}`)
  }
}

// cjs build
async function buildLib(files) {
  const { args } = this
  if (args.target && args.target !== 'cjs') {
    return
  }
  signale.await('构建cjs....')
  const rollupConfigs = createRollupConfig('cjs', files, this)
  for (let i = 0; i < rollupConfigs.length; i++) {
    const { output, ...inputOption } = rollupConfigs[i];
    const bundle = await rollup(inputOption)
    await bundle.write(output);
    signale.success(`[cjs]: ${inputOption.input}`)
  }
}

// umd build
async function buildDist(files) {
  const { args } = this
  if (args.target && args.target !== 'umd') {
    return
  }
  signale.await('构建umd....', files)
  const rollupConfigs = createRollupConfig('umd', files, this)
  for (let i = 0; i < rollupConfigs.length; i++) {
    const { output, ...inputOption } = rollupConfigs[i];
    const bundle = await rollup(inputOption)
    await bundle.write(output);
    signale.success(`[umd]: ${inputOption.input}`)
  }
}

async function copyAsserts(format) {
  const dir = { es: 'es', cjs: 'lib', umd: 'dist' }
  const { useEnvs, args, buildPaths, cwd } = this
  if (args.target && args.target !== format) {
    return
  }
  signale.info('拷贝静态资源')
  if (useEnvs.assertGlobs && Array.isArray(useEnvs.assertGlobs)) {
    await copy({
      verbose: true,
      /**
       * 当flatten设置为false时,例如源文件为 root/a/b/c/d.tpl, 那么实际的导出目录是 ${dest}/a/b/c/d.tpl
       */
      flatten: false,
      targets: [
        { src: useEnvs.assertGlobs, dest: `${dir[format]}`, cwd: cwd }
      ]
    }).buildEnd()
  }
}

export default async function build() {
  signale.time()
  const { buildPaths, args } = this
  for (let i = 0; i < buildPaths.length; i++) {
    const buildPath = buildPaths[i];
    const files = await _pglob('**/*.*(ts|js|jsx|tsx)', {
      cwd: buildPath,
      // ignore: ['**/*-env.*(ts|js)'],
      realpath: true
    })

    if (!(files.length > 0)) {
      signale.warn(`构建${buildPath}[忽略`, `未发现任何文件`)
      continue
    }
    await buildEs.call(this, files)
    await copyAsserts.call(this, 'es')
    await buildLib.call(this, files)
    await copyAsserts.call(this, 'cjs')

    // if src/index 不存在, 则忽略umd编译
    const indexFile = getExistFile({
      cwd: buildPath,
      files: ['index.js', 'index.ts'],
      returnRelative: false
    })

    if (!indexFile) {
      signale.warn('创建umd[忽略]', `因为${buildPath}${sep}目录未检测到index.js或index.ts文件`)
      continue
    }
    await buildDist.call(this, [indexFile])
    await copyAsserts.call(this, 'umd')
  }
  signale.timeEnd()
  signale.success('完成!')
}