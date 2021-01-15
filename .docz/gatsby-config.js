const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/docs',

  siteMetadata: {
    title: 'cmtter-lib doc',
    description: '前端集成化开发及构建工具',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './scripts',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [
          '介绍',
          { name: '构建', menu: ['基础库', 'React组件'] },
          { name: 'Web', menu: ['开始', '规范', '配置', '提效开发'] },
        ],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        config: 'D:\\cmtter-lib-master\\scripts\\features\\doc\\doczrc.js',
        port: 8888,
        p: 8888,
        root: 'D:\\cmtter-lib-master\\.docz',
        base: '/docs',
        source: './',
        'gatsby-root': null,
        files: ['scripts/**/*.{md,markdown,mdx}'],
        public: '/public',
        dest: '/docs',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        title: 'cmtter-lib doc',
        description: '前端集成化开发及构建工具',
        host: 'localhost',
        separator: '-',
        paths: {
          root: 'D:\\cmtter-lib-master',
          templates:
            'D:\\cmtter-lib-master\\node_modules\\docz-core\\dist\\templates',
          docz: 'D:\\cmtter-lib-master\\.docz',
          cache: 'D:\\cmtter-lib-master\\.docz\\.cache',
          app: 'D:\\cmtter-lib-master\\.docz\\app',
          appPackageJson: 'D:\\cmtter-lib-master\\package.json',
          appTsConfig: 'D:\\cmtter-lib-master\\tsconfig.json',
          gatsbyConfig: 'D:\\cmtter-lib-master\\gatsby-config.js',
          gatsbyBrowser: 'D:\\cmtter-lib-master\\gatsby-browser.js',
          gatsbyNode: 'D:\\cmtter-lib-master\\gatsby-node.js',
          gatsbySSR: 'D:\\cmtter-lib-master\\gatsby-ssr.js',
          importsJs: 'D:\\cmtter-lib-master\\.docz\\app\\imports.js',
          rootJs: 'D:\\cmtter-lib-master\\.docz\\app\\root.jsx',
          indexJs: 'D:\\cmtter-lib-master\\.docz\\app\\index.jsx',
          indexHtml: 'D:\\cmtter-lib-master\\.docz\\app\\index.html',
          db: 'D:\\cmtter-lib-master\\.docz\\app\\db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
