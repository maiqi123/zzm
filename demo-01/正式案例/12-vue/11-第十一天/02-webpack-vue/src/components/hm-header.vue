<template>
  <div class="hm-header">
    这是头部
    <hm-button></hm-button>
    <!-- <HmButton></HmButton> -->
  </div>
</template>

<script>
import HmButton from './hm-button.vue'
// 局部注册: 只能在当前的vue实例中使用
export default {
  components: {
    // 'hm-button': HmButton
    // HmButton: HmButton
    HmButton
  }
}
</script>

<style lang="less">
.hm-header {
  height: 100px;
  border: 3px solid #000;
  border-radius: 2px;
}
</style>