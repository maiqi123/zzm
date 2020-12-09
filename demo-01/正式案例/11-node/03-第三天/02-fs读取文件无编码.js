/* 
readFile
作用：读文件
语法：fs.readFile(path, callback)
参数1：文件路径
参数2：回调函数（读文件无论成功还是失败，都由callback内部来接收，和执行）
callback参数：
    参数1：err  错误信息
    参数2：data 数据
*/

// 1、引入
let fs = require('fs')

// 2、使用
fs.readFile('./a.txt', (err, data) => {
  if (err) return console.log('文件不存在！')
  // 直接取data 是buffer类型 可以用 toString 方法转换为字符串
  // console.log(data)
  console.log(data.toString())
})
