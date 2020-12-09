<?php

    header("content-Type:text/html;charset=utf-8");
    
    // echo "hello";

    // php文件里面主要来校验登录的状态
    // 1. 获取到提交来的用户名和密码    $_POST 可以获取到提交来的数据 数组
    // print_r($_POST);

    // 2. 对用户名和密码做校验
    
    // 定死用户名是admin 密码是123456 才认为是登录成功
    if($_POST["username"] === "admin" && $_POST["pwd"] === "123456"){
        // 登录成功
        echo "登录成功";
    }else{
        // 登录失败 ==> 用户名或者密码错误
        echo "用户名或者密码错误";
    }

    // 3. 把校验结果返回给浏览器
 ?>
