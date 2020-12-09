<?php
  header('content-type:text/html;charset=utf-8');

  // 接收到用户的消息，并且返回一个对应的消息（人工智能）
  $arr = ['嗯', '啊', '哦', '我去洗澡了', '你是个好人', '我们不合适', '真香', '最近有部电影，你看过吗'];

  // 获取前端传递的数据 ==> 后端只是获取,不去处理
  $content = $_POST["content"];
  
  // php随机返回
  // 从数组中随机一个下标
  $index = array_rand($arr);

  sleep(1); // 延时器的效果
  echo $arr[$index];
?>
