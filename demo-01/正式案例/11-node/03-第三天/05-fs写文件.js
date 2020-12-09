/* 
writeFile
语法：fs.writeFile(file, data[, options], callback)
参数1：路径
参数2：内容（数据）
参数3：callback
    参数1： err

注意：
  1、写入文件是把写入的内容覆盖到文件中去。（覆盖）
  2、当文件不存在的时候回创建文件。
*/

// 1、引入模块
let fs = require('fs')

// 2、写入
let str = '123456'
fs.writeFile('./a1.txt', str, err => {
  if (err) return console.log('写入失败')
  console.log('写入成功')
})
