 // async 和 await, 可以大大的提升 promise 使用时的 可维护性!!!
    // async 和 await 是一对关键字, 一般配合起来使用
    // 1. async 用于修饰一个函数, 表示一个函数是异步的
    //    async中没有await, 那么就是和普通函数一致, 都是同步的内容
    //    async函数中的内容, 在遇到await之前, 都是同步的内容, 从await开始, 就是异步的开始

    // console.log(1)
    // async function fn () {
    //   console.log(4)
    //   const res = await 2
    //   console.log(res)
    // }
    // fn()
    // console.log(3)
    // ------------------------------------------------------------------------------

    // 2. await 必须写在 async 函数中, 不能单独使用
    // const res = await 3

    // ------------------------------------------------------------------------------
    // 3. await 后面一般会跟一个promise对象,
    //    await 会阻塞当前 async 函数的执行, 会一直等, 直到等到成功的结果
    // 4. await 只会等待成功的结果, 如果失败了, 会直接抛出错误, 需要我们进行 try catch 错误处理
    const fs = require('fs')
    function read(filePath) {
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })
    }

    async function fn() {
      try {
        const data1 = await read('a.txt')
        console.log(data1)

        const data2 = await read('b.txt')
        console.log(data2)

        const data3 = await read('c.txt')
        console.log(data3)

        const data4 = await read('d.txt')
        console.log(data4)
      } catch (err) {
        console.log(err)
        // console.log('目前, 文件有丢失, 没有读到正确的文件, 请联系管理员')
      }
    }
    fn()
    console.log('哈哈哈')