<template>
  <view>
    <!-- tab部分 -->
    <ugo-tab @mytap="toggletab" :tabs="tabs"></ugo-tab>
    <!-- 列表部分 -->
    <view class="orders">
      <block v-for="item in list" :key="item.order_id">
        <view class="order">
          <view class="t">
            <view>订单编号</view>
            <view>{{ item.order_number }}</view>
          </view>
          <view class="t">
            <view>订单价格</view>
            <view class="price">¥ {{ item.order_price }}</view>
          </view>
          <view class="t">
            <view>订单日期</view>
            <view>{{ item.create_time | date }}</view>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { id: 1, title: '全部', isActive: true },
        { id: 2, title: '待付款', isActive: false },
        { id: 3, title: '待发货', isActive: false },
        { id: 4, title: '退款/退货', isActive: false },
      ],
      list: [],
    }
  },
  onLoad() {
    // 获取订单信息
    this.getOrdersById()
  },
  methods: {
    toggletab(id) {
      console.log('order页面:', id)
      //1. 切换高亮
      this.changeActiveById(id)
      //2. 切换数据
      this.getOrdersById(id)
    },
    // 通过id切换tab的高亮
    changeActiveById(id) {
      this.tabs.forEach(v => {
        if (v.id == id) {
          v.isActive = true
        } else {
          v.isActive = false
        }
      })
    },
    // 获取订单信息
    async getOrdersById(id = 1) {
      let res = await this.$http_pay({
        url: '/my/orders/all',
        method: 'GET',
        header: {
          Authorization: uni.getStorageSync('token'),
        },
        data: {
          type: id,
        },
      })
      console.log('订单', res)
      this.list = res.orders
    },
  },
}
</script>

<style lang="less" scoped>
.orders {
  .order {
    height: 180rpx;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20rpx;
    color: #666;
    .t {
      display: flex;
      justify-content: space-between;
      .price {
        color: #ff2d4a;
      }
    }
  }
}
</style>
