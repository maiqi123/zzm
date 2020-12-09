<?php 
  // 指定后端内容
  header('content-type:text/html;charset=utf-8');
  
  // post方式获取数据
  $name = $_POST['name'];
  $pwd = $_POST['pwd'];
  
  // 必须用户名和密码都要正确
  if ($name === 'admin' && $pwd === '123456') {
    $arr = array( 'msg' => '登录成功', 'code'=> 1 );
  } else {
    $arr = array( 'msg' => '登录失败', 'code'=> 0 );
  }

  // 返回json字符串
  echo json_encode($arr, JSON_UNESCAPED_UNICODE);
?>
