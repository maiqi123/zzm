<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <!-- 
      el-table 表格 
        data : 表格要显示的数据
      el-table-column : 表格列
     -->
    <el-table :data="postList" style="width: 100%">
      <!-- 序号有点特殊, 待会处理 -->
      <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
      <el-table-column prop="title" label="标题" width="180"> </el-table-column>
      <el-table-column prop="user.nickname" label="作者" width="80"> </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          <div>{{ scope.row.create_date | date }}</div>
        </template>
      </el-table-column>
      <el-table-column label="封面" width="180">
        <template slot-scope="scope">
          <img :src="$axios.defaults.baseURL + scope.row.cover[0].url" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row.id)" type="primary" icon="el-icon-edit"></el-button>
          <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="currentChange"
      :page-size="3"
      background
      layout="prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎2',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎3',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎4',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
      postList: [], // 文章列表
      total: 0, // 总页数
      pageIndex: 1, // 页码
      pageSize: 3, // 每页个数
    }
  },
  created() {
    this.getPostList()
  },
  methods: {
    // 获取文章列表
    async getPostList() {
      let res = await this.$axios.get('/post', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      })
      console.log('文章列表', res.data)
      this.total = res.data.total
      this.postList = res.data.data
    },
    // 编辑
    edit(id) {
      console.log('编辑', id)
    },
    // 删除
    del(id) {
      console.log('删除', id)
    },
    // 切换页码
    currentChange(cur) {
      console.log('12---', cur)
      //1. 把当前页 修改一下
      this.pageIndex = cur //3
      //2. 发送请求
      this.getPostList()
    },
    // 自定义索引的方法
    // 1. 如果 :index='方法' , 方法有参数和返回值的
    // 2. 参数 : 是行号(从0开始的)
    // 3. 返回值 ： 返回的就是要显示的
    indexMethod(index) {
      console.log(index)
      // 1  4
      // 2  5
      // 3  6
      // (index + 1)  + ( this.pageIndex - 1  ) *  this.pageSize
      return index + 1 + (this.pageIndex - 1) * this.pageSize
    },
  },
}
</script>

<style scoped lang="less">
.el-table {
  margin-top: 20px;
  margin-bottom: 20px;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }
}
</style>
