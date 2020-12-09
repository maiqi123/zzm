<template>
  <div>
    <!-- 头部 -->
    <hm-header>编辑资料</hm-header>
    <!-- 头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt="">
      <van-uploader class="uploader" :after-read="afterRead"  />
    </div>
    <!-- 列表 -->
    <van-cell-group>
      <van-cell @click='showNickname'  title="昵称" :value="info.nickname" is-link />
      <van-cell title="密码" value="******" is-link/>
      <van-cell @click="showGender" title="性别" :value="info.gender ===1 ? '男':'女'" is-link />
    </van-cell-group>

    <!-- 修改昵称的弹框 -->
    <van-dialog @confirm='confirmNickname' v-model="isShowNickname" title="修改昵称" show-cancel-button>
      <van-field  v-model='nickname'  placeholder="请输入新昵称" />
    </van-dialog>
    
    <!-- 修改性别的弹框 -->
    <van-dialog @confirm='confirmGender'  v-model="isShowGender" title="修改性别" show-cancel-button>
     <van-radio-group v-model="gender">
      <van-cell-group>
        <van-cell title="男" clickable @click="gender = 1">
          <template #right-icon>
            <van-radio :name="1" />
          </template>
        </van-cell>
        <van-cell title="女" clickable @click="gender = 0">
          <template #right-icon>
            <van-radio :name="0" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    </van-dialog>

  </div>
</template>

<script>
export default {

  data(){
    return {
      info : {}, // 用户信息对象
      isShowNickname : false, // 是否显示修改昵称的弹框
      nickname : '', // 最新修改的昵称
      isShowGender:false, // 是否显示修改性别的弹框
      gender : 0
    }
  },

  created(){
    this.getInfo()
  },
  methods: {
    // 获取用户信息
    getInfo(){

      let token = localStorage.getItem('token')
      let user_id = localStorage.getItem('user_id')

      this.$axios.get(`/user/${user_id}`).then(res => {
        console.log('用户信息',res.data);
        const {  statusCode, data,message } = res.data
        if (statusCode === 200) {
          
          this.info = data
        } else {
          this.$toast.fail(message)
        }
      })
    },
    // 点击cell显示修改昵称
    showNickname(){
      // 显示 
      this.isShowNickname = true
      // 给 nickname 赋值
      this.nickname = this.info.nickname
    },
    // 点击弹框内的确定按钮
    confirmNickname(){
      
      // 1. 请求之前的判断
      if (this.nickname === this.info.nickname) {
        this.$toast('新旧昵称不能一样')
        return 
      }

      // 2. 发送请求修改昵称
      
      this.ml_editUser({
        nickname : this.nickname
      })
      // let user_id = localStorage.getItem('user_id')
      // let token = localStorage.getItem('token')
      // this.$axios.post(`/user_update/${user_id}`,{
      //   nickname : this.nickname
      // }).then(res => {
      //   console.log('修改昵称',res.data);
      //   // 1. 获取最新的昵称
      //   this.getInfo()

      //   // 2. 弹框
      //   this.$toast.success('修改昵称成功')

      // })

    },
    // 点击cell 显示修改性别
    showGender(){
      //1. 显示弹框
      this.isShowGender =  true
      //2. 数据回显
      this.gender = this.info.gender
    },
    // 点击弹框内的确定按钮
    confirmGender(){
      //1. 判断
      if (this.gender === this.info.gender) {
        this.$toast('新旧性别不能一样')
        return 
      }
      //2. 发送请求
      this.ml_editUser({
         gender : this.gender
      })
      // let user_id = localStorage.getItem('user_id')
      // let token = localStorage.getItem('token')
      // this.$axios.post(`/user_update/${user_id}`,{
      //   gender : this.gender
      // }).then(res => {
      //   console.log('修改 性别',res.data);
      //   //2.1 获取最新的数据
      //   this.getInfo()
      //   //2.2 弹框
      //   this.$toast.success('修改成功')
      // })
    },
    // 封装后的函数 - 编辑资料
    ml_editUser(data){
     
     let user_id = localStorage.getItem('user_id')
      this.$axios.post(`/user_update/${user_id}`,data).then(res => {
       
        //1 获取最新的数据
        this.getInfo()
        //2 弹框
        this.$toast.success(res.data.message)
      })
    },
    // 读取图片后的回调
    afterRead(data){
      console.log('图片',data.file);
      //1. 借助 FormData 帮我们上传  ==> data 
      let formdata = new FormData()
      formdata.append('file',data.file)

      //2. 上传
      this.$axios.post('/upload',formdata).then(res => {
        console.log('文件上传',res.data.data.url);
        this.ml_editUser({
          head_img : res.data.data.url
        })
      })

    }
  }
}
</script>

<style scoped lang='less'>

.avatar {
  text-align: center;
  margin: 20px 0 ;
  position: relative;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
  }
  .uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    opacity: 0;
  }
}

</style>