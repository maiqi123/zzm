// 依次读取 a b c d, 并且要求 依次打印
// promise, 就可以解决回调嵌套, 可维护性差的问题!

const fs = require('fs')

// 读取 a
const p1 = new Promise((resolve, reject) => {
  // 一般promise中封装一个异步的操作
  fs.readFile('a.txt', 'utf8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

const p2 = new Promise((resolve, reject) => {
  // 一般promise中封装一个异步的操作
  fs.readFile('b.txt', 'utf8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

const p3 = new Promise((resolve, reject) => {
  // 一般promise中封装一个异步的操作
  fs.readFile('c.txt', 'utf8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

const p4 = new Promise((resolve, reject) => {
  // 一般promise中封装一个异步的操作
  fs.readFile('d.txt', 'utf8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

// promise支持链式编写
// 如果希望链式编写, 一般在这里的结尾, 需要return返回另外一个promise对象
// promise的内置语法
p1.then(data => {
  console.log(data)
  return p2
}).then(data => {
  console.log(data)
  return p3
}).then(data => {
  console.log(data)
  return p4
}).then(data => {
  console.log(data)
})
