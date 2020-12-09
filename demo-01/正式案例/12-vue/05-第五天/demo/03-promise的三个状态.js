// promise语法:
// 1. 创建 promise 对象
// 2. 使用 promise

const fs = require('fs')

// promise 对象有三个状态
// pending 等待中(默认的状态)
// fulfilled 成功的状态
// rejected  失败的状态 (拒绝的)

// 1. 当成功的时候, 需要调用 resolve 函数, resolve函数会将 promise 的状态从 pending 改成 fulfilled
//    意味着将来要执行的是 .then 中配置的成功的函数
// 2. 当失败的时候, 需要调用 reject 函数, reject函数会将 promise 的状态从 pending 改成 rejected
//    意味着将来要执行的是 .catch 中配置的失败的函数
// 3. promise的状态只能修改一次, 一旦promise的状态被修改了, 就会状态凝固
//    将来无论调用多少次 resolve 或者 reject 都无法再改变凝固的状态了

// promise: 承诺, 承诺的是将来的事情, 可能成功, 也可能失败
const p = new Promise(function(resolve, reject) {
  // resolve 和 reject 都是promise中提供给你的函数
  // resolve 是成功的时候需要调用的函数
  // reject  是失败的时候需要调用的函数
  // 一般在promise中, 都会封装处理异步的内容, 比如: ajax, 文件读写
  fs.readFile('a.txt', 'utf8', (err, data) => {
    if (err) {
      console.log('失败了')
      reject(err)
    } else {
      console.log('成功了')
      resolve(data)
      // reject('错误了') // 无用的代码
    }
  })
})

// 使用promise对象
// axios({ ... }).then(...).catch(...)
// p.then(成功的函数).catch(失败的函数)
p.then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
})


/* 
  promise的基本使用:
    1. 创建promise对象
       const p = new Promise((resolve, reject) => {
         // resolve 和 reject是promise语法提供的两个函数
         // resolve 成功的时候, 需要调用的函数
         // reject  失败的时候, 需要调用的函数

         // 里面一般封装一个异步的操作, 成功了就 resolve() 失败了就 reject()
       }) 
    2. 使用promise对象
       p.then(成功的函数).catch(失败的函数)

*/