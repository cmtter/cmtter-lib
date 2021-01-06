module.exports = function (rootPath) {
  require('@babel/register')({
    presets: [require.resolve('@umijs/babel-preset-umi/node')],
    ignore: [/node_modules/],
    only: [
      function (filePath) {
        return filePath.startsWith(rootPath)
      }
    ],
    extensions: ['.jsx', '.js', '.ts', '.tsx'],
    babelrc: false,
    cache: false,
  });
}
