let http = require('http')
let server = http.createServer()
server.listen(8001, () => {
  console.log('服务器开启')
})
server.on('request', (req, res) => {
  res.setHeader('content-type', 'text/plain;charset=utf8')
  // getlist 是获取列表的api接口
  if (req.url === '/getlist') {
    /* 
    操作数据库的 代码，明天讲解 node 连接 mysql
    */

    // 下面代码是数据库执行以后返回数据，并给前端返回数据。
    let data = {
      code: 2,
      message: 'ok',
      data: [
        { id: 1, name: '吃饭', done: true },
        { id: 2, name: '睡觉', done: true },
        { id: 3, name: '打豆豆', done: false },
      ],
    }
    data = JSON.stringify(data)
    res.end(data)
  } else {
    res.end('404')
  }
})
