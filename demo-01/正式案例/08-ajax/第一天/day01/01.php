<?php 
    // 服务器告知浏览器, 给你返回的内容是html格式的, 字符编码是utf-8的
    header("content-type: text/html;charset=utf-8;");

   // 在这里写php代码
   //  1. php文件注意事项: 
   //     所在的目录和文件名不能是中文
   //     php文件后缀是.php
    
    // 2. php文件不能直接用浏览器打开, php文件运行在服务器环境中
        // 需要使用ip或者是域名的形式来访问php文件

    // echo 理解成 js中的document.write()
    echo "this is php, 哈哈";
 ?>
