// 这种默认的方式有缺点:
// 1. 组件包含结构样式行为, 默认的写法忽略了样式
// 2. 组件的结构写在了template属性中, 没有高亮, 没有提示
export default {
  template: `
    <div>我是jack组件 - {{ msg }}</div>
  `,
  data () {
    return {
      msg: '张三'
    }
  },
  methods: {
    fn () {
      console.log(1111)
    }
  }
}