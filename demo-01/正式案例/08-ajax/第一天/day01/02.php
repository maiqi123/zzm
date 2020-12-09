<?php

    header("content-Type:text/html;charset=utf-8");

    // 变量
    // $变量名 = 值;
    
    // $name = "zs";
    // $age = 18;
    // echo $name;
    // echo $age;

    // // 双引号是可以识别变量
    // echo "$name";
    // // 单引号是可以识别变量
    // echo '$age';

    // // 字符串 双引号 单引号
    // $des = '帅气的';
    // echo $des;

    $name = "zs";
    $des = '帅气的';
    // 拼串使用 .  
    // php中的+就是运算功能, 没有拼串功能

    echo $name . $des;
?>
