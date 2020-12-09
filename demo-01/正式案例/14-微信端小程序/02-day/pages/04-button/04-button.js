// pages/04-button/04-button.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 在小程序里面, 事件处理函数 , 形参都是事件对象
  fn1(e){
    console.log('点击了',e.currentTarget.dataset);
  }
})