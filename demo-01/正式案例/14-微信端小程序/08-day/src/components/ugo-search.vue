<template>
  <view class="search">
    <view class="search-bar">
      <text class="iconfont icon-search"></text>
      <text>搜索</text>
    </view>
  </view>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.search {
  background: #ff2d4a;
  padding: 20rpx 16rpx;
  &-bar {
    background: #fff;
    height: 60rpx;
    width: 718rpx;
    border-radius: 5rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    text {
      margin-left: 20rpx;
      color: #666;
    }
  }
}
</style>
