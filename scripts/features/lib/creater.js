
import Mustache from 'mustache'
import { join } from 'path'
import prompt from 'prompt'
import pify from 'pify'
import fs from 'fs'
import glob from 'glob'
const signale = require('signale');

const _pglob = pify(glob)

async function getUserInput() {
  const { name } = await prompt.get({
    properties: {
      name: {
        required: true,
        pattern: /^[a-zA-Z\s\-]+$/,
        message: '必须指定名称',
        description: '请输入模块名称'
      }
    }
  });
  return { name }
}

export default async function create({ dir }) {
  const { name } = await getUserInput()
  const projectPath = join(process.cwd, name)
  if (fs.existsSync(projectPath)) {
    signale.warn(`${projectPath}目录已经存在`)
    create({ dir })
    return
  }
  // 创建目录
  fs.mkdirSync(projectPath)

  const globSrc = '**/*.tpl'
  const fl1 = await _pglob('**/*.*', { cwd: join(__dirname, 'templates'), realpath: true })
  const fl2 = await _pglob('**/.*', { cwd: join(__dirname, 'templates'), realpath: true })
  const allFiles = [...fl1, ...fl2]
  console.log(allFiles);
  allFiles.forEach(file => {
    const tplContent = fs.readFileSync(file, 'utf-8');
    const context = Mustache.render(tplContent, {})
    //const parse(file)
    fs.writeFileSync(p + '/_config.js', configJsTplContent, 'utf-8');
  })
}