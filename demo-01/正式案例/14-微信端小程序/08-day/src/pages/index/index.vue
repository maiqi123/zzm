<template>
  <view>
    <!-- 1. 搜索头部 -->
    <ugo-search></ugo-search>
    <!-- 2. 轮播图 -->
    <view class="slider">
      <swiper
        :indicator-dots="true"
        :autoplay="true"
        :interval="3000"
        :duration="1000"
        :circular="true"
      >
        <block v-for="item in swipers" :key="item.goods_id">
          <swiper-item>
            <image :src="item.image_src"></image>
          </swiper-item>
        </block>
      </swiper>
    </view>
    <!-- 3. 导航 -->
    <view class="navs">
      <block v-for="item in navs" :key="item.name">
        <view class="item">
          <image :src="item.image_src"></image>
        </view>
      </block>
    </view>
    <!-- 4. 楼层 -->
    <view class="floors">
      <block v-for="(item, index) in floors" :key="index">
        <view class="floor">
          <!-- 标题 -->
          <view class="floor-title">
            <image :src="item.floor_title.image_src"></image>
          </view>
          <!-- 主体 -->
          <view class="floor-body">
            <view class="left">
              <image :src="item.product_list[0].image_src"></image>
            </view>
            <view class="right">
              <image
                :style="{ width: item.product_list[1].image_width + 'rpx' }"
                :src="item.product_list[1].image_src"
              ></image>
              <image
                :style="{ width: item.product_list[2].image_width + 'rpx' }"
                :src="item.product_list[2].image_src"
              ></image>
              <image
                :style="{ width: item.product_list[3].image_width + 'rpx' }"
                :src="item.product_list[3].image_src"
              ></image>
              <image
                :style="{ width: item.product_list[4].image_width + 'rpx' }"
                :src="item.product_list[4].image_src"
              ></image>
            </view>
          </view>
        </view>
      </block>
    </view>

    <!-- 回到顶部 -->
    <view class="top" @click="go2top" v-if="isShow">
      <text class="iconfont icon-shangjiantou"></text>
      <text>顶部</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      swipers: [], //轮播图
      navs: [], // 导航
      floors: [], // 楼层
      isShow: false, // 隐藏
    }
  },
  created() {
    this.getSwipers()
    this.getNavs()
    this.getFloors()
  },
  onPageScroll(e) {
    // console.log('滚动了', e.scrollTop)
    if (e.scrollTop >= 300) {
      this.isShow = true
    } else {
      this.isShow = false
    }
  },
  methods: {
    // 请求轮播图
    async getSwipers() {
      let res = await this.$http({
        url: '/home/swiperdata',
      })
      console.log('轮播图', res)
      this.swipers = res
    },
    // 请求导航
    async getNavs() {
      let res = await this.$http({
        url: '/home/catitems',
      })
      // console.log('导航', res)
      this.navs = res
    },
    // 请求楼层
    async getFloors() {
      let res = await this.$http({
        url: '/home/floordata',
      })
      // console.log('楼层', res)
      this.floors = res
    },
    // 点击滚动到顶部
    go2top() {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      })
    },
  },
}
</script>

<style lang="less" scoped>
swiper {
  height: 340rpx;
  width: 750rpx;
  image {
    height: 340rpx;
    width: 750rpx;
  }
}

.navs {
  display: flex;
  justify-content: space-around;
  padding: 24rpx 0;
  .item {
    image {
      width: 128rpx;
      height: 128rpx;
    }
  }
}

.floors {
  .floor {
    &-title {
      padding-top: 30rpx;
      background: #eee;
      image {
        width: 750rpx;
        height: 59rpx;
      }
    }
    &-body {
      display: flex;
      background: #fff;
      padding: 16rpx;
      .left {
        margin-right: 10rpx;
        image {
          width: 232rpx;
          height: 386rpx;
          vertical-align: middle;
        }
      }
      .right {
        image {
          width: 233rpx;
          height: 188rpx;
          vertical-align: middle;
        }
        image:nth-child(-n + 2) {
          margin-bottom: 10rpx;
        }
        image:nth-child(2n + 1) {
          margin-right: 10rpx;
        }
      }
    }
  }
}

.top {
  width: 100rpx;
  height: 100rpx;
  background: #ddd;
  position: fixed;
  right: 20rpx;
  bottom: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>
