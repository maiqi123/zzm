/* 
node 模块
1、核心模块：node自带的，不需要安装，引入后直接使用
  fs 、 http
2、第三方模块：是别人写的，需要安装，安装后引入，引入后使用
  mime
3、自定义模块：自己写的模块。创建模块，引入后使用
  a.js b.js
*/

// 核心模块
let fs = require('fs')
// 第三方模块 mime
let mime = require('mime')
// 自定义模块 (必须要有路径，可以省略js后缀)
// let a = require('a.js') // 不ok
// let a = require('./a.js') // ok
let a = require('./a') // 不写js后缀 ok
