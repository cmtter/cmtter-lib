import autoInstall from '@rollup/plugin-auto-install'
import nodeResolve from '@rollup/plugin-node-resolve'
import postcss from '../../rollup/rollup-postcss-plugin';
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
function getDir(format, input, { src }) {
  const _tmp = { es: 'es', cjs: 'lib', umd: 'dist' }
  const urlfragments = input.replace(/\\/g, '/').split('\/')
  let dirs = [_tmp[format]]

  if (urlfragments.includes('packages')) {
    const pkgPos = urlfragments.indexOf('packages')
    dirs.push(urlfragments[pkgPos + 1])
    dirs = dirs.concat(urlfragments.slice(pkgPos + 3, urlfragments.length - 1))
  } else {
    const srcPos = urlfragments.indexOf(src)
    dirs = dirs.concat(urlfragments.slice(srcPos + 1, urlfragments.length - 1))
  }
  return dirs.join('/')
}

export default function createRollupConfig(format, inputs, options) {
  const { useEnvs, src, args } = options

  return inputs.map(input => {
    return {
      input,
      external: id => {
        // // 入口 必须返回 false
        // if (id === input) {
        //   return false
        // }
        // //  用户扩展优先
        // if (useEnvs.rollupExternal && useEnvs.rollupExternal instanceof Function) {
        //   const r = useEnvs.rollupExternal(format, input, id)
        //   if (r === true || r === false) {
        //     return r
        //   }
        // }
        // // 如果存在node_modules、或者非umd模式 则 返回true
        // // args.scne === 'cmtter-lib' 属于特殊标记参数
        // if (id[0] !== '\0' && (id[0] !== '.') && (/node_modules/.test(require.resolve(id))) || args.scne === 'cmtter-lib') {
        //   return true
        // }

        // return false
      },
      output: {
        format: format,
        dir: getDir(format, input, options),
        ...(format !== 'umd' ? { preserveModules: true } : {}),
        ...(format === 'cjs' ? { exports: 'named' } : {}),
        ...(format === 'umd' ? { name: useEnvs.umdExport, globals: useEnvs.umdGlobals } : {})
      },
      plugins: [
        ...((options.args.autoinstall) ? [autoInstall()] : []),
        postcss({
          extract: true
        }),
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
            ...useEnvs.extraBabelPresets
          ],
          plugins: [
            /**
             * 当babelHelpers设置为bundled时, 不能使用@babel/plugin-transform-runtime插件
             */
            ...(format !== 'umd' ? [
              [
                require.resolve('@babel/plugin-transform-runtime'),
                {
                  useESModules: (format === 'es'),
                  version: require('@babel/runtime/package.json').version
                }
              ]
            ] : []),
            require.resolve('babel-plugin-react-require'),
            require.resolve('@babel/plugin-syntax-dynamic-import'),
            require.resolve('@babel/plugin-proposal-export-default-from'),
            require.resolve('@babel/plugin-proposal-export-namespace-from'),
            require.resolve('@babel/plugin-proposal-do-expressions'),
            require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
            require.resolve('@babel/plugin-proposal-optional-chaining'),
            [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
            [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
            ...useEnvs.extraBabelPlugins
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          include: ['**/' + src + '/**/*.*(ts|js|tsx|jsx)'],
          babelHelpers: format !== 'umd' ? 'runtime' : 'bundled',
          exclude: /\/node_modules\//,
          babelrc: false
        }),
        commonjs(),
        nodeResolve({
          mainFields: ['module', 'jsnext:main', 'main'],
          //如果没有指定扩展面，假如./aaaa为./aaaa.jsx 例如在js中引入 import * from './aaaa',那么解析失败
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          // 必须指定解析范围，否则他会将 npm node_module也解析冲 相对路径模式
          resolveOnly: ['/' + src + '/ **/*.*/']
        }),

        ...useEnvs.extraRollupPlugins
      ]
    }
  })
}