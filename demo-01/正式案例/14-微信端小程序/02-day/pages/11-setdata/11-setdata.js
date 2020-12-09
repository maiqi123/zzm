// pages/11-setdata/11-setdata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name : '张三'
  },

  update(){
    // 1. 获取数据
    console.log(this.data.name);
    
    //2. 修改
    // 说明 : 这种直接修改数据的方法, 只能更新 data 里面的数据, 不能更新视图
    // this.data.name = '李四'
    // 作用 : 1. 修改数据  2.更新视图
    // 更新特点: 更新数据(同步) 更新视图(异步)
    this.setData({
      name : '李四'
    })
    
    //3. 打印
    console.log(this.data.name);
      
  }

})