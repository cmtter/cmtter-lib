export default function (args) {
  return {
    /**
     * glob path配置规则，必须包含源码的根目录
     */
    assertGlobs: ['scripts/**/*.tpl', 'scripts**/.*.tpl']
  }
}