import pify from 'pify'
import glob from "glob";
import { existsSync, readdirSync } from 'fs';
import { join, resolve, sep } from 'path';
const signale = require('signale');
const { getExistFile } = require('../../utils/utils');

const _pglob = pify(glob)

// es build
async function buildEs(files) {

}

// cjs build
async function buildLib(files) {

}

// umd build
async function buildDist(file) {

}

export default async function build() {
  const { buildPaths } = this
  for (let i = 0; i < buildPaths.length; i++) {
    const buildPath = buildPaths[i];
    const files = await _pglob('**/*.*(ts|js|jsx|tsx)', {
      cwd: join(buildPath.path, 'src'),
      ignore: ['**/*-env.*(ts|js)']
    })

    if (!(files.length > 0)) {
      signale.warn(`构建package[忽略${buildPath.name}]`, `未发现任何文件`)
      continue
    }
    await buildEs.call(this, files)
    await buildLib.call(this, files)

    // if src/index 不存在, 则忽略umd编译
    const indexFile = getExistFile({
      cwd: join(buildPath.path, 'src'),
      files: ['index12.js'],
      returnRelative: false
    })

    if (!indexFile) {
      signale.warn('创建umd[忽略]', `因为${join(buildPath.path, 'src')}${sep}目录未检测到index.js文件`)
      continue
    }
    await buildDist.call(this, indexFile)
  }
}