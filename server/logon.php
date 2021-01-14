<?php
// 1. 接受前端发来的用户名和密码
$account = $_POST['account'];
$password = $_POST['password'];
$nickname = $_POST['username'];
//链接数据库
//判断账号是否存在
$sql = "SELECT * FROM `users` WHERE `account`='$account'";
$link = mysqli_connect('localhost', 'root', 'root', 'test2006');
$res = mysqli_query($link, $sql);
$data = mysqli_fetch_all($res, MYSQLI_ASSOC);
    if(!$res){
        $arr = array(
            "message" => "账号存在！！",
            "code" => 0,
          );
          echo $jsonstr = json_encode($arr);
    }else{
        $arr = array(
            "message" => "注册成功！！",
            "code" => 1,
          );
          $sql2 = "INSERT INTO `users`VALUES(null,'$password','$nickname','$account')";
          $res = mysqli_query($link, $sql2);
          echo $jsonstr = json_encode($arr);
    }
?>