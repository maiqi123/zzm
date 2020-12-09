// pages/10-bindevent/10-bindevent.js
Page({
  
  fn0(){
    console.log('父元素被触发了');
  },
   fn1(){
     console.log('点击了按钮1');
   },
   //文本框的变化
   // 1. 点击 传参  e.currentTarget.dataset
   // 2. 用户信息  e.detail.userInfo
   // 3. 监听文本框的变化  e.detail.value
   iptChange(e){
     console.log(e.detail.value);
   }
})