/* 
回调函数
  同步逻辑 返回值 用 return
  异步逻辑 返回值 用 回调函数
*/
// 同步逻辑
// function fn1(str) {
//   return str + '123'
// }
// let s1 = fn1('hello')
// console.log(s1)

// 异步逻辑
// function fn1(str) {
//   setTimeout(() => {
//     // 异步逻辑 不可以使用return 返回值
//     return str + '123'
//   }, 2000)
// }
// let s1 = fn1('hello')
// console.log(s1)

function fn1(str, callback) {
  setTimeout(() => {
    // 异步逻辑 不可以使用return 返回值
    callback(str + '123')
  }, 2000)
}
fn1('hello', function (str) {
  console.log(str)
})
