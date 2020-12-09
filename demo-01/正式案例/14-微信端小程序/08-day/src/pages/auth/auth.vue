<template>
  <view>
    <button open-type="getUserInfo" @getuserinfo="getUserInfo" type="primary" plain>
      获取授权
    </button>
  </view>
</template>

<script>
export default {
  methods: {
    // 获取用户信息
    async getUserInfo(e) {
      //1. 获取前四个参数
      const { encryptedData, rawData, iv, signature } = e.detail

      //2. 获取最后一个参数
      const r = await uni.login()
      const { code } = r[1]
      console.log(code)
      //3. 请求
      let res = await this.$http_pay({
        url: '/users/wxlogin',
        data: {
          encryptedData,
          rawData,
          iv,
          signature,
          code,
        },
      })

      console.log('登录结果:', res)

      //4. 收尾工作
      //4.1 提示
      uni.showToast({
        title: '授权成功',
      })
      //4.2 token保存到本地
      uni.setStorageSync('token', res.token)
      //4.3 返回到支付页
      setTimeout(() => {
        uni.navigateBack()
      }, 1000)
    },
  },
}
</script>

<style lang="less" scoped>
button {
  margin-top: 60rpx;
  width: 60%;
}
</style>
