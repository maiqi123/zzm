/* 
mime模块
作用：根据扩展名获取到对应mime类型
*/

let mime = require('mime')
console.log(mime.getType('aa.css'))
