/* 

*/
// 1、引入
let template = require('art-template')
let path = require('path')

// 2、渲染
// 注意：必须要传入绝对路径
let res = template(path.join(__dirname, './template/01-template.html'), {
  name: '张三',
  age: 38,
})
console.log(res)
