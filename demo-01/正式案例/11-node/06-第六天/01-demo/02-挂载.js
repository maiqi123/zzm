/*
挂载：
对象中包含：
属性：明确的值
方法：可执行
*/
function togo() {
  console.log('我在跑')
}
let data = {
  name: 'zs',
  age: 38,
  eat: function () {
    console.log('我在吃')
  },
}
// data.eat()

data.togo = togo
data.togo()
