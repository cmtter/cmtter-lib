import { existsSync, readdirSync } from 'fs';
import path, { join, sep } from 'path';
import glob from "glob";
import pify from 'pify'
import { merge } from 'lodash';

export function getExistFile({ cwd, files, returnRelative }) {
  for (const file of files) {
    const absFilePath = join(cwd, file);
    if (existsSync(absFilePath)) {
      return returnRelative ? file : absFilePath;
    }
  }
}

export function getBuildPaths(rootPath) {
  let pkgs = null
  const packagesPath = join(rootPath, 'packages')
  const srcPath = join(rootPath, 'src')
  if (!existsSync(packagesPath) && !existsSync(srcPath)) {
    return null
  }
  if (existsSync(packagesPath)) {
    pkgs = readdirSync(packagesPath).map(r => ({
      path: join(packagesPath, r),
      name: r
    }));
  } else {
    pkgs = [{
      path: rootPath,
      name: 'root'
    }]
  }
  return pkgs
}

export function getUseEnvs(rootPath, args, mode) {
  function testDefault(obj) {
    return obj.default || obj;
  }
  const userEnvFile = getExistFile({
    cwd: rootPath,
    files: [`src${sep}${mode}-env.js`],
    returnRelative: false
  })
  const defaultEnvFile = path.resolve(__dirname, '../default-env.js')
  return [defaultEnvFile, ...(userEnvFile ? [userEnvFile] : [])].map(_file => testDefault(require(_file))).reduce((memo, v) => {
    merge(memo, (v instanceof Function ? (v(mode, args) || {}) : v))
    return memo
  }, {})
}