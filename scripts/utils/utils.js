import { existsSync, readdirSync } from 'fs';
import { join, resolve } from 'path';
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

export function getUseEnvs(rootPath) {
  const pkgs = getBuildPaths(rootPath)
  let i = 0
  let _envs = {}

  function createGlobSrcs(src) {
    return '**/*-env.*(ts|js)'
  }

  function testDefault(obj) {
    return obj.default || obj;
  }

  return new Promise((resolve, reject) => {
    pkgs.forEach(src => {
      glob(createGlobSrcs(src.path), {
        cwd: join(src.path, 'src'),
        realpath: true
      }, (erros, files) => {
        let env = _envs[src.name] || {}
        env = [env, ...files.map(_file => testDefault(require(_file)))].reduce((memo, v) => {
          merge(memo, v)
          return memo
        }, {})
        _envs[src.name] = env
        if (i === pkgs.length - 1) {
          resolve(_envs.root || _envs)
        }
        i++
      })
    })
  })
}