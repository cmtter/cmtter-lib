
export default {
  title: 'cmtter-lib doc',
  src: './' + (process.env.SRC_PATH || 'src'),
  files: [(process.env.SRC_PATH || 'src') + '/**/*.{md,markdown,mdx}'],
  dest: '/docs',
  base: '/cmtter-lib',
  menu: [
    '介绍',
    { name: '构建', menu: ['基础库', 'React组件'] },
    { name: 'Web', menu: ['开始', '规范', '配置', '提效开发'] }
  ]
}