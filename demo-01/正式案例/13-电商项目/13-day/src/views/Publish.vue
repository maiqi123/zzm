<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>发布文章</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表单 -->
    <el-form :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <quill-editor v-model="form.content"></quill-editor>
      </el-form-item>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品自定义分类" prop="region">
          <el-select
            v-model="ruleForm.region"
            placeholder="请选择活动区域"
            clearable
          >
            <el-option label="商品一" value="shanghai"></el-option>
            <el-option label="商品二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form-item label="栏目">
        <el-checkbox-group v-model="form.categories">
          <el-checkbox v-for="tab in tabsList" :key="tab.id" :label="tab.id">{{
            tab.name
          }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- 封面 -->
      <el-form-item label="封面">
        <el-upload
          :action="$axios.defaults.baseURL + '/upload'"
          :headers="headers"
          list-type="picture-card"
          :on-success="uploadSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <!-- 类型 -->
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 发布 -->
      <el-form-item>
        <el-button @click="publish" type="primary">点击发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "", //文章标题
        content: "", //文章内容
        categories: [], // 栏目id
        cover: [], // 封面图片
        type: 1 // 1-文章 2-视频
      },
      tabsList: [], // 栏目列表
      headers: {
        Authorization: localStorage.getItem("token")
      },
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getTabsList();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  // 获取栏目列表
  async getTabsList() {
    let res = await this.$axios.get("/category");
    console.log("栏目列表", res.data);
    this.tabsList = res.data.data;
    // 过滤出来 不是 关注 和 头条
    this.tabsList = this.tabsList.filter(v => {
      return v.name !== "关注" && v.name !== "头条";
    });
  },
  // 文件上传
  uploadSuccess(res) {
    console.log("文件上传", res.data.url);
    // this.cover.push(res.data.url)
    // cover: ['/upalode/001','uploade/002']
    this.form.cover.push({
      id: res.data.id,
      url: res.data.url
    });
  },
  // 发布
  async publish() {
    //1. 处理 categories
    // [1,2] ==> [{id:1,id:2}]  map 数量前后一样
    this.form.categories = this.form.categories.map(v => {
      return {
        id: v
      };
    });
    let res = await this.$axios.post("/post", this.form);
    console.log("发布文章", res.data);
    if (res.data.statusCode === 200) {
      //1. 提示
      this.$message.success("发布成功");

      //2. 跳转到 list
      this.$router.push("/home/list");
    }
  }
};
</script>

<style scoped lang="less">
.el-form {
  margin-top: 20px;
}

.quill-editor {
  background: #fff;
  /deep/ .ql-container {
    height: 200px;
  }
}
</style>
