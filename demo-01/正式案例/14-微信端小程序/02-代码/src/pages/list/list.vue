<template>
  <view>
    <!-- tab -->
    <!-- 子传父第二步 : 通过自定义事件传递给子 -->
    <ugo-tab @mytap="toggleTab" :tabs="tabs"></ugo-tab>
    <!-- 内容 -->
    <view v-if="tabs[0].isActive">
      <block v-for="goods in list" :key="goods.goods_id">
        <ugo-goods :goods="goods"></ugo-goods>
      </block>
    </view>
    <view v-if="tabs[1].isActive">销量部分2</view>
    <view v-if="tabs[2].isActive">价格部分3</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { id: 1, title: '综合', isActive: true },
        { id: 2, title: '销量', isActive: false },
        { id: 3, title: '价格', isActive: false },
      ],
      list: [],
      pagenum: 1,
      id: 1,
      hasMore: true,
    }
  },
  onLoad(query) {
    const { id, name } = query
    this.id = id

    //1. id ==> 请求
    this.getList()
    //2. name => 设置导航栏标题
    uni.setNavigationBarTitle({
      title: name,
    })
  },
  methods: {
    // 子传父的第一步 : 父准备好一个方法
    toggleTab(id) {
      console.log('父的方法被调用了', id)

      this.tabs.forEach(v => {
        if (v.id == id) {
          v.isActive = true
        } else {
          v.isActive = false
        }
      })
    },
    // 获取列表
    async getList() {
      uni.showLoading({
        title: '努力加载中...',
      })

      let res = await this.$http({
        url: '/goods/search',
        data: {
          cid: this.id,
          pagenum: this.pagenum,
          pagesize: 10,
        },
      })

      uni.hideLoading()

      // 停止下拉刷新的动画
      uni.stopPullDownRefresh()

      console.log('列表', res.goods)
      this.list = [...this.list, ...res.goods]
      if (res.goods.length < 10) {
        this.hasMore = false
      }
    },
  },
  onReachBottom() {
    if (!this.hasMore) {
      uni.showToast({
        icon: 'none',
        title: '没有更多数据了',
      })
      return
    }
    this.pagenum++
    this.getList()
  },
  onPullDownRefresh() {
    console.log('下拉刷新')
    //1. 重置
    this.pagenum = 1
    this.list = []
    this.hasMore = true

    //2. 再次获取
    this.getList()
  },
}
</script>

<style></style>
