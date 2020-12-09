// 1、引入
let fs = require('fs')

// 2、使用
fs.readFile('a.txt', (err, data) => {
  // 3、先判断是否有错误
  if (err) return console.log('文件不存在')
  // data Buffer 类型
  // console.log(data)
  console.log(data.toString())
})
