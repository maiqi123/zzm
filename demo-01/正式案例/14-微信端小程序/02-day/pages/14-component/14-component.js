Page({
  
  // 子传父的第一步 : 父准备好一个方法
  fn(e){
    console.log('父的方法调用了',e.detail);
  }
})
