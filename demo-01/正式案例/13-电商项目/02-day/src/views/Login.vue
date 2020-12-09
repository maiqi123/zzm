<template>
  <div>
    <!-- 头部 -->
    <hm-header>登录</hm-header>
    <!-- logo -->
    <hm-logo></hm-logo>

    <!-- 输入框 -->
    <van-field
      v-model="username"
      required
      label="用户名"
      placeholder="请输入用户名"
      :error-message="usernameErrMsg"
      clearable
      @input="checkUsername"
      @clear="clearUsername"
    />
    <van-field
      v-model="password"
      required
      label="密码"
      placeholder="请输入密码"
      :error-message="passwordErrMsg"
      clearable
      @input="checkPassword"
      @clear="clearPassword"
    />

    <!-- 按钮 -->
    <hm-button @click.native="startLogin">登录</hm-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '', // 用户名
      password: '', // 密码
      usernameErrMsg: '', // 用户名校验信息
      passwordErrMsg: '', // 密码校验信息
    }
  },
  created() {
    console.log(this.$route)
    const { username, password } = this.$route.query

    if (username && password) {
      this.username = username
      this.password = password
    }
  },
  methods: {
    // 校验用户名
    checkUsername() {
      const reg = /^1\d{3,5}$/
      if (reg.test(this.username)) {
        this.usernameErrMsg = ''
      } else {
        this.usernameErrMsg = '用户名格式不正确'
      }
    },
    // 清除用户名
    clearUsername() {
      this.usernameErrMsg = ''
    },
    // 校验 密码
    checkPassword() {
      const reg = /^\d{3,12}$/
      if (reg.test(this.password)) {
        this.passwordErrMsg = ''
      } else {
        this.passwordErrMsg = '密码格式不正确'
      }
    },
    // 清除密码
    clearPassword() {
      this.passwordErrMsg = ''
    },
    // 开始登录
    startLogin() {
      // 有值 + 正确
      if (
        this.username !== '' &&
        this.password !== '' &&
        this.usernameErrMsg === '' &&
        this.passwordErrMsg === ''
      ) {
        axios
          .post('http://localhost:3000/login', {
            username: this.username,
            password: this.password,
          })
          .then(res => {
            console.log('登录结果', res)
            const { statusCode, message, data } = res.data

            if (statusCode === 200) {
              // 1. 保存token
              localStorage.setItem('token', data.token)

              // 2. 提示
              this.$toast.success(message)

              // 3. 跳转  /user
              ]
              this.$router.push('/user')
            } else {
              this.$toast.fail(message)
            }
          })
      } else {
        this.$toast.loading('校验失败')
      }
    },
  },
}
</script>

<style lang="less" scoped>
h1 {
  color: red;
}
</style>
