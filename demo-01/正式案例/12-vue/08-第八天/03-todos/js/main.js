// 2. 主体组件
Vue.component('todo-main', {
  template: `
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li :class="{ completed: item.flag, editing: item.id === now }" v-for="item in list" :key="item.id">
          <div class="view">
            <input @change="changeState(item.id, $event)" class="toggle" type="checkbox" :checked="item.flag">
            <label @dblclick="showEdit(item.id)">{{ item.name }}</label>
            <button @click="delTodo(item.id)" class="destroy"></button>
          </div>
          <input @keyup.enter="editTodo(item.id, $event)" class="edit" :value="item.name">
        </li>
      </ul>
    </section>
  `,
  props: ['list'],
  data () {
    return {
      now: -1
    }
  },
  methods: {
    delTodo (id) {
      // 根据 id 从 list 中删除掉对应 id 的项, 保留不是该id的项 (错误示范)
      // this.list = this.list.filter(item => item.id !== id)

      // 遵循单向数据流, 父组件的数据交给父组件自己去改
      // 点击时, 子传父, 将 id 传递给父组件, 让父组件自己去删
      this.$emit('del-todo', id)
    },
    changeState (id, e) {
      // console.log(id, e.target.checked)
      this.$emit('change-state', id, e.target.checked)
    },
    showEdit (id) {
      this.now = id
    },
    editTodo (id, e) {
      // console.log(id, e.target.value)
      this.$emit('edit-todo', id, e.target.value)
      this.now = -1
    }
  }
})

// 组件与组件之间的数据都是独立的, 不能直接互相使用的
// 每个组件都应该是一个独立的个体, 有些场景, 还是需要进行数据传输, 比如: 父组件的数据希望子组件能用
// 就要用到组件通信
