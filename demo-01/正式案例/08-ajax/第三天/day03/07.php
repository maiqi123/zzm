<?php 
    header("content-type:text/html;charset=utf-8;");

    // php的对象
    $obj = array("name" => "老王", "age" => 20);

    echo json_encode($obj, JSON_UNESCAPED_UNICODE); // json字符串
 ?>
