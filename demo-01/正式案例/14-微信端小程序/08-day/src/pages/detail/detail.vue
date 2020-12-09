<template>
  <view>
    <!-- 轮播图 -->
    <swiper
      :circular="true"
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      :duration="1000"
    >
      <block v-for="item in detail.pics" :key="item.pics_id">
        <swiper-item>
          <image mode="aspectFit" :src="item.pics_mid_url"></image>
        </swiper-item>
      </block>
    </swiper>

    <!-- 价格 -->
    <view class="price"> ¥ {{ detail.goods_price }} </view>
    <!-- 标题 -->
    <view class="title">
      <view class="left">
        <view class="content line2">{{ detail.goods_name }}</view>
      </view>
      <view class="right">
        <text class="iconfont icon-shoucang"></text>
        <text>收藏</text>
      </view>
    </view>
    <!-- 图文详情 -->
    <view class="detail-content">
      <view>图文详情</view>
      <rich-text :nodes="detail.goods_introduce"></rich-text>
    </view>

    <!-- 底部 -->
    <view class="tool">
      <view class="c1">
        <text class="iconfont icon-kefu"></text>
        <text>客服</text>
      </view>
      <view class="c1">
        <text class="iconfont icon-fenxiang"></text>
        <text>分享</text>
      </view>
      <view class="c1" @click="go2cart">
        <text class="iconfont icon-gouwuchekong"></text>
        <text>购物车</text>
      </view>
      <view class="c2" @click="addCart">
        加入购物车
      </view>
      <view class="c3">
        立即购买
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      detail: {},
    }
  },
  onLoad(query) {
    this.getDetail(query.id)
  },
  methods: {
    // 请求详情
    async getDetail(id) {
      let res = await this.$http({
        url: '/goods/detail',
        data: {
          goods_id: id,
        },
      })
      console.log('详情', res)
      this.detail = res
    },
    // 加入购物车
    addCart() {
      //1. 尝试先从本地获取购物车
      // let carts = [...]
      //2. 判断当前商品之前有没有加入到购物车里面
      //3. 如果当前商品没有加入到购物车里面
      //   我们就现在添加进去, count = 1
      //4. 如果当前商品之前已经加入到购物车里面  count ++
      //5. 保存到本地

      //1. 从本地获取购物车
      let carts = uni.getStorageSync('carts') || []
      //2. 尝试通过当前详情页商品的id, 从carts里面获取商品
      let goods = carts.find(v => v.goods_id == this.detail.goods_id)
      //3. 判断
      if (!goods) {
        // 没有值 => 之前就没有加入到购物车里面过
        this.detail.count = 1
        this.detail.isChecked = true
        carts.push(this.detail)
      } else {
        // 有值 => 之前就加入到购物车里面过
        goods.count++
      }

      //4. 保存到本地
      uni.setStorageSync('carts', carts)

      //5. 提示
      uni.showToast({
        title: '加入购物车成功',
      })
    },
    // 跳转到购物车
    go2cart() {
      uni.switchTab({
        url: '/pages/cart/cart',
      })
    },
  },
}
</script>

<style lang="less" scoped>
swiper {
  width: 750rpx;
  height: 340rpx;
  image {
    width: 750rpx;
    height: 340rpx;
  }
}

.price {
  height: 80rpx;
  line-height: 80rpx;
  background: #fff;
  padding-left: 30rpx;
  font-size: 36rpx;
  color: #ff2a4d;
}

.title {
  border-top: 1px solid #666;
  border-bottom: 1px solid #666;
  display: flex;
  .left {
    flex: 1;
    // background: pink;
    .content {
      border-right: 1px solid #999;
      margin: 10rpx 0; // 处理border
      padding: 0 20rpx;
    }
  }
  .right {
    width: 160rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.detail-content {
  padding-bottom: 120rpx;
  view {
    height: 100rpx;
    line-height: 100rpx;
    padding-left: 30rpx;
    color: #ff2a4d;
    font-weight: 700;
    font-size: 40rpx;
  }
}

.tool {
  height: 120rpx;
  background: #fff;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  .c1 {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .c2 {
    flex: 2;
    background-color: orange;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    color: #fff;
  }
  .c3 {
    flex: 2;
    background: #ff2a4d;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    color: #fff;
  }
}
</style>
