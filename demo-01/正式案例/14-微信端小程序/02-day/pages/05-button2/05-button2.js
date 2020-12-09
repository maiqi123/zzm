// pages/05-button2/05-button2.js
Page({
    submit(e){
      //1. 这里要注意, 收集表单的数据,要添加 name 
      //2. 大家不要去背  e.detail.value 
      //3. 只需要记住两点,  e.currentTarget   或者 e.detail 
      console.log(e.detail.value);
    },
    // 获取用户信息
    getUserInfo(e){
      console.log(e.detail.userInfo);
    }
})