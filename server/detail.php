<?php
    $id = $_GET['list_id'];
    $sql = "SELECT * FROM `xiaomi_table` WHERE `id` = '$id'";
    $link = mysqli_connect('127.0.0.1','root','root','test2006');
    $res = mysqli_query($link,$sql);
    $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
    mysqli_close($link);
    $arr = array(
        "message" => "成功找到商品",
        "code" => 1,
        "list" => $data
    );
    echo json_encode($arr);
?>