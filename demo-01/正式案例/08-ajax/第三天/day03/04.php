<?php 
    // echo $_POST["data"]; // json字符串

    $arr = json_decode($_POST["data"], true); // 转成php的数组或对象

    print_r($arr);
 ?>
