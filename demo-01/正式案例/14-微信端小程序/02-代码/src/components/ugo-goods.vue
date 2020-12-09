<template>
  <navigator :url="'/pages/detail/detail?id=' + goods.goods_id" class="goods">
    <view class="left">
      <image
        mode="aspectFill"
        :src="
          goods.goods_small_logo ||
            'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'
        "
      ></image>
    </view>
    <view class="right">
      <view class="title line2">{{ goods.goods_name }}</view>
      <view class="price"
        >¥ <text>{{ goods.goods_price }}</text></view
      >
    </view>
  </navigator>
</template>

<script>
export default {
  props: ['goods'],
}
</script>

<style lang="less" scoped>
.goods {
  height: 180rpx;
  border-bottom: 1px solid #ccc;
  display: flex;
  padding: 20rpx;
  .left {
    image {
      width: 140rpx;
      height: 140rpx;
    }
  }
  .right {
    flex: 1;
    padding: 20rpx 0 20rpx 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text {
      color: #ff2d4a;
      margin-left: 20rpx;
    }
  }
}
</style>
