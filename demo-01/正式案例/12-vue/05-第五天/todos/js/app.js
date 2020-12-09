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

// 4.2 修改内容
// (1) 双击显示输入框
// (2) 回车时进行发送ajax请求

// 初始化vue
const vm = new Vue({
  el: '.todoapp',
  data: {
    list: [],
    todoName: '',
    now: -1,
  },
  // created 可以编写, 一进入页面就要发送的请求
  // mounted 可以操作dom
  created() {
    // 实例, 可以访问到methods中封装的方法的
    this.getTodoList()
  },
  methods: {
    async getTodoList() {
      // 发ajax
      // axios({
      //   method: 'get',
      //   url: 'http://localhost:3000/todos?_sort=id&_order=desc'
      // }).then(res => {
      //   // console.log(res.data)
      //   this.list = res.data
      // })

      const res = await axios.get(
        'http://localhost:3000/todos?_sort=id&_order=desc'
      )
      this.list = res.data
    },

    async delTodo(id) {
      // 发送删除的ajax请求
      // axios({
      //   method: 'delete',
      //   url: `http://localhost:3000/todos/${id}`
      // }).then(res => {
      //   this.getTodoList()
      // })

      // 先发送ajax请求删除
      await axios.delete(`http://localhost:3000/todos/${id}`)
      // 删除完成, 重新渲染
      this.getTodoList()
    },

    async addTodo() {
      if (this.todoName.trim() === '') return
      // axios.post(url, data)
      // 发送ajax请求, 进行添加
      await axios.post('http://localhost:3000/todos', {
        name: this.todoName,
        flag: false,
      })
      this.getTodoList()
      this.todoName = ''
    },

    async changeState(flag, id) {
      await axios.patch(`http://localhost:3000/todos/${id}`, { flag })
      this.getTodoList()
    },

    showEdit(id) {
      // 将 id 记录到变量中, 将来让输入框显示
      this.now = id
    },

    async editTodo(id, name) {
      // 发送修改的请求 put patch
      await axios.patch(`http:8//localhost:3000/todos/${id}`, { name })
      this.getTodoList()
      this.now = -1
    },
  },
})
