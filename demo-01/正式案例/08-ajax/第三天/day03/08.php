<?php 
    // 响应xml格式
    header("content-type:text/xml;charset=utf-8;");
    
    // 读取data.xml文件里面的内容, 响应xml内容给前端
    echo file_get_contents("./data.xml");
 ?>
