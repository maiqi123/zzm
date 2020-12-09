// components/Son/Son.js
Component({
  /**
   * 组件的属性列表
   */
  // 第二步 : 在 子组件里面 接收
  properties: {
    msg : String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    send2father(){
      console.log('点击发送');
      // 第三步 : 子组件触发自定义事件
      this.triggerEvent('mytap','子的数据')
    }
  }
})
