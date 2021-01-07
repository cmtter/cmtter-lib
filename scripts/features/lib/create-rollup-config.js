import autoInstall from '@rollup/plugin-auto-install'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { parse, join } from 'path'
function getDir(format, input) {
  const _tmp = { es: 'es', cjs: 'lib', umd: 'dist' }
  const urlfragments = input.replace(/\\/g, '/').split('\/')
  let dirs = [_tmp[format]]
  if (urlfragments.includes('packages')) {
    const pkgPos = urlfragments.indexOf('packages')
    dirs.push(urlfragments[pkgPos + 1])
    dirs = dirs.concat(urlfragments.slice(pkgPos + 3, urlfragments.length - 1))
  }
  return dirs.join('/')
}

export default function createRollupConfig(format, inputs, umdName) {
  return inputs.map(input => {
    return {
      input,
      external: id => {
        return /node_modules/.test(id)
      },
      output: {
        format: format,
        dir: getDir(format, input),
        ...(format !== 'umd' ? { preserveModules: true } : {}),
        ...(format === 'cjs' ? { exports: 'named' } : {}),
        ...(format === 'umd' ? { name: umdName } : {})
      },
      plugins: [
        json(),
        autoInstall(),
        commonjs(),
        babel({
          presets: [
            /**
             * @babel/preset-typescript 必须要配合tsconfig.json
             */
            require.resolve('@babel/preset-typescript'),
            [
              require.resolve('@babel/preset-env'), {
                targets: {
                  browsers: ['last 2 versions', 'IE 10']
                }
              }
            ],
            require.resolve('@babel/preset-react'),
          ],
          plugins: [
            [
              require.resolve('@babel/plugin-transform-runtime'),
              {
                useESModules: true,
                version: require('@babel/runtime/package.json').version
              }
            ],
            require.resolve('babel-plugin-react-require'),
            require.resolve('@babel/plugin-syntax-dynamic-import'),
            require.resolve('@babel/plugin-proposal-export-default-from'),
            require.resolve('@babel/plugin-proposal-export-namespace-from'),
            require.resolve('@babel/plugin-proposal-do-expressions'),
            require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
            require.resolve('@babel/plugin-proposal-optional-chaining'),
            [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
            [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }]
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          include: ['**/src/**/*.*(ts|js|tsx|jsx)'],
          babelHelpers: 'runtime',
          exclude: /\/node_modules\//,
          babelrc: false
        }),
        nodeResolve({
          mainFields: ['module', 'jsnext:main', 'main'],
          //如果没有指定扩展面，假如./aaaa为./aaaa.jsx 例如在js中引入 import * from './aaaa',那么解析失败
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          // 必须指定解析范围，否则他会将 npm node_module也解析冲 相对路径模式
          resolveOnly: ['/packages/ ** /src/ **/*.*/', '/src/ **/*.*/']
        }),
      ]
    }
  })
}