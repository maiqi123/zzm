/* 
Error: listen EADDRINUSE: address already in use :::8001
端口号被占用，需要换一个。
EADDRINUSE
E ：error
ADDR： 地址
INUSE： 已使用

6666：端口号不能设6666 ，直接 用8001  8002 ……
*/
// 1、引入http模块
let http = require('http')
// 2、创建服务器
let server = http.createServer()
// 3、启动服务器
server.listen(8002, () => {
  console.log('启动成功')
})
// 4、监听请求
server.on('request', () => {
  console.log('又有人请求啦！！！！')
})
