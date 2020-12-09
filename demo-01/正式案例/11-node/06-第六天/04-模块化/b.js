/* 

一、每个模块都只能导出 module.exports

  如果一个空文件导入，默认是导入一个空对象。
  module.exports 默认是空对象

  每一个模块默认都有一个 module.exports 对象 ，他默认是一个空对象。

二、exports 是 module.exports 的别名。他指向 module.exports的地址。

三、注意：永远导出的都是 module.exports , 尽量不要使用 exports。

*/
// ********************使用module.exports进行导出**********************
// module.exports.name = '张三'
// module.exports.age = 88
// module.exports.name = '李四'
// module.exports.eat = function () {
//   console.log('就知道吃')
// }

// module.exports = {
//   name: 'zs',
//   age: 99,
// }

// ********************使用module.exports和exports 对比**********************

// ********************使用module.exports**********************

// module.exports.aa = 'aa'
module.exports = { aa: 'aa' }

// ********************使用exports **********************
// 如果给exports的属性或方法赋值，相当于 给 module.exports 赋值
// exports.name = 'ls'
// exports.age = 66
// exports.eat = function () {
//   console.log('就知道吃')
// }
// exports.aa = 'bbb'

// 如果给exports本身 重新赋值 ，不会影响到module.exports （因为此时指向已经变了）
// exports = { name: 'zs', age: 20 }
// exports = '12345'

exports.aa = 'bbb'
