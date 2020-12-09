/* 
需求：
定义一个 login 方法，接收用户名和密码，判断 并 返回 是否 通过。
*/

// 同步逻辑
// function login(username, password) {
//   if (username === 'admin' && password === '123') {
//     return true
//   } else {
//     return false
//   }
// }

// let islogin = login('admin1', '123')
// if (islogin) {
//   console.log('登录成功！')
// } else {
//   console.log('登录失败，你是来打酱油的么')
// }

function login(username, password, callback) {
  // 用演示器 模拟请求api接口
  setTimeout(() => {
    if (username === 'admin' && password === '123') {
      callback(true)
    } else {
      callback(false)
    }
  }, 2000)
}

login('admin', '123', b => {
  if (b) {
    console.log('登录成功！')
  } else {
    console.log('登录失败，你是来打酱油的么')
  }
})
// let islogin = login('admin1', '123')
// if (islogin) {
//   console.log('登录成功！')
// } else {
//   console.log('登录失败，你是来打酱油的么')
// }
