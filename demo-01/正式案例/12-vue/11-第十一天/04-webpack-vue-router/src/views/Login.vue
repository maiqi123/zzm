<template>
  <div class="login">
    用户名: <input type="text"> <br><br>
    密码:   <input type="text"> <br><br>
    <button @click="login">立刻登录</button>
    <hm-button></hm-button>
    <p>没有账号? 去 <router-link to="/register">注册</router-link></p>
  </div>
</template>

<script>
export default {
  methods: {
    login () {
      this.$router.push('/home')
    }
  }
}
</script>

<style>

</style>