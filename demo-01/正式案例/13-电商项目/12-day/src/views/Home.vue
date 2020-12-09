<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <div class="logo">黑马头条</div>
        <!-- 导航菜单 -->
        <!-- 
          el-menu  导航菜单 
            - el-submenu : 子菜单(可展开) >> el-menu-item : 菜单元素(最小单位)
            - el-menu-item : 菜单元素(最小单位)
           default-active="2" 默认高亮  

         router='true'  意思把 `true`的 字符串类型 赋值给 router  
         :router='true'  意思把 `true`的 原始类型/ 布尔类型 赋值给 router  
         -->
        <el-menu
          :router="true"
          :default-active="$route.path"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/home/list">
            <i class="el-icon-s-operation"></i>
            <span slot="title">文章列表</span>
          </el-menu-item>
          <el-menu-item index="/home/publish">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <img src="../styles/7.png" alt="" />
          <span>马哥123</span>
          <a href="javascript:void(0)" @click="logout">退出</a>
        </el-header>
        <el-main>
          <!-- list 和 publish 的出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    // 退出
    async logout() {
      try {
        await this.$confirm('此操作将退出该账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })

        // 1. 删除本地token+user
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        // 2. 提示成功
        this.$message.success('退出成功')
        // 3. 跳转返回
        this.$router.push('/login')
      } catch (error) {
        console.log('点击取消')
      }
      //1. 弹框
      //2. 点击确定还是取消
    },
  },
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-container {
    height: 100%;
  }
}

.el-header {
  background-color: #b3c0d1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  span {
    margin: 0 20px;
  }
}
.el-aside {
  background-color: #545c64;
  .logo {
    width: 100%;
    height: 60px;
    background: #333;
    color: #fff;
    font-size: 26px;
    line-height: 60px;
    text-align: center;
  }
}

.el-main {
  background-color: #e9eef3;
}
</style>
