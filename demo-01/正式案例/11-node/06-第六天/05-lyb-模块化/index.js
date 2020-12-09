let router = require('./router')
let myRedirect = require('./extend')

// 1、引入
let http = require('http')

// 2、创建服务器
let server = http.createServer()

// 3、启动服务器
server.listen(8001, () => {
  console.log('启动成功')
})
// 4、监听请求
server.on('request', (req, res) => {
  myRedirect(res)
  router(req, res)
})

// 封装重定向
// function my_redirect(res) {
//   // 重定向
//   res.statusCode = 302
//   res.setHeader('location', '/')
//   // 需要res.end
//   res.end()
// }
