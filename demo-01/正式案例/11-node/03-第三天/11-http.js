/* 
http模块
作用：创建服务器
*/

// 1、引入http模块
let http = require('http')
// 2、创建服务器
let server = http.createServer()
// 3、启动服务器 指定一个端口号
server.listen(8001, () => {
  console.log('启动成功')
})
// 4、监听请求
server.on('request', () => {
  console.log('收到请求！！')
})
