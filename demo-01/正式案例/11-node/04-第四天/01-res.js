//res.write(data): 给浏览器发送请求体，可以调用多次，从而提供连续的请求体
//res.end();   通知服务器，所有响应头和响应主体都已被发送，即服务器将其视为已完成。
//res.end(data); 结束请求，并且响应一段内容，相当于res.write(data) + res.end()
//res.statusCode: 响应的的状态码 200 404 500
//res.statusMessage: 响应的状态信息， OK Not Found ,会根据statusCode自动设置。
//res.setHeader(name, value); 设置响应头信息， 比如content-type
//res.writeHead(statusCode（字符串）, statusMessage, options); 设置响应头，同时可以设置状态码和状态信息。

// 1、引入http模块
let http = require('http')
// 2、创建服务器
let server = http.createServer()
// 3、启动
server.listen(8001, () => {
  console.log('启动成功')
})
// 4、监听请求
server.on('request', (req, res) => {
  // console.log('有人请求啦')
  // 给浏览器返回的内容,write可以分为多次给浏览器返回数据。
  // res.write('hello node')
  // res.write('wwwww')
  // 告诉浏览器本次请求结束（一定要有）(最重要)
  // res.end()
  // 设置状态码（状态码轻易不用修改）
  /* 
  状态码说明：
  2：成功
  3：重定向
  4：前端请求的路径有问题
  5：服务端错误
  */
  // res.statusCode = 306
  // 设置提示（不可以设置中文）
  // res.statusMessage = 'hello'
  // 设置响应头(如果中文乱码，需要设置编码格式)
  res.setHeader('content-type', 'text/plain;charset=utf8')
  res.end('你好')
})
