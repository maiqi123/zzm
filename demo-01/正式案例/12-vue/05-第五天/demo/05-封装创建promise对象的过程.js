// 依次读取 a b c d, 并且要求 依次打印
// promise, 就可以解决回调嵌套, 可维护性差的问题!

const fs = require('fs')

// 将来一般创建promise对象的过程, 都会封装到函数中, 便于创建promise对象
function read (filePath) {
  return new Promise((resolve, reject) => {
    // 一般promise中封装一个异步的操作
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// axios({}).then(res => {
//   console.log(res)
// })

read('a.txt').then(res => {
  console.log(res)
  return read('b.txt')
}).then(res => {
  console.log(res)
  return read('c.txt')
}).then(res => {
  console.log(res)
  return read('d.txt')
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

