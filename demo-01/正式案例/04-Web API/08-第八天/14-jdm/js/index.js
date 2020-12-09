/* 
  轮播图功能
*/
(function() {
  var mySwiper = new Swiper ('#banner', {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination'
    }
  });
})();


/* 
  京东快报轮播图
*/
(function(){
  var mySwiper = new Swiper ('#info', {
    direction: 'vertical',
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      reverseDirection: true
    },
    loop: true
  })
})();


/* 
  秒杀功能
*/
(function() {
  function addZero(n) {
    return n < 10 ? '0' + n : n;
  }
  var spans = document.querySelectorAll('.time span:nth-child(odd)');

  var timer;

  function setTime(flag) {
    var now = new Date();
    var future = new Date('2020-07-31 17:50:00');

    var time = (future - now) / 1000 | 0;

    if (time <= 0) {
      time = 0;
      clearInterval(timer);
      if (!flag) {
        alert('亲，秒杀活动结束了');
      }
    }
    
    var h = time / 60 / 60 | 0;
    // 分钟只需要显示不足60分钟
    var m = time / 60 % 60 | 0;
    var s = time % 60;
    spans[0].innerText = addZero(h);
    spans[1].innerText = addZero(m);
    spans[2].innerText = addZero(s);
  }
  setTime(true);
  timer = setInterval(setTime, 1000);
})();


(function(){
  // 区域滚动
  new IScroll('.seckill_content', {
    scrollY: false,
    scrollX: true
  });
})();