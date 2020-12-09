/* 
readFile
作用：读文件
语法：fs.readFile(path, 'utf8', callback)
参数1：文件路径
参数2：编码  （常用）(在参数中配置了编码utf8 ，在回调函数内部 就可以不用 toString方法。)
参数3：回调函数（读文件无论成功还是失败，都由callback内部来接收，和执行）
callback参数：
    参数1：err  错误信息
    参数2：data 数据
*/

// 1、引入模块
let fs = require('fs')
// 2、使用fs
// 编码写成 utf8  和 utf-8 都可以。
// fs.readFile('./a.txt', 'utf8', (err, data) => {
fs.readFile('./a1.txt', 'utf-8', (err, data) => {
  // 当没有错误是 err 是 null
  /* 
  ENOENT: no such file or directory
  ENOENT
  E : error
  no: 没有
  ent：实体
  */
  console.log(err)
  if (err) return console.log('文件不存在！！')
  console.log(data)
})
