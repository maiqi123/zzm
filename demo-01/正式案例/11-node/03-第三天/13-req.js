/* 
req:是浏览器提交给服务器的信息
req.url 访问的路径
req.method 获取请求方式
req.headers 获取请求头信息


*/
// 1、引入http模块
let http = require('http')
// 2、创建服务器
let server = http.createServer()
// 3、启动服务器
server.listen(8001, () => {
  console.log('http ok')
})
// 4、监听请求
server.on('request', req => {
  console.log(req.headers)
})
