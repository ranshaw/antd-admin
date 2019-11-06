// 生产环境去除 console
if (process.env.NODE_ENV === 'production') {
  global.console.log = () => {}
  global.console.error = () => {}
  global.console.warn = () => {}
} else {
  console.log('当前运行环境' + process.env.NODE_ENV)
}
exports.page = function() {
  return `/catx-saas-admin`
}
// sys
exports.sys = function() {
  return `/api/admin-sys-service/a`
}
