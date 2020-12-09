// 请在这里, 写你的代码
// 根组件
const vm = new Vue({
  el: '.todoapp',
  data: {
    list: []
  },
  created () {
    this.list = JSON.parse(localStorage.getItem('todos')) || []
  },
  methods: {
    delTodo (id) {
      // axios的版本, 该子传父还是子传父, 当拿到id后, 根据 id 发送删除的 axios 请求即可
      this.list = this.list.filter(item => item.id !== id)
    },
    addTodo (todoName) {
      // console.log(todoName)
      this.list.unshift({
        id: +new Date(),
        name: todoName,
        flag: false
      })
    },
    changeState (id, flag) {
      // console.log(id, flag)
      // 根据id, 找到对应的项find, 将状态改成flag
      const todo = this.list.find(item => item.id === id)
      todo.flag = flag
    },
    editTodo (id, name) {
      // 根据id, 找到对应的项, 将内容改成name
      const todo = this.list.find(item => item.id === id)
      todo.name = name
    },
    clearTodo () {
      // 清除所有已完成的, 保留所有未完成的
      this.list = this.list.filter(item => !item.flag)
    }
  },
  watch: {
    list: {
      deep: true,
      handler (newValue) {
        localStorage.setItem('todos', JSON.stringify(newValue))
      }
    }
  }
})