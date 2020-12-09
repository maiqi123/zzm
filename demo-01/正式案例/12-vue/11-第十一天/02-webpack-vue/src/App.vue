<template>
  <div id="app">
    <hm-header></hm-header>
    <hm-main></hm-main>
    <hm-footer></hm-footer>
  </div>
</template>

<script>
// 在这个导出的对象中, 可以配置 和 我们之前写的组件配置对象一样的配置
// 比如: data methods computed created watch mounted ...
export default {
  data () {
    return {
      msg: '学习vue真香'
    }
  },
  methods: {
    fn () {
      this.msg = 'zs'
    }
  }
}
</script>

<style lang="less">
h1 {
  background-color: skyblue;
  span {
    color: red;
  }
}
</style>