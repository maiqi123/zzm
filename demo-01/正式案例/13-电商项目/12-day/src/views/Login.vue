<template>
  <!-- el-form 表单组件
    model : 表单数据对象 (收集的)
    rules : 校验 
    label-width : 同一设置了label的宽度

   -->
  <el-form :rules="rules" :model="form" ref="form" label-width="80px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据对象(收集)
      form: {
        username: '10086',
        password: '123',
      },
      // 校验规则对象
      rules: {
        username: [
          // 1. 判断是否为空   required : true 必填 , 为空的提示, 触发
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          // 2. 判断格式是否正确
          { pattern: /^1\d{3,5}$/, message: '用户名格式错误', trigger: ['blur', 'change'] },
        ],
        password: [
          //1. 判断是否为空
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          //2. 判断格式是否正确
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['blur', 'change'] },
        ],
      },
    }
  },
  methods: {
    async login() {
      try {
        await this.$refs.form.validate()

        // 发送请求
        let res = await this.$axios.post('/login', this.form)
        console.log('登录', res.data)
        const { message, statusCode, data } = res.data
        if (statusCode === 200) {
          //1. 提示
          this.$message.success(message)
          //2. 保存token
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))

          //3. 跳转
          this.$router.push('/home/list')
        } else {
          this.$message.error(message)
        }
      } catch (error) {
        console.log('校验失败')
        this.$message.error('校验失败')
      }
    },
    // submitForm(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       alert('submit!')
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style scoped lang="less">
.el-form {
  width: 400px;
  margin: 0 auto;
  margin-top: 100px;
  border: 1px solid #ccc;
  padding: 40px 40px 20px 20px;
  border-radius: 20px;
}
</style>
