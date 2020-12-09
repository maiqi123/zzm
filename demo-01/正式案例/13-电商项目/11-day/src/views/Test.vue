<template>
  <div>
    <input type="text" @input="fn1" />
    <input type="text" @input="fn2" />
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  created() {
    console.log('本尊已经做了防抖了')
    this.fn1 = _.debounce(this.fn1, 500)
    // 防抖
    //格式 :  _.debounce()
    //参数: 1-要防抖动的函数  2-延迟的毫秒数
    //返回值 : 返回一个防抖动的函数

    this.fn2 = _.throttle(this.fn2, 1000)
    // 格式 : _.throttle()
    // 参数 : 1-要节流的函数 2-要节流的毫秒数
    // 返回值 : 返回一个节流的函数
  },
  methods: {
    // 防抖 - 同一时间只能执行一次
    fn1() {
      console.log('发送请求了')
    },
    // 节流
    fn2() {
      console.log('节流-发送请求了')
    },
  },
}
</script>

<style>
/* // 清除之前的延时器
      clearTimeout(this.timer)
      // 开启新的延时器
      this.timer = setTimeout(() => {
        console.log('就要发送请求了')
      }, 500) */
</style>
