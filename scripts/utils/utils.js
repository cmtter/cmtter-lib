import { existsSync } from 'fs';
import path, { join } from 'path';
import { merge } from 'lodash';

const defaultEnvFile = path.resolve(__dirname, '../default-env.js')

export function getExistFile({ cwd, files, returnRelative }) {
  for (const file of files) {
    const absFilePath = join(cwd, file);
    if (existsSync(absFilePath)) {
      return returnRelative ? file : absFilePath;
    }
  }
}

export function getUseEnvs(userEnvFile, { mode, args }) {
  function testDefault(obj) {
    return obj.default || obj;
  }
  return [defaultEnvFile, ...(userEnvFile ? [userEnvFile] : [])].map(_file => testDefault(require(_file))).reduce((memo, v) => {
    merge(memo, (v instanceof Function ? (v(mode, args) || {}) : v))
    return memo
  }, {})
}