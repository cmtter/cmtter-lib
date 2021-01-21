'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');

function defaultEnv (args) {
  return {
    /**
     * 扩展 rollup 插件
     */
    extraRollupPlugins: [],

    /**
     * 扩展 rollup  External
     */
    rollupExternal: null,

    /**
     * 扩展 babel 插件
     */
    extraBabelPlugins: [],

    /**
     * 扩展 babel 插件集
     */
    extraBabelPresets: [],

    /**
     * 配置umd模式的导出名称
     */
    umdExport: 'cmtter-lib',

    /**
     * 配置umd模式,依赖的全局变量
     */
    umdGlobals: {},

    /**
     * 静态资源配置，构建时会自动将这些静态资源copy到指定目录
     */
    assertGlobs: null,
    doc: {},
    gatsby: {
      onCreateWebpackConfig: function onCreateWebpackConfig(args) {// const cwd = process.cwd()
        // args.actions.setWebpackConfig({
        //   resolve: {
        //     modules: [path.join(__dirname, '../node_modules'), path.join(cwd, 'node_modules'), 'node_modules'],
        //     alias: {
        //       '@@@': path.resolve(cwd, 'src/'),
        //     },
        //   },
        // })
      },
      onCreateBabelConfig: function onCreateBabelConfig(_ref) {
        var actions = _ref.actions;
        actions.setBabelPreset({
          name: "@babel/preset-react"
        });
        actions.setBabelPlugin({
          name: "@babel/plugin-syntax-jsx",
          options: {}
        });
      }
    }
  };
}

exports.default = defaultEnv;
