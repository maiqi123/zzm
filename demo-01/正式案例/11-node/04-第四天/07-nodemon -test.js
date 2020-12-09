/* 
需求：根据不同请求输出不同响应数据
/ 或 /index  我们显示 index
/login     显示 login
*/

let http = require('http')
let server = http.createServer()
server.listen(8001, () => {
  console.log('启动成功')
})
server.on('request', (req, res) => {
  console.log(req.url, '00000')
})
