 /* 
浏览器中的 console是 window.console，省略了window
node中的 console是global.console，省略了 global

global 全局模块 ，不需要引入，可以直接使用，并且可以省略global。（其他模块都需要引入）
包含：
  console 打印
  setTimeout和setInterval  延时 、 定时 
  __dirname  获取当前文件夹的绝对路径   __dirname + '\01-global.js'
  require    引入模块

*/

 // 下面 console 是 global中的方法
 // console.log('hello node')
 // global.console.log('hello node!!!')

 // 下面 setTimeout和setInterval 是global 中的方法
 // setTimeout(() => {
 //   console.log('setTimeout')
 // }, 0)

 // setInterval(() => {
 //   console.log('setInterval')
 // }, 0)

 // 获取当前文件夹的绝对路径
 // console.log(__dirname)

 // require 引入