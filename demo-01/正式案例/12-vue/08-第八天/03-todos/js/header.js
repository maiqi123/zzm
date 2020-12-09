// 1. 头部组件
Vue.component('todo-header', {
  template: `
    <header class="header">
      <h1>todos</h1>
      <input @keyup.enter="addTodo" class="new-todo" placeholder="What needs to be done?" v-model="todoName">
    </header>
  `,
  data () {
    return {
      todoName: ''
    }
  },
  methods: {
    addTodo () {
      if (this.todoName.trim() === '') return
      // 父组件的数据交给父组件自己去改
      this.$emit('add-todo', this.todoName)
      this.todoName = ''
    }
  }
})
