// 在这里, 编写你的vue代码
// 目标: 完成一个todos axios的版本
// 1. 查询, 列表渲染
//    数据不再是本地自己提供, 数据存在了后台, 发送ajax请求获取数据
//    在created中发送, 通过axios发送

// 2. 删除, 删除某一项
// (1) 添加点击事件
// (2) 传递id, 根据id进行删除, 发送删除的ajax请求的
// (3) 要重新请求渲染

// 3. 添加, 添加一项
// (1) 获取输入框的值 v-model
// (2) 注册键盘回车事件, 发送添加的ajax请求
// (3) 要重新请求渲染

// 4. 修改, 修改内容, 修改状态
// 4.1 修改状态
// input:checkbox
// input:file
// select option  => 一律注册 change 事件
// (1) 注册change事件
// (2) 拿到修改状态, 发送ajax请求
// (3) 重新渲染

// 初始化vue
const vm = new Vue({
  el: '.todoapp',
  data: {
    list: [],
    todoName: ''
  },
  // created 可以编写, 一进入页面就要发送的请求 
  // mounted 可以操作dom
  created() {
    // 实例, 可以访问到methods中封装的方法的
    this.getTodoList()
  },
  methods: {
    getTodoList() {
      // 发ajax
      axios({
        method: 'get',
        url: 'http://localhost:3000/todos?_sort=id&_order=desc'
      }).then(res => {
        // console.log(res.data)
        this.list = res.data
      })
    },

    delTodo(id) {
      // 发送删除的ajax请求
      axios({
        method: 'delete',
        url: `http://localhost:3000/todos/${id}`
      }).then(res => {
        // 如果后台, 将删除后剩余的结果给你返回了, 这个代码就简单了
        // this.list = res.data
        // 但是这边没有返回, 需要重新请求
        this.getTodoList()
      })
    },

    addTodo() {
      if (this.todoName.trim() === '') return

      // get获取, delete删除, post添加 put全量修改 patch局部修改
      // 发送添加的ajax请求, 
      axios({
        method: 'post',
        url: 'http://localhost:3000/todos',
        // post put patch的参数都在请求体中, 通过data参数对象配置
        data: {
          name: this.todoName,
          flag: false
        }
      }).then(res => {
        this.getTodoList()
        this.todoName = ''
      })
    },

    changeState(flag, id) {
      // console.log(flag, id)
      // 修改的ajax请求 put patch
      axios({
        method: 'patch',
        url: `http://localhost:3000/todos/${id}`,
        data: {
          flag
        }
      }).then(res => {
        this.getTodoList()
      })
    }
  }
})