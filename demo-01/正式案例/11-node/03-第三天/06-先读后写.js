/* 
需求：
  在a.txt文件现有内容的基础上+ 789

分析：
步骤1：读取a.txt文件内容
步骤2：处理数据
步骤3：写入a.txt文件
*/

// 1、引入fs模块
let fs = require('fs')

// 2、读取文件内容
let mypath = 'a.txt'
fs.readFile(mypath, 'utf8', (err, data) => {
  if (err) return console.log('文件未找到！！！')
  // console.log(data)
  // 3、处理数据
  data += '789'
  // console.log(data)
  // 4、写入文件
  fs.writeFile(mypath, data, err => {
    if (err) return console.log('写入失败')
    console.log('写入成功')
  })
})
