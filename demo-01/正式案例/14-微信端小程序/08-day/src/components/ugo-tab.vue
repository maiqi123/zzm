<template>
  <view class="tabs">
    <block v-for="tab in tabs" :key="tab.id">
      <view @click="clickTab(tab.id)" :class="{ active: tab.isActive }">{{ tab.title }}</view>
    </block>
  </view>
</template>

<script>
export default {
  props: ['tabs'],
  methods: {
    clickTab(id) {
      // console.log(id)
      // 子传父的第三步 : 子触发
      this.$emit('mytap', id)
    },
  },
}
</script>

<style lang="less" scoped>
.tabs {
  height: 100rpx;
  background: #ddd;
  display: flex;
  view {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 3px solid #ddd;
  }
  view.active {
    border-bottom: 3px solid #ff2d4a;
    color: #ff2d4a;
  }
}
</style>
