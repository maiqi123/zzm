// 在这里, 编写你的vue代码
// 1. 创建vue实例, 准备数据
// 2. 列表渲染 v-for

// 3. 删除功能
// (1) 注册点击事件
// (2) 点击的时候, 拿到id, 从list中, 删除对应的项
// (3) 不用重新渲染, 数据变化了, 视图自动更新

// 4. 添加功能
// (1) 能够拿到输入框的值 => v-model
// (2) 注册键盘回车的事件 @keyup.enter, 回车的时候, 添加
// (3) 不用重新渲染, 数据变化了, 视图自动更新

// 5. 修改功能
// 5.1 双击的时候, 显示修改框
// (1) 注册双击事件 @dblclick
// (2) 双击的时候, 记录双击的那一项的 id
// (3) 根据 id, 让对应的项, 显示成编辑状态 (给对应的项, 加上 editing 类)

// 5.2 修改完成

// some   整个数组中, 只要有一个满足条件, 结果就是true
// every  整个数组中, 必须所有的都满足条件, 结果才是true

// 6. 底部功能
// 6.1 底部的整个显示隐藏
// 6.2 左侧统计未完成的个数
// 6.3 右侧清除已完成的按钮
// (1) 只要有一个已完成, 就要显示这个按钮
// (2) 点击已完成按钮, 清除所有已完成的项

// 7. 全选反选
// 7.1 改变下面的, 需要同步更新上面的
// 7.2 改变上面的, 需要同步更新下面的所有的

// 8. 数据持久化, 就是将数据持久化存储起来
// 8.1 发送ajax, 将数据持久化存储到数据库中
// 8.2 将数据, 存到本地 localStorage

// localStorage.setItem(key, value)
// localStorage.getItem(key)
// localStorage.removeItem(key)
// localStorage.clear() 清空所有的本地存储, 少用

// 只要改变了数据, 就要往本地存 => vue可以监视数据的变化, 只要数据变化, 就会触发执行一个函数, 在函数中往本地存

const vm = new Vue({
  el: '.todoapp',
  data: {
    // 用于绑定输入框的值
    todoName: '',
    list: JSON.parse(localStorage.getItem('todos')) || [],
    // now作用: 用于存放当前双击的项的 id
    // now: -1 表示: 现在谁都没编辑
    now: -1
  },
  methods: {
    delTodo (id) {
      // console.log(id)  2
      // 根据id, 从数组list中删除对应项
      // filter => 过滤, 保留满足条件的项  (保留 item.id 不等于 id 的项)
      this.list = this.list.filter(item => item.id !== id)
    },
    addTodo () {
      if (this.todoName.trim() === '') return
      // 数据驱动, 要更新视图, 操作数据即可
      // 往 list 数组前面加一项
      this.list.unshift({
        id: +new Date(),
        name: this.todoName,
        flag: false
      })
      this.todoName = ''
    },
    showEdit (id) {
      // console.log(id)
      this.now = id
    },
    editTodo () {
      this.now = -1
    },
    clearTodo () {
      // 清除所有已完成的, 保留所有未完成的
      this.list = this.list.filter(item => !item.flag)
    }
  },
  computed: {
    isShowFooter () {
      return this.list.length > 0
    },
    leftCounts () {
      return this.list.filter(item => !item.flag).length
    },
    isShowClear () {
      return this.list.some(item => item.flag)
    },
    // 全选反选的状态, 不是写死的, 也不是由他自己决定的, 是由下面的所有的项的选中状态决定
    // isAll () {
    //   // 所有的都选中了, 那么全选就是选中, 否则就是不选中
    //   return this.list.every(item => item.flag)
    // }

    // 当修改了计算属性的值之后, 报错了, 没有配置setter
    // 目前学习的这一种语法, 是简写的语法, 默认只配置了 getter => 当前的计算属性只能获取, 不能设置
    // 需要学习计算属性的完整写法: 既可以配置 getter, 也可以配置 setter

    isAll: {
      get () {
        return this.list.every(item => item.flag)
      },
      // 修改的时候的触发, 改成什么, val 就会拿到什么
      set (val) {
        // console.log(val)
        // 修改了全选反选的状态, 下面所有的项的状态, 都要改变同步
        this.list.forEach(item => item.flag = val)
      }
    }

  },
  watch: {
    // list中, 所有对象, 任何的属性, 只要变化了, 都要往本地存 => 深度监视
    list: {
      deep: true,
      handler (newValue) {
        // console.log('list变化了')
        localStorage.setItem('todos', JSON.stringify(newValue))
      }
    }
  }
})