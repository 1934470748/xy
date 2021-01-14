<?php
    $sql = "SELECT * FROM `xiaomi_table`ORDER BY `good_section` ASC";
    $link = mysqli_connect('127.0.0.1','root','root','test2006');
    $res = mysqli_query($link, $sql);
    $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
    mysqli_close($link);
    $arr = array(
        "message" => '类别请求成功',
        "code" => 1,
        "list" => $data
    );
    echo json_encode($arr);
?>