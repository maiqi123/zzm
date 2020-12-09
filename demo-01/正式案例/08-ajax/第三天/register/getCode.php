<?php

header('content-Type:text/json;charset=utf-8');

$mobile = $_GET['mobile'];

$arr = array(
  "18956991111",
  "18956991112",
  "18956991113",
  "18956991114",
  "18956991115",
  "18956992233"
);

if(in_array( $mobile, $arr )){
  $result = array(
    "code" => 101,
    "msg" => $mobile."手机号已经存在",
    "mobile" => $mobile
  );
}else {
  $result = array(
    "code"=>100,
    "msg"=>"验证码发送成功",
    "mobile" => $mobile
  );
}
// sleep(1);

echo json_encode($result, JSON_UNESCAPED_UNICODE);
