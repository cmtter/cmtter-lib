/**
 * 可用命令
 */
const COMMAND_CLIS = ['lib', 'lib-create', 'doc', 'doc-deploy', 'doc-build', 'web', 'web-build']

/**
 * 错误信息
 */
const ERROR_MESSAGES = {
  ERROR_NOTEXSIT_CLI: new Error(
    `
脚本错误!!!!
请运行以下命令:
cmtter-lib lib
cmtter-lib lib create
cmtter-lib doc
cmtter-lib doc deploy
cmtter-lib web build
`
  )
}
export {
  COMMAND_CLIS,
  ERROR_MESSAGES
}

