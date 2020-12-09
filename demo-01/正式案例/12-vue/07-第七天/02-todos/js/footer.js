// 3. 底部组件
Vue.component('todo-footer', {
  template: `
    <footer class="footer" v-show="isShowFooter">
      <span class="todo-count"><strong>{{ leftCounts }}</strong> item left</span>
      <ul class="filters">
        <li>
          <a class="selected" href="#/">All</a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      <button @click="clearTodo" v-show="isShowClear" class="clear-completed">Clear completed</button>
    </footer>
  `,
  methods: {
    clearTodo () {
      // 清除已完成, 操作数组
      this.$emit('clear-todo')
    }
  },
  computed: {
    isShowFooter () {
      return this.list.length > 0
    },
    leftCounts () {
      // 剩余的数量, 未完成的 => flag ==> false
      return this.list.filter(item => !item.flag).length
    },
    isShowClear () {
      // 只要有一个已完成, 就要显示
      return this.list.some(item => item.flag)
    }
  },
  props: ['list']
})
