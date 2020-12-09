/* 
需求：根据不同请求输出不同响应文件
1、准备文件
2、根据url读取相应的文件内容
3、返回给浏览器
*/

let fs = require('fs')
let path = require('path')
let http = require('http')
let server = http.createServer()
server.listen(8001, () => {
  console.log('启动成功')
})
server.on('request', (req, res) => {
  // console.log(req.url)
  if (req.url === '/' || req.url === '/index') {
    fs.readFile(
      path.join(__dirname, './pages-apache/index.html'),
      (err, data) => {
        res.end(data)
      }
    )
  } else if (req.url === '/list') {
    fs.readFile(
      path.join(__dirname, './pages-apache/list.html'),
      (err, data) => {
        res.end(data)
      }
    )
  } else {
    res.end('404')
  }
})
