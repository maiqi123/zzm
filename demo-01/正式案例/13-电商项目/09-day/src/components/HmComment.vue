<template>
  <div class="hm-comment">
    <!-- 1. 头部 -->
    <div class="header">
      <div class="left">
        <img :src="$axios.defaults.baseURL + comment.user.head_img" alt="" />
      </div>
      <div class="center">
        <div class="name">{{ comment.user.nickname }}</div>
        <div class="date">{{ comment.create_date }}</div>
      </div>
      <div class="right">
        回复
      </div>
    </div>
    <!-- 2. 楼层 -->
    <hm-floor
      :count="getCount(0, comment)"
      v-if="comment.parent"
      :parent="comment.parent"
    ></hm-floor>
    <!-- 3. 内容 -->
    <div class="content">{{ comment.content }}</div>
  </div>
</template>

<script>
export default {
  props: ['comment'],
  methods: {
    // 递归来查询parent的个数
    getCount(num, parent) {
      if (parent.parent) {
        return this.getCount(num + 1, parent.parent)
      } else {
        return num
      }
    },
  },
}
</script>

<style scoped lang="less">
.hm-comment {
  padding: 20px;
  border-bottom: 1px solid #ccc;
  .header {
    display: flex;
    align-items: center;
    .left {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .center {
      padding-left: 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 50px;
      line-height: 25px;
      .date {
        color: #999;
      }
    }
    .right {
      width: 50px;
      color: #999;
    }
  }
  .content {
    margin-top: 5px;
  }
}
</style>
