<template>
  <div>
    <h1 ref="h1">{{ name }}</h1>
    <button @click="fn">点击</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '张三',
    }
  },
  methods: {
    async fn() {
      // console.log('改变前', this.name)
      console.log('修改前', this.$refs.h1.innerText)
      // 1. 直接修改data里面的name 修改数据是同步的
      // 2. 修改值,更新视图是异步的
      this.name = '李四四'
      // console.log('改变后', this.name)

      // 3.1 setTimeout
      // setTimeout(() => {
      //   console.log('修改后', this.$refs.h1.innerText)
      // }, 1000)
      // 3.2 $nextTick
      // this.$nextTick(() => {  
      //   console.log('修改后', this.$refs.h1.innerText)
      // })
      // this.$nextTick().then(() => {
      //   console.log('修改后', this.$refs.h1.innerText)
      // })
      await this.$nextTick()
      console.log('修改后', this.$refs.h1.innerText)

      // console.log(111)

      // setTimeout(() => {
      //   console.log(222)
      // }, 0)
      // console.log(333)
    },
  },
}
</script>

<style scoped lang="less"></style>
