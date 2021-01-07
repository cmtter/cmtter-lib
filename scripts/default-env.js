export default function (args) {
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
    umdGlobals: {}
  }
}