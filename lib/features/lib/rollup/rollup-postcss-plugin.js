'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var postcss$1 = require('rollup-plugin-postcss');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var postcss__default = /*#__PURE__*/_interopDefaultLegacy(postcss$1);

//import fs from 'fs'
//const readFile = (file) => new Promise((fulfil, reject) => fs.readFile(file, 'utf-8', (err, contents) => (err ? reject(err) : fulfil(contents))));

function postcss (options) {
  return postcss__default['default'](options); // const cssFiles = {}
  // const postcssPluginInstance = postcss(options)
  // let _bundle = null
  // let _outOption = null
  // const findRealCssFile = (id, returnObj = false) => {
  //   const t = Object.keys(cssFiles).map(r => cssFiles[r]).filter(r => {
  //     return (r.source[0] === '\0' ? r.source.slice(0) : r.source) === id
  //   })
  //   if (t.length > 0) {
  //     return returnObj === true ? t[0] : t[0].file
  //   }
  //   return null
  // }
  // const _cssFilter = (id) => (id && (id.endsWith('.scss') || id.endsWith('.less') || id.endsWith('.css') || id.endsWith('.sass')))
  // return {
  //   name: 'cmtter-posstcss',
  //   resolveId(importee, importer) {
  //     if (importer && _cssFilter(importee)) {
  //       const target = resolve(parse(importer).dir, importee)
  //       const targetParse = parse(target)
  //       cssFiles[target] = {
  //         file: target,
  //         importer: importer,
  //         isCss: targetParse.ext === '.css',
  //         isScss: targetParse.ext === '.scss' || targetParse.ext === '.sass',
  //         isLess: targetParse.ext === '.less',
  //         source: `\0${join(targetParse.dir, targetParse.name)}.css`
  //       }
  //       return false
  //     }
  //     return null
  //   },
  //   async generateBundle(options_, bundle) {
  //     _bundle = bundle
  //     _outOption = options_
  //   },
  //   async buildEnd(error) {
  //     if (error) {
  //       return
  //     }
  //     // 编译样式
  //     const _proccess = async (target) => {
  //       postcssPluginInstance.transform.bind(this)()
  //     }
  //   }
  //   async load(id) {
  //     if (!_cssFilter(id)) {
  //       return null
  //     }
  //     const file = findRealCssFile(id[0] === '\0' ? id.slice(0) : id)
  //     if (file) {
  //       const code = await readFile(file)
  //       return code
  //     }
  //   },
  //   transform(code, filename) {
  //     if (!_cssFilter(filename)) {
  //       return null
  //     }
  //     console.log('-------filename-------', findRealCssFile(filename, true).file);
  //     return postcssPluginInstance.transform.bind(this)(code, findRealCssFile(filename, true).file || filename)
  //   },
  //   async generateBundle(options_, bundle) {
  //     return postcssPluginInstance.generateBundle.bind(this)(options_, bundle)
  //   }
  // }
}

exports.default = postcss;
