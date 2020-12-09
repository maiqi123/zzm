/* 
appendFile
语法：fs.appendFile(path, data[, options], callback)
参数1：路径
参数2：追加的内容（数据）
参数3：callback
  err

注意：
如果追加的文件不存在，会创建一个文件。
*/

// 需求：a.txt 内容后面追加abc
// 1、引入fs模块
let fs = require('fs')
// 2、追加
fs.appendFile('a1.txt', 'abc', err => {
  if (err) return console.log('追加失败')
  console.log('追加成功')
})
