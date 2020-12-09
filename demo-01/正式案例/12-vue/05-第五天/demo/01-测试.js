// 案例需求: 依次读四个文件, 并且依次打印这四个文件的内容
// const fs = require('fs')
// fs.readFile(文件路径, 'utf8', 回调)
const fs = require('fs')
const path = require('path')

// 读取 a 文件
// fs.readFile(path.join(__dirname, 'a.txt'), 'utf8', (err, data) => {
//   if (err) return console.log(err)
//   console.log(data)
// })

// readFile 读取文件, 是一个异步的操作
fs.readFile('a.txt', 'utf8', (err, data) => {
  if (err) return console.log(err)
  console.log(data)

  fs.readFile('b.txt', 'utf8', (err, data) => {
    if (err) return console.log(err)
    console.log(data)

    fs.readFile('c.txt', 'utf8', (err, data) => {
      if (err) return console.log(err)
      console.log(data)

      fs.readFile('d.txt', 'utf8', (err, data) => {
        if (err) return console.log(err)
        console.log(data)
      })
    })
  })
})

// 我们学习promise, 就可以解决这样回调嵌套不好维护的问题







// console.log('嘎嘎')