/* 
需求：模拟Apache服务器
分析：指定一个文件目录，在浏览器访问一个文件名，如果在这个目录中存在这个文件，直接返回给浏览器，如果不存在返回404
*/

let fs = require('fs')
let path = require('path')
let mime = require('mime')
let http = require('http')
let server = http.createServer()
server.listen(8001, () => {
  console.log('启动成功')
})
server.on('request', (req, res) => {
  console.log(req.url)
  // 获取当前请求的mime类型
  let mimeType = mime.getType(req.url)
  // 配置相应头中的mime类型
  res.setHeader('content-type', mimeType)
  fs.readFile(path.join(__dirname, './pages-apache', req.url), (err, data) => {
    // 没找到文件
    if (err) {
      // 读取404.html返回给页面
      console.log('文件没找到')
      fs.readFile(
        path.join(__dirname, './pages-apache/404.html'),
        (err1, data1) => {
          res.end(data1)
        }
      )
    } else {
      // 没有错误，证明找到文件了。把文件内容给浏览器
      res.end(data)
    }
  })
})
