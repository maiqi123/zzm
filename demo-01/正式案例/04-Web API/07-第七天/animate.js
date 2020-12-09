// 作用：让任意元素运动到任意的位置
// 参数1：element 动画的元素
// 参数2：target 运动的目标位置
function animate(element, target) {
  clearInterval(element.timer);
  element.timer = setInterval(function() {
    // 让元素动走一步
    var current = element.offsetLeft;
    var step = (target - current) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    current += step;
    element.style.left = current + 'px';
    // 如果到达了终点，清除定时器
    if (current === target) {
      clearInterval(element.timer);
    }
  }, 16)
}