/* 
path模块
path.join
可以把多个有效的路径 连城一个 有效的路径。
*/

// console.log('00000')
// 引入
let fs = require('fs')
let path = require('path')
// let p = __dirname + '/a.txt' ok
// let p = __dirname + './a.txt'  不ok
// let p = __dirname + 'a.txt'  不ok

// let p = path.join(__dirname, '/a.txt') ok
// let p = path.join(__dirname, './a.txt') ok
let p = path.join(__dirname, 'a.txt')
// console.log(p)
fs.readFile(p, 'utf8', (err, data) => {
  if (err) return console.log('文件不存在0000')
  console.log(data)
})
