// promise语法:
// 1. 创建 promise 对象
// 2. 使用 promise

const fs = require('fs')

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