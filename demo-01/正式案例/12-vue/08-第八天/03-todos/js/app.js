// 思路:
// 1. 通过路由, 记录住当前的过滤的条件
//    /          => 展示所有的数据
//    /active    => 展示未完成的数据
//    /completed => 展示已完成的数据

// 2. 根据过滤条件, 从全部的数据中筛选出需要展示的数据, 专门给用户去看
//    注意点: 不会删除原来的数据的, 只是过滤展示

// 步骤:
// 1. 创建路由实例, 挂载了
// 2. 修改原有的 a 标签, 用 router-link
const router = new VueRouter({
  // linkActiveClass: 'selected' 模糊
  linkExactActiveClass: 'selected'
})


// 请在这里, 写你的代码
// 根组件
const vm = new Vue({
  el: '.todoapp',
  router,
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
  },
  computed: {
    // 准备一个计算属性, 可以基于原有的list数据 和 过滤的条件(地址栏有) 得到一个专门用于展示的 showList
    //    /          => 展示所有的数据
    //    /active    => 展示未完成的数据
    //    /completed => 展示已完成的数据
    showList () {
      // console.log(this.$route.path)
      if (this.$route.path === '/') {
        return this.list
      } else if (this.$route.path === '/active') {
        // 展示未完成的数据
        return this.list.filter(item => !item.flag)
      } else if (this.$route.path === '/completed') {
        // 展示已完成的数据
        return this.list.filter(item => item.flag)
      }
    }
  }
})