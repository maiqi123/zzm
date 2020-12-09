let fs = require('fs')
let path = require('path')
let mime = require('mime')
let template = require('art-template')
let url = require('url')
let querystring = require('querystring')
let moment = require('moment')
let { data_read, data_write } = require('./tools')

function index(res) {
  // 封装后
  data_read(data => {
    let filePath = path.join(__dirname, './views/index.html')
    data = JSON.parse(data)
    // 一定要传入绝对路径，参数一定是传入一个对象。
    let temp = template(filePath, { data: data })
    res.end(temp)
  })
  // 封装之前
  // // 用art-template处理模板
  // fs.readFile(dataPath, 'utf8', (err, data) => {
  //   let filePath = path.join(__dirname, './views/index.html')
  //   data = JSON.parse(data)
  //   // 一定要传入绝对路径，参数一定是传入一个对象。
  //   let temp = template(filePath, { data: data })
  //   res.end(temp)
  // })

  // 没有用art-template 渲染模板之前的处理方法。
  // let filePath = path.join(__dirname, './views/index.html')
  // fs.readFile(filePath, (err, data) => {
  //   res.end(data)
  // })
}

function add(res) {
  let filePath = path.join(__dirname, './views/add.html')
  fs.readFile(filePath, (err, data) => {
    res.end(data)
  })
}

function assets(req, res) {
  res.setHeader('content-type', mime.getType(req.url))
  let filePath = path.join(__dirname, req.url)
  fs.readFile(filePath, (err, data) => {
    res.end(data)
  })
}

function del(req, res) {
  let id = url.parse(req.url, true).query.id
  // 封装后
  data_read(data => {
    let filePath = path.join(__dirname, './views/index.html')
    data = JSON.parse(data)
    data = data.filter(item => item.id != id)
    // JSON.stringify(data, null, 2)， 2是以两个空格为缩进的格式化

    // 封装后
    data_write(data, () => {
      res.my_redirect(res)
      // // 重定向
      // res.statusCode = 302
      // res.setHeader('location', '/')
      // // 需要res.end
      // res.end()
    })

    // 封装前
    // fs.writeFile(dataPath, JSON.stringify(data, null, 2), err => {
    //   // 重定向
    //   res.statusCode = 302
    //   res.setHeader('location', '/')
    //   // 需要res.end
    //   res.end()
    // })
  })
  // 封装之前
  // fs.readFile(dataPath, 'utf8', (err, data) => {
  //   let filePath = path.join(__dirname, './views/index.html')
  //   data = JSON.parse(data)
  //   data = data.filter(item => item.id != id)
  //   // JSON.stringify(data, null, 2)， 2是以两个空格为缩进的格式化
  //   fs.writeFile(dataPath, JSON.stringify(data, null, 2), err => {
  //     // 重定向
  //     res.statusCode = 302
  //     res.setHeader('location', '/')
  //     // 需要res.end
  //     res.end()
  //   })
  // })
}

function fbget(req, res) {
  // ?name=1&title=1&content=1
  let obj = url.parse(req.url, true).query
  obj.id = Date.now()
  obj.time = moment(new Date()).format('YYYY年MM月DD日 hh:mm:ss')
  // 封装后
  data_read(data => {
    let filePath = path.join(__dirname, './views/index.html')
    data = JSON.parse(data)
    data.unshift(obj)
    // console.log(obj)

    // 封装后
    data_write(data, () => {
      res.my_redirect(res)

      // // 重定向
      // res.statusCode = 302
      // res.setHeader('location', '/')
      // // 需要res.end
      // res.end()
    })
    // 封装前
    // JSON.stringify(data, null, 2)， 2是以两个空格为缩进的格式化
    // fs.writeFile(dataPath, JSON.stringify(data, null, 2), err => {
    //   // 重定向
    //   res.statusCode = 302
    //   res.setHeader('location', '/')
    //   // 需要res.end
    //   res.end()
    // })
  })
  // 封装之前
  // fs.readFile(dataPath, 'utf8', (err, data) => {
  //   let filePath = path.join(__dirname, './views/index.html')
  //   data = JSON.parse(data)
  //   data.unshift(obj)
  //   // console.log(obj)

  //   // JSON.stringify(data, null, 2)， 2是以两个空格为缩进的格式化
  //   fs.writeFile(dataPath, JSON.stringify(data, null, 2), err => {
  //     // 重定向
  //     res.statusCode = 302
  //     res.setHeader('location', '/')
  //     // 需要res.end
  //     res.end()
  //   })
  // })
}

function fbpost(req, res) {
  let str = ''
  req.on('data', chunk => {
    str += chunk
  })
  req.on('end', () => {
    // name=a1&title=a2&content=a2
    let obj = querystring.parse(str)
    obj.id = Date.now()
    obj.time = moment(new Date()).format('YYYY年MM月DD日 hh:mm:ss')
    // 封装后
    data_read(data => {
      let filePath = path.join(__dirname, './views/index.html')
      data = JSON.parse(data)
      data.unshift(obj)
      // console.log(obj)
      // 封装后
      data_write(data, () => {
        res.my_redirect(res)

        // // 重定向
        // res.statusCode = 302
        // res.setHeader('location', '/')
        // // 需要res.end
        // res.end()
      })
      // 封装前
      // JSON.stringify(data, null, 2)， 2是以两个空格为缩进的格式化
      // fs.writeFile(dataPath, JSON.stringify(data, null, 2), err => {
      //   // 重定向
      //   res.statusCode = 302
      //   res.setHeader('location', '/')
      //   // 需要res.end
      //   res.end()
      // })
    })
    // 封装之前
    // fs.readFile(dataPath, 'utf8', (err, data) => {
    //   let filePath = path.join(__dirname, './views/index.html')
    //   data = JSON.parse(data)
    //   data.unshift(obj)
    //   // console.log(obj)

    //   // JSON.stringify(data, null, 2)， 2是以两个空格为缩进的格式化
    //   fs.writeFile(dataPath, JSON.stringify(data, null, 2), err => {
    //     // 重定向
    //     res.statusCode = 302
    //     res.setHeader('location', '/')
    //     // 需要res.end
    //     res.end()
    //   })
    // })
  })
}

module.exports = {
  index,
  add,
  assets,
  del,
  fbget,
  fbpost,
}
