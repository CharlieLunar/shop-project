<?php
    //引入建立数据库连接的文件
    include("./config.php");
    $pageIndex = $_GET['pageIndex'];
    $count = $_GET['count'];

    $sqlAll = "select * from shop";
    $resAll = mysql_query($sqlAll);
    $countAll = mysql_num_rows($resAll);//取条数
    $pageCount = ceil($countAll/$count);
    //index
    //1 limit 0,4
    //2 limit 4,4
    //3 limit 8,4
    //limit ($pageIndex-1)*$count,$count
    $start = ($pageIndex-1)*$count;
    //书写sql语句
    $sql = "select * from shop limit $start,$count";
    //执行 取出数据库中的每一条商品数据
    $res = mysql_query($sql);
    //创建一个空数组
    $shop = array();
    //将res中的每一行数据取出放进row里面 ，再push到数组里
    while($row = mysql_fetch_assoc($res)){
        array_push($shop,$row);
    };
    //返回一个data
    //判断$shop长度为0的话，返回失败
    $json = array(
        "res_code" => 1,//交易状态码
        "res_message" => "查询成功",
        "res_body" => array(
            "data" => $shop,
            "pageCount" => $pageCount
        )
    );

    echo json_encode($json);

    mysql_close();
?>