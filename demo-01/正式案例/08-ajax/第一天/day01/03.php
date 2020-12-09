<?php 
    header("content-Type:text/html;charset=utf-8");

    // 索引数组
    // $arr = array("张飞","赵云","马超");
    // echo $arr[1];

    // 循环遍历数组
    // php中数组没有length表示长度
    // 长度: count($arr)
    /*for($i = 0; $i < count($arr); $i++){
        echo $arr[$i];
    }*/

    // 关联数组, 和js中对象很像   {name: "lw", age: 19}
    $arr2 = array("name" => "lw", "age" => 19);
    // echo $arr2["age"];

    // echo 输出简单数据类型
    // echo $arr2;
    // print_r(复杂数据类型)
    print_r($arr2);
 ?>
