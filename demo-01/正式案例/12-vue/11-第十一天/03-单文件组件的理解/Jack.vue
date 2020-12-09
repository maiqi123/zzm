<template>
  <div>
    <h1>我是jack组件 - {{ msg }}</h1>
    <button>按钮</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '张三'
    }
  },
  methods: {
    fn () {
      console.log(1111)
    }
  },
  // computed,
  // created
}
</script>

<style>
button {
  width: 200px;
  height: 100px;
  background-color: pink;
}
</style>