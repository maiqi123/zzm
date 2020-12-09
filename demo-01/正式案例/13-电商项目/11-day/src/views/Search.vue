<template>
  <div>
    <div class="header">
      <div class="left">
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="center">
        <input
          @input="search_recommend"
          v-model="keyword"
          @keyup.enter="search"
          type="text"
          placeholder="请输入搜索的内容"
        />
        <i class="iconfont iconsearch"></i>
      </div>
      <div class="right" @click="search">搜索</div>
    </div>
    <!-- 搜索推荐 -->
    <div class="search_recommend" v-if="recommendList.length > 0">
      <div v-for="item in recommendList" :key="item.id">{{ item.title }}</div>
    </div>
    <!-- 列表 -->
    <div class="content" v-else-if="postList.length > 0">
      <hm-post v-for="post in postList" :key="post.id" :post="post"></hm-post>
    </div>
    <!-- 历史 -->
    <div class="history" v-else>
      <!-- 历史记录 -->
      <div class="title">历史记录</div>
      <div class="list">
        <div @click="clickHistoryTag(h)" class="item" v-for="h in historyList" :key="h">{{ h }}</div>
      </div>
      <!-- 热门搜索 -->
      <div class="title">热门搜索</div>
      <div class="list">
        <div @click="clickHistoryTag(hot)" class="item" v-for="hot in hotList" :key="hot">{{ hot }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data() {
    return {
      // 要搜索的关键字
      keyword: '',
      // 文章列表
      postList: [],
      // 历史记录
      historyList: [],
      // 热门搜索
      hotList: ['关晓彤', '1', '情火'],
      // 搜索推荐
      recommendList: [],
    }
  },
  watch: {
    keyword(newVal) {
      if (!newVal) {
        // 输入框内容为 空的时候
        //  把 搜索列表清空, 推荐搜索列表清空
        this.postList = []
        this.recommendList = []
      }
    },
  },
  created() {
    // 提前把防抖和节流的函数都处理好
    this.search_recommend = _.debounce(this.search_recommend, 500)

    let historyList = JSON.parse(localStorage.getItem('history_list'))

    if (historyList) {
      this.historyList = historyList
    }
  },
  methods: {
    // 开始搜索
    async search() {
      //1. 排空
      if (this.keyword.trim() === '') return

      //3. 把 输入内容 添加到历史记录里面
      this.historyList.unshift(this.keyword)

      // 先处理去重,处理完去重了再保存到本地
      this.historyList = [...new Set(this.historyList)]

      localStorage.setItem('history_list', JSON.stringify(this.historyList))

      //2. 发送 请求
      let res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.keyword,
        },
      })
      console.log('搜索结构', res.data)
      this.postList = res.data.data
    },
    // 点击历史记录标签
    clickHistoryTag(h) {
      //1. 赋值 给 keyword
      this.keyword = h
      //2. 搜索
      this.search()
    },
    // 搜索推荐
    async search_recommend() {
      if (this.keyword.trim() === '') return

      console.log('推荐', this.keyword)
      let res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.keyword,
        },
      })
      console.log('搜索推荐', res.data.data)
      this.recommendList = res.data.data
    },
  },
}
</script>

<style scoped lang="less">
.header {
  height: 40px;
  background: #ddd;
  border-bottom: 1px solid #ccc;
  display: flex;
  .left {
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right {
    width: 50px;
    display: flex;
    align-items: center;
  }
  .center {
    flex: 1;
    // background: pink;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    input {
      height: 30px;
      width: 90%;
      border: none;
      border: 1px solid #ccc;
      border-radius: 15px;
      text-indent: 2em;
    }
    i {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.history {
  padding: 10px;
  .title {
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    color: #000;
    font-weight: 700;
    margin-top: 20px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    .item {
      background: #ddd;
      padding: 10px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}

.search_recommend {
  padding: 10px;
  div {
    border-bottom: 1px solid #ccc;
    line-height: 50px;
    height: 50px;
    font-size: 16px;
  }
}
</style>
