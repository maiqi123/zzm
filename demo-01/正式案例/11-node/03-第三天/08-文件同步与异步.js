/* 
Sync: 同步
Async： 异步  a 否定

举例：
  xxxxx 异步
  xxxxxSync 同步
  或
  xxxxx 同步
  xxxxxAsync 异步

同步读文件：(不常用)
fs.readFileSync("2.txt", "utf-8");
参数1：路径
参数2：编码
*/
console.log('1')
// 1、引入fs模块
let fs = require('fs')
// 2、读取文件内容
// fs.readFile('./a.txt', 'utf8', (err, data) => {
//   if (err) return console.log('文件读取失败')
//   console.log(data)
// })

var data = fs.readFileSync('a.txt', 'utf-8')
console.log(data)

console.log('3')
