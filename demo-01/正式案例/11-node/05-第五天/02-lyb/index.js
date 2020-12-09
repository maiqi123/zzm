// 1、引入
let http = require('http')
let fs = require('fs')
let path = require('path')
let mime = require('mime')
let template = require('art-template')
let url = require('url')
let querystring = require('querystring')
let moment = require('moment')
// 2、创建服务器
let server = http.createServer()

// 3、启动服务器
server.listen(8001, () => {
  console.log('启动成功')
})
let dataPath = path.join(__dirname, './data.json')
// 4、监听请求
server.on('request', (req, res) => {
  // console.log(req.url)
  console.log(req.method)

  // 一、处理首页
  if (req.url === '/' || req.url === '/index') {
    // 用art-template处理模板
    fs.readFile(dataPath, 'utf8', (err, data) => {
      let filePath = path.join(__dirname, './views/index.html')
      data = JSON.parse(data)
      // 一定要传入绝对路径，参数一定是传入一个对象。
      let temp = template(filePath, { data: data })
      res.end(temp)
    })

    // 没有用art-template 渲染模板之前的处理方法。
    // let filePath = path.join(__dirname, './views/index.html')
    // fs.readFile(filePath, (err, data) => {
    //   res.end(data)
    // })
  }
  // 二、处理添加页
  else if (req.url === '/add') {
    let filePath = path.join(__dirname, './views/add.html')
    fs.readFile(filePath, (err, data) => {
      res.end(data)
    })
  }
  // 三、处理静态资源（样式图片,mime类型）
  // 浏览器在收到网页内容以后，还会进行二次请求，请求样式图片。
  else if (req.url.startsWith('/assets')) {
    res.setHeader('content-type', mime.getType(req.url))
    let filePath = path.join(__dirname, req.url)
    fs.readFile(filePath, (err, data) => {
      res.end(data)
    })
  }
  // 四、删除
  else if (req.url.startsWith('/delete')) {
    let id = url.parse(req.url, true).query.id
    fs.readFile(dataPath, 'utf8', (err, data) => {
      let filePath = path.join(__dirname, './views/index.html')
      data = JSON.parse(data)
      data = data.filter(item => item.id != id)
      // JSON.stringify(data, null, 2)， 2是以两个空格为缩进的格式化
      fs.writeFile(dataPath, JSON.stringify(data, null, 2), err => {
        // 重定向
        res.statusCode = 302
        res.setHeader('location', '/')
        // 需要res.end
        res.end()
      })
    })
  }
  // 发布留言-get
  else if (req.url.startsWith('/fb') && req.method === 'GET') {
    // ?name=1&title=1&content=1
    let obj = url.parse(req.url, true).query
    obj.id = Date.now()
    obj.time = moment(new Date()).format('YYYY年MM月DD日 hh:mm:ss')
    fs.readFile(dataPath, 'utf8', (err, data) => {
      let filePath = path.join(__dirname, './views/index.html')
      data = JSON.parse(data)
      data.unshift(obj)
      // console.log(obj)

      // JSON.stringify(data, null, 2)， 2是以两个空格为缩进的格式化
      fs.writeFile(dataPath, JSON.stringify(data, null, 2), err => {
        // 重定向
        res.statusCode = 302
        res.setHeader('location', '/')
        // 需要res.end
        res.end()
      })
    })
  }
  // 发布留言-post
  else if (req.url.startsWith('/fb') && req.method === 'POST') {
    let str = ''
    req.on('data', chunk => {
      str += chunk
    })
    req.on('end', () => {
      // name=a1&title=a2&content=a2
      let obj = querystring.parse(str)
      obj.id = Date.now()
      obj.time = moment(new Date()).format('YYYY年MM月DD日 hh:mm:ss')
      fs.readFile(dataPath, 'utf8', (err, data) => {
        let filePath = path.join(__dirname, './views/index.html')
        data = JSON.parse(data)
        data.unshift(obj)
        // console.log(obj)

        // JSON.stringify(data, null, 2)， 2是以两个空格为缩进的格式化
        fs.writeFile(dataPath, JSON.stringify(data, null, 2), err => {
          // 重定向
          res.statusCode = 302
          res.setHeader('location', '/')
          // 需要res.end
          res.end()
        })
      })
    })
  } else {
    res.end('404')
  }
})
