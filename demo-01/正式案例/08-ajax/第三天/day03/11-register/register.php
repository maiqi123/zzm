<?php
header('content-Type:text/json;charset=utf-8');
$name = $_POST['name'];
$pass = $_POST['pass'];
$mobile = $_POST['mobile'];
$code = $_POST['code'];

$arr = array(
  "xm",
  "lw",
  "xhong",
  "dafeige"
);

if( in_array($name, $arr) ){
  $result = array(
    "code"=>101,
    "msg"=>"用户名已经存在，请直接登录",
    "name"=>$name
  );
} else if( $code != "1234" ) {
  $result = array(
    "code"=>102,
    "msg"=>"验证码错误",
    "name"=>$name
  );
}else {
  $result = array(
    "code"=>100,
    "msg"=>"注册成功",
    "name"=>$name
  );
}

sleep(1);

echo json_encode( $result, JSON_UNESCAPED_UNICODE );
