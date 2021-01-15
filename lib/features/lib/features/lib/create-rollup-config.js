'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var autoInstall = require('@rollup/plugin-auto-install');
var nodeResolve = require('@rollup/plugin-node-resolve');
var rollupPostcssPlugin = require('../../rollup/rollup-postcss-plugin.js');
var commonjs = require('@rollup/plugin-commonjs');
var babel = require('@rollup/plugin-babel');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _objectSpread__default = /*#__PURE__*/_interopDefaultLegacy(_objectSpread);
var autoInstall__default = /*#__PURE__*/_interopDefaultLegacy(autoInstall);
var nodeResolve__default = /*#__PURE__*/_interopDefaultLegacy(nodeResolve);
var commonjs__default = /*#__PURE__*/_interopDefaultLegacy(commonjs);
var babel__default = /*#__PURE__*/_interopDefaultLegacy(babel);

function getDir(format, input, _ref) {
  var src = _ref.src;
  var _tmp = {
    es: 'es',
    cjs: 'lib',
    umd: 'dist'
  };
  var urlfragments = input.replace(/\\/g, '/').split('\/');
  var dirs = [_tmp[format]];

  if (urlfragments.includes('packages')) {
    var pkgPos = urlfragments.indexOf('packages');
    dirs.push(urlfragments[pkgPos + 1]);
    dirs = dirs.concat(urlfragments.slice(pkgPos + 3, urlfragments.length - 1));
  } else {
    var srcPos = urlfragments.indexOf(src);
    dirs = dirs.concat(urlfragments.slice(srcPos + 1, urlfragments.length - 1));
  }

  return dirs.join('/');
}

function createRollupConfig(format, inputs, options) {
  var useEnvs = options.useEnvs,
      src = options.src,
      args = options.args;
  return inputs.map(function (input) {
    return {
      input: input,
      external: function external(id) {// // 入口 必须返回 false
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
      output: _objectSpread__default['default'](_objectSpread__default['default'](_objectSpread__default['default']({
        format: format,
        dir: getDir(format, input, options)
      }, format !== 'umd' ? {
        preserveModules: true
      } : {}), format === 'cjs' ? {
        exports: 'named'
      } : {}), format === 'umd' ? {
        name: useEnvs.umdExport,
        globals: useEnvs.umdGlobals
      } : {}),
      plugins: [].concat(_toConsumableArray__default['default'](options.args.autoinstall ? [autoInstall__default['default']()] : []), [rollupPostcssPlugin['default']({
        extract: true
      }), babel__default['default']({
        presets: [
        /**
         * @babel/preset-typescript 必须要配合tsconfig.json
         */
        require.resolve('@babel/preset-typescript'), [require.resolve('@babel/preset-env'), {
          targets: {
            browsers: ['last 2 versions', 'IE 10']
          }
        }], require.resolve('@babel/preset-react')].concat(_toConsumableArray__default['default'](useEnvs.extraBabelPresets)),
        plugins: [].concat(_toConsumableArray__default['default'](format !== 'umd' ? [[require.resolve('@babel/plugin-transform-runtime'), {
          useESModules: format === 'es',
          version: require('@babel/runtime/package.json').version
        }]] : []), [require.resolve('babel-plugin-react-require'), require.resolve('@babel/plugin-syntax-dynamic-import'), require.resolve('@babel/plugin-proposal-export-default-from'), require.resolve('@babel/plugin-proposal-export-namespace-from'), require.resolve('@babel/plugin-proposal-do-expressions'), require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'), require.resolve('@babel/plugin-proposal-optional-chaining'), [require.resolve('@babel/plugin-proposal-decorators'), {
          legacy: true
        }], [require.resolve('@babel/plugin-proposal-class-properties'), {
          loose: true
        }]], _toConsumableArray__default['default'](useEnvs.extraBabelPlugins)),
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        include: ['**/' + src + '/**/*.*(ts|js|tsx|jsx)'],
        babelHelpers: format !== 'umd' ? 'runtime' : 'bundled',
        exclude: /\/node_modules\//,
        babelrc: false
      }), commonjs__default['default'](), nodeResolve__default['default']({
        mainFields: ['module', 'jsnext:main', 'main'],
        //如果没有指定扩展面，假如./aaaa为./aaaa.jsx 例如在js中引入 import * from './aaaa',那么解析失败
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        // 必须指定解析范围，否则他会将 npm node_module也解析冲 相对路径模式
        resolveOnly: ['/' + src + '/ **/*.*/']
      })], _toConsumableArray__default['default'](useEnvs.extraRollupPlugins))
    };
  });
}

exports.default = createRollupConfig;
