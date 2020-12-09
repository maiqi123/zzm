<template>
  <div>
    <hm-header>栏目管理</hm-header>
    <div class="container">
      <!-- 点击删除  -->
      <div class="title">点击删除一个频道</div>
      <div class="list">
        <div class="item" v-for="tab in activeTabs" :key="tab.id">
          <div @click="del(tab.id)">{{ tab.name }}</div>
        </div>
      </div>

      <!-- 点击添加 -->
      <div class="title">点击添加一个频道</div>
      <div class="list">
        <div class="item" v-for="tab in deactiveTabs" :key="tab.id">
          <div @click="add(tab.id)">{{ tab.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTabs: [], // 上面的数组
      deactiveTabs: [], // 下面的数组
    }
  },
  created() {
    this.getActiveTabsList()
  },
  watch: {
    // 监听 上面的数组
    // 数组(重写7个方法)和对象(deep)
    activeTabs(newVal) {
      console.log(newVal)
      // 保存
      localStorage.setItem('activeTabs', JSON.stringify(newVal))
      localStorage.setItem('deactiveTabs', JSON.stringify(this.deactiveTabs))
    },
  },
  methods: {
    // 获取 栏目列表
    async getActiveTabsList() {
      // 先尝试从本地获取
      let activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
      let deactiveTabs = JSON.parse(localStorage.getItem('deactiveTabs'))
      if (activeTabs && deactiveTabs) {
        this.activeTabs = activeTabs
        this.deactiveTabs = deactiveTabs
        return
      }

      let res = await this.$axios.get('/category')
      console.log('栏目', res.data.data)
      this.activeTabs = res.data.data
    },
    // 点击删除
    del(id) {
      // 从上面(activeTabs : [])删除 , 添加到下面(deactiveTabs:[])
      //1. 先根据id 找到 对应的tab
      let tab = this.activeTabs.find(v => v.id == id)
      //2. 先添加到下面
      this.deactiveTabs.push(tab)
      //3. 再从上面删除
      this.activeTabs = this.activeTabs.filter(v => v.id !== id)

      // save()
    },
    // 点击添加
    add(id) {
      //1. 先根据id 找到 对应的tab  (deactiveTabs)
      let tab = this.deactiveTabs.find(v => v.id == id)
      //2. 添加到上面
      this.activeTabs.push(tab)
      //3. 从下面删除
      this.deactiveTabs = this.deactiveTabs.filter(v => v.id !== id)
      // save()
    },
    // save(){}
  },
}
</script>

<style scoped lang="less">
.container {
  padding: 20px;
  .title {
    font-size: 20px;
    line-height: 35px;
    height: 35px;
    font-weight: 700;
    margin-top: 10px;
  }
  .list {
    // background: #ddd;
    display: flex;
    flex-wrap: wrap;
    .item {
      height: 40px;
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        height: 80%;
        width: 80%;
        background: #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
