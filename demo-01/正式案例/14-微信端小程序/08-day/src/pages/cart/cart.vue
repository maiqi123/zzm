<template>
  <view>
    <!-- 有地址 -->
    <view class="address" v-if="addrObj.userName">
      <view class="top">
        <view>{{ addrObj.userName }}</view>
        <view>{{ addrObj.telNumber }}</view>
      </view>
      <view class="bottom">{{ addrObj.addrStr }}</view>
    </view>
    <!-- 没有地址 -->
    <view class="no-address" v-else>
      <button @click="chooseAddress" type="primary">点击获取收货地址</button>
    </view>
    <!-- 购物车标题 -->
    <view class="title">购物车</view>
    <!-- 购物车列表 -->
    <view class="carts">
      <block v-for="goods in carts" :key="goods.goods_id">
        <view class="cart">
          <view class="left">
            <checkbox-group @change="toggleState(goods.goods_id)">
              <checkbox :checked="goods.isChecked"></checkbox>
            </checkbox-group>
          </view>
          <view class="center">
            <image mode="aspectFill" :src="goods.goods_small_logo"></image>
          </view>
          <view class="right">
            <view class="top line2">{{ goods.goods_name }}复</view>
            <view class="btm">
              <view class="price">¥ {{ goods.goods_price }}</view>
              <view class="edit">
                <view @click="add(goods.goods_id, -1)">-</view>
                <view>{{ goods.count }}</view>
                <view @click="add(goods.goods_id, 1)">+</view>
              </view>
            </view>
          </view>
        </view>
      </block>
    </view>
    <!-- 底部 -->
    <view class="tool">
      <view class="left">
        <checkbox-group @change="toggleAllChecked">
          <checkbox :checked="allChecked">全选</checkbox>
        </checkbox-group>
      </view>
      <view class="center">
        <view
          >合计 : <text>¥ {{ totalPrice }}</text></view
        >
        <view>包含运费</view>
      </view>
      <view class="right mg_center" @click="go2pay">结算({{ totalCount }})</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      addrObj: {}, // 收货地址对象
      carts: [], // 购物车
    }
  },
  computed: {
    //1. 总个数
    totalCount() {
      let total = 0
      this.carts.forEach(goods => {
        if (goods.isChecked) {
          total += goods.count
        }
      })
      return total
    },
    //2. 总价格
    totalPrice() {
      let total = 0
      this.carts.forEach(goods => {
        if (goods.isChecked) {
          total += goods.goods_price * goods.count
        }
      })
      return total
    },
    //3. 全选
    allChecked() {
      return this.carts.every(goods => goods.isChecked)
    },
  },

  onShow() {
    console.log('onShow')
    //1. 获取本地收货地址
    let addr_local = uni.getStorageSync('addr')
    if (addr_local) {
      this.addrObj = addr_local
    }
    //2. 获取本地购物车
    this.carts = uni.getStorageSync('carts') || []
  },

  onHide() {
    uni.setStorageSync('carts', this.carts)
  },

  methods: {
    // 点击 - 获取收货地址
    async chooseAddress() {
      //1. 获取收货地址
      let res = await uni.chooseAddress()
      console.log('收货地址', res[1])
      //2. 拼接字符串
      res[1].addrStr = `${res[1].provinceName}${res[1].cityName}${res[1].countyName}${res[1].detailInfo}`
      //3. 保存到 data
      this.addrObj = res[1]
      //4. 保存到本地
      uni.setStorageSync('addr', this.addrObj)
    },
    // 点击  + -
    add(id, count) {
      console.log(id, count)
      //1. 根据id 找到对应的商品
      let goods = this.carts.find(goods => goods.goods_id == id)

      //2. 判断 : 当当前商品count=1,并且点击- => 确认框
      if (goods.count == 1 && count == -1) {
        uni.showModal({
          title: '提示',
          content: '您确定要删除该商品吗?',
          success: res => {
            if (res.confirm) {
              console.log('用户点击确定')

              // 把当前商品从购物车里面移除
              this.carts = this.carts.filter(v => v.goods_id != id)
            }
          },
        })
      } else {
        //2.2 修改count
        goods.count += count
      }
    },
    // 切换每个商品的状态
    toggleState(id) {
      console.log('切换了:', id)
      //1. 根据id 找到购物车里面对应的商品
      let goods = this.carts.find(v => v.goods_id == id)
      //2. 把商品的选中状态 => 取反
      goods.isChecked = !goods.isChecked
    },
    // 切换全选
    toggleAllChecked() {
      // 全选状态 : true => 说明每一个商品都是true
      // 点击切换 ==>      让每个商品的状态都取反 false
      //1. 获取数据
      let tempAllChecked = !this.allChecked
      let tempCarts = this.carts

      //2. 遍历购物车, 让每个商品的状态都取反
      tempCarts.forEach(goods => {
        goods.isChecked = tempAllChecked
      })

      //3. 赋值回去
      this.carts = tempCarts
    },
    // 跳转到支付页面
    go2pay() {
      //1. 如果没有地址 不要跳转到支付页
      if (!this.addrObj.userName) {
        uni.showToast({
          icon: 'none',
          title: '没有收货地址',
        })
        return
      }

      //2. 如果没有购物车选中的商品, 不要跳转到支付页
      // let hasMore = this.carts.some(v => v.isChecked)
      if (this.totalCount == 0) {
        uni.showToast({
          icon: 'none',
          title: '没有要支付的商品',
        })
        return
      }

      // 3. 跳转到支付页
      uni.navigateTo({
        url: '/pages/pay/pay',
      })
    },
  },
}
</script>

<style scoped lang="less">
.no-address {
  height: 120rpx;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.address {
  height: 120rpx;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10rpx;
  .top {
    display: flex;
    justify-content: space-between;
  }
}

.title {
  height: 100rpx;
  line-height: 100rpx;
  color: #ff2d4a;
  border-top: 1px solid #ff2d4a;
  border-bottom: 1px solid #ff2d4a;
  padding-left: 30rpx;
  font-size: 32rpx;
}

.carts {
  .cart {
    display: flex;
    height: 200rpx;
    background: #fff;
    border-bottom: 1px solid #ccc;
    padding-left: 20rpx;
    .left {
      flex: 1;
      // background: pink;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .center {
      flex: 3;
      display: flex;
      justify-content: center;
      align-items: center;
      image {
        width: 140rpx;
        height: 140rpx;
      }
    }
    .right {
      flex: 6;
      // background: skyblue;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20rpx;
      .btm {
        display: flex;
        justify-content: space-between;
        .price {
          color: #ff2d4a;
        }
        .edit {
          display: flex;
          view:nth-child(2n + 1) {
            border: 1px solid #666;
            width: 40rpx;
            height: 40rpx;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          view:nth-child(2) {
            margin: 0 20rpx;
          }
        }
      }
    }
  }
}

.tool {
  height: 100rpx;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  display: flex;
  .left {
    flex: 2;
    // background: skyblue;
    display: flex;
    padding-left: 30rpx;
    align-items: center;
  }
  .center {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8rpx;
    align-items: flex-end;
    text {
      color: #ff2d4a;
    }
  }
  .right {
    flex: 1.5;
    background: #ff2d4a;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    color: #fff;
    font-size: 34rpx;
    font-weight: 700;
  }
}
</style>
