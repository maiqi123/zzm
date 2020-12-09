<template>
  <view>
    <!-- 头部 -->
    <ugo-search></ugo-search>
    <!-- 盒子 -->
    <view class="cates">
      <!-- 左侧 -->
      <scroll-view scroll-y class="left">
        <block v-for="(tag, index) in leftCates" :key="index">
          <view @click="clickTag(index)" :class="{ active: activeIndex == index }">{{ tag }}</view>
        </block>
      </scroll-view>
      <!-- 右侧 -->
      <scroll-view scroll-y class="right">
        <block v-for="item in rightCates" :key="item.cat_id">
          <view class="container">
            <view class="container-title">
              <view>/</view>
              <view class="title">{{ item.cat_name }}</view>
              <view>/</view>
            </view>
            <view class="container-content">
              <navigator
                :url="'/pages/list/list?id=' + it.cat_id + '&name=' + it.cat_name"
                v-for="it in item.children"
                :key="it.cat_id"
              >
                <image mode="aspectFill" :src="it.cat_icon"></image>
                <text>{{ it.cat_name }}</text>
              </navigator>
            </view>
          </view>
        </block>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      cates: [], // 全部的分类数据
      activeIndex: 0, // 默认的高亮索引
    }
  },
  computed: {
    // 左侧数据
    leftCates() {
      return this.cates.map(v => v.cat_name)
    },
    // 右侧数据
    rightCates() {
      return this.cates.length > 0 && this.cates[this.activeIndex].children
      // return this.cates[0].children
    },
  },
  created() {
    let local_cates = uni.getStorageSync('cates')

    if (local_cates) {
      console.log('有值')

      // 判断有没有过期  10s
      // 7天 ==>  7 * 24 * 60 * 60 * 1000
      // 10s  10*1000
      let isLate = Date.now() - local_cates.time > 7 * 24 * 60 * 60 * 1000
      if (isLate) {
        console.log('过期了')
        this.getCates()
      } else {
        console.log('没有过期')
        this.cates = local_cates.data
      }
    } else {
      console.log('没有值')
      this.getCates()
    }
  },
  methods: {
    // 请求分类数据
    async getCates() {
      // 弹出加载框
      uni.showLoading({
        title: '努力加载中...',
      })

      let res = await this.$http({
        url: '/categories',
      })
      console.log('分类:', res)
      this.cates = res

      // 隐藏加载框
      uni.hideLoading()

      // 保存到本地
      // uni.setStorageSync('cates', this.cates)
      uni.setStorageSync('cates', {
        data: this.cates,
        time: Date.now(),
      })
    },
    // 点击左侧
    clickTag(index) {
      this.activeIndex = index
    },
  },
}
</script>

<style lang="less" scoped>
.cates {
  height: calc(100vh - 100rpx);
  background: #fff;
  display: flex;
  .left {
    flex: 1;
    // background: yellowgreen;
    view {
      background: #ddd;
      border-bottom: 1px solid #ccc;
      height: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-left: 8rpx solid #ddd;
    }
    view.active {
      border-left: 8rpx solid #ff2d4a;
      background: #eee;
    }
  }
  .right {
    flex: 3;
    // background: skyblue;
    .container {
      &-title {
        height: 80rpx;
        // background: yellow;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #666;
        .title {
          margin: 0 20rpx;
        }
      }
      &-content {
        display: flex;
        flex-wrap: wrap;
        navigator {
          width: 33.33%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20rpx 0;
          image {
            width: 100rpx;
            height: 100rpx;
            margin-bottom: 20rpx;
          }
        }
      }
    }
  }
}
</style>
