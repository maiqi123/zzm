<?php 
    // 1. 获取到前端发送来的用户名
    // 2. 判断, 用户名是否已经注册过了
    // 3. 把判断的结果响应到前端
    
    // 1.
    $username = $_GET["username"];

    // 2. 在后端,准备已经注册过用户名的假数据
    $arr = array("cc", "ff", "xm", "yange", "banban");

    // in_array(项, 数组); 判断指定项是否在数组中, 在返回true
    // echo in_array($username, $arr); // true

    if(in_array($username, $arr)){
        // true ==> 用户名已经注册过了
        echo "yes";
    }else{
        // 用户名还未注册
        echo "no";
    }
 ?>
